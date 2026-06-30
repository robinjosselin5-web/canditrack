import { createHash, randomUUID } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { unlink, readFile } from 'node:fs/promises'
import { PDFParse } from 'pdf-parse'
import { AppError } from '../errors/appError.js'
import {
  deleteCandidateCvAndReassignDefault,
  createCandidateCv,
  createCandidateProfile,
  findCandidateCvById,
  findCandidateCvsByProfileId,
  findCandidateProfileByUserId,
  updateCandidateCvAnalysisStatus,
} from '../repositories/candidateCvRepository.js'
import type {
  ICandidateCvListItem,
  ICandidateCvListResponse,
  ICandidateCvPublic,
} from '../types/candidateCv.types.js'

const MAX_CV_FILE_SIZE = 10 * 1024 * 1024
const MAX_CV_LABEL_LENGTH = 50

export async function importCandidateCv(
  userId: string,
  file: Express.Multer.File | undefined,
  label?: string,
): Promise<ICandidateCvPublic> {
  if (!validateUploadedFile(file)) {
    throw new AppError('Un fichier PDF est requis.', 400)
  }

  const normalizedLabel = normalizeLabel(label, file.originalname)

  if (normalizedLabel.length > MAX_CV_LABEL_LENGTH) {
    throw new AppError('Le label ne doit pas dépasser 50 caractères.', 400)
  }

  const candidateProfile =
    (await findCandidateProfileByUserId(userId)) ??
    (await createCandidateProfile(userId))

  const storageFilename = `${randomUUID()}.pdf`
  const storageKey = path.posix.join('users', userId, 'cvs', storageFilename)
  const storagePath = path.join(process.cwd(), 'uploads', storageKey)

  await mkdir(path.dirname(storagePath), { recursive: true })
  await writeFile(storagePath, file.buffer)

  const fileHash = createHash('sha256').update(file.buffer).digest('hex')

  let candidateCv: Awaited<ReturnType<typeof createCandidateCv>>

  try {
    candidateCv = await createCandidateCv({
      candidateProfileId: candidateProfile.id,
      fileHash,
      fileSize: file.size,
      label: normalizedLabel,
      mimeType: file.mimetype,
      originalFilename: file.originalname,
      storageFilename,
      storageKey,
    })
  } catch (error) {
    await removeStoredCandidateCvFile(storageKey)
    throw error
  }

  return mapCandidateCv(candidateCv)
}

export async function getCandidateCvs(
  userId: string,
): Promise<ICandidateCvListResponse> {
  const candidateProfile = await findCandidateProfileByUserId(userId)

  if (!candidateProfile) {
    return { cvs: [] }
  }

  const cvs = await findCandidateCvsByProfileId(candidateProfile.id)

  return {
    cvs: cvs.map(mapCandidateCvListItem),
  }
}

export async function analyzeCandidateCv(
  userId: string,
  candidateCvId: string,
): Promise<{ extractedTextPreview: string; extractedTextLength: number }> {
  const candidateCv = await findCandidateCvById(candidateCvId)

  if (!candidateCv) {
    throw new AppError('CV introuvable.', 404)
  }

  const candidateProfile = await findCandidateProfileByUserId(userId)

  if (!candidateProfile || candidateProfile.id !== candidateCv.candidateProfileId) {
    throw new AppError('Acces refuse.', 403)
  }

  if (candidateCv.analysisStatus === 'PROCESSING') {
    throw new AppError('Une analyse est deja en cours.', 409)
  }

  await updateCandidateCvAnalysisStatus(candidateCvId, {
    analysisStatus: 'PROCESSING',
    extractedText: null,
    lastAnalyzedAt: null,
  })

  try {
    const pdfPath = resolveCandidateCvPath(candidateCv.storageKey)
    const pdfBuffer = await readFile(pdfPath)
    const pdfParse = new PDFParse({ data: pdfBuffer })
    const parsed = await pdfParse.getText()
    const extractedText = normalizeExtractedText(parsed.text)

    if (!extractedText) {
      throw new AppError('Le texte extrait est vide ou inutilisable.', 400)
    }

    await updateCandidateCvAnalysisStatus(candidateCvId, {
      analysisStatus: 'COMPLETED',
      extractedText,
      lastAnalyzedAt: new Date(),
    })

    console.info('[CV_ANALYZE] completed', {
      candidateCvId,
      extractedTextLength: extractedText.length,
    })

    return {
      extractedTextPreview: extractedText.slice(0, 3000),
      extractedTextLength: extractedText.length,
    }
  } catch (error) {
    await updateCandidateCvAnalysisStatus(candidateCvId, {
      analysisStatus: 'FAILED',
      extractedText: null,
      lastAnalyzedAt: null,
    })

    if (error instanceof AppError) {
      throw error
    }

    throw new AppError("L'analyse du CV a echoue.", 500)
  }
}

export async function deleteCandidateCv(
  userId: string,
  candidateCvId: string,
): Promise<void> {
  const candidateCv = await findCandidateCvById(candidateCvId)

  if (!candidateCv) {
    throw new AppError('CV introuvable.', 404)
  }

  const candidateProfile = await findCandidateProfileByUserId(userId)

  if (!candidateProfile || candidateProfile.id !== candidateCv.candidateProfileId) {
    throw new AppError('Acces refuse.', 403)
  }

  await deleteCandidateCvAndReassignDefault(
    candidateCv.id,
    candidateCv.candidateProfileId,
  )

  await removeStoredCandidateCvFile(candidateCv.storageKey)
}

function validateUploadedFile(
  file: Express.Multer.File | undefined,
): file is Express.Multer.File {
  if (!file) {
    return false
  }

  if (file.size <= 0) {
    throw new AppError('Le fichier importé est vide.', 400)
  }

  if (file.size > MAX_CV_FILE_SIZE) {
    throw new AppError('Le fichier dépasse la limite de 10 Mo.', 413)
  }

  const isPdf =
    file.mimetype === 'application/pdf' ||
    file.originalname.toLowerCase().endsWith('.pdf')

  if (!isPdf) {
    throw new AppError('Seuls les fichiers PDF sont autorisés.', 400)
  }

  return true
}

function normalizeLabel(
  label: string | undefined,
  originalFilename: string,
): string {
  const trimmedLabel = label?.trim()

  if (trimmedLabel) {
    return trimmedLabel
  }

  return originalFilename.replace(/\.[^.]+$/, '')
}

function mapCandidateCv(candidateCv: {
  createdAt: Date
  fileSize: number
  id: string
  isDefault: boolean
  label: string
  mimeType: string
  originalFilename: string
  storageKey: string
  updatedAt: Date
  uploadedAt: Date
}): ICandidateCvPublic {
  return {
    id: candidateCv.id,
    label: candidateCv.label,
    originalFilename: candidateCv.originalFilename,
    storageKey: candidateCv.storageKey,
    mimeType: candidateCv.mimeType,
    fileSize: candidateCv.fileSize,
    isDefault: candidateCv.isDefault,
    uploadedAt: candidateCv.uploadedAt.toISOString(),
    createdAt: candidateCv.createdAt.toISOString(),
    updatedAt: candidateCv.updatedAt.toISOString(),
  }
}

function mapCandidateCvListItem(candidateCv: {
  analysisStatus: 'NOT_ANALYZED' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  lastAnalyzedAt: Date | null
  fileSize: number
  id: string
  isDefault: boolean
  label: string
  mimeType: string
  originalFilename: string
  uploadedAt: Date
}): ICandidateCvListItem {
  return {
    id: candidateCv.id,
    label: candidateCv.label,
    originalFilename: candidateCv.originalFilename,
    mimeType: candidateCv.mimeType,
    fileSize: candidateCv.fileSize,
    uploadedAt: candidateCv.uploadedAt.toISOString(),
    isDefault: candidateCv.isDefault,
    analysisStatus: candidateCv.analysisStatus,
    lastAnalyzedAt: candidateCv.lastAnalyzedAt?.toISOString() ?? null,
  }
}

function resolveCandidateCvPath(storageKey: string): string {
  return path.join(process.cwd(), 'uploads', storageKey)
}

function normalizeExtractedText(text: string | undefined): string {
  return text?.replace(/\s+/g, ' ').trim() ?? ''
}

async function removeStoredCandidateCvFile(storageKey: string): Promise<void> {
  try {
    await unlink(resolveCandidateCvPath(storageKey))
  } catch (error) {
    if (isMissingFileError(error)) {
      return
    }

    console.error('[CV_STORAGE] failed to remove stored CV file', {
      storageKey,
      error,
    })
  }
}

function isMissingFileError(error: unknown): boolean {
  return (
    error instanceof Error &&
    'code' in error &&
    (error as NodeJS.ErrnoException).code === 'ENOENT'
  )
}
