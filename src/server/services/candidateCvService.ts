import { createHash, randomUUID } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { AppError } from '../errors/appError.js'
import {
  createCandidateCv,
  createCandidateProfile,
  findCandidateProfileByUserId,
  findFirstCandidateCvByProfileId,
} from '../repositories/candidateCvRepository.js'
import type { ICandidateCvPublic } from '../types/candidateCv.types.js'

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
  const isDefault = !(await findFirstCandidateCvByProfileId(candidateProfile.id))

  const candidateCv = await createCandidateCv({
    candidateProfileId: candidateProfile.id,
    fileHash,
    fileSize: file.size,
    isDefault,
    label: normalizedLabel,
    mimeType: file.mimetype,
    originalFilename: file.originalname,
    storageFilename,
    storageKey,
  })

  return mapCandidateCv(candidateCv)
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
