import { prisma } from '../config/prisma.js'
import {
  Prisma,
  type CandidateCv,
  type CandidateProfile,
} from '../generated/prisma/client.js'

export async function findCandidateProfileByUserId(
  userId: string,
): Promise<CandidateProfile | null> {
  return prisma.candidateProfile.findUnique({
    where: { userId },
  })
}

export async function createCandidateProfile(
  userId: string,
): Promise<CandidateProfile> {
  return prisma.candidateProfile.create({
    data: { userId },
  })
}

export async function findCandidateCvsByProfileId(candidateProfileId: string) {
  return prisma.candidateCv.findMany({
    where: { candidateProfileId },
    orderBy: { uploadedAt: 'desc' },
    select: {
      id: true,
      label: true,
      originalFilename: true,
      mimeType: true,
      fileSize: true,
      uploadedAt: true,
      isDefault: true,
      analysisStatus: true,
      lastAnalyzedAt: true,
    },
  })
}

export async function findCandidateCvById(candidateCvId: string) {
  return prisma.candidateCv.findUnique({
    where: { id: candidateCvId },
    select: {
      id: true,
      candidateProfileId: true,
      storageKey: true,
      analysisStatus: true,
      isDefault: true,
      uploadedAt: true,
    },
  })
}

export async function deleteCandidateCvAndReassignDefault(
  candidateCvId: string,
  candidateProfileId: string,
): Promise<void> {
  await prisma.$transaction(async (tx) => {
    const candidateCv = await tx.candidateCv.delete({
      where: { id: candidateCvId },
    })

    if (!candidateCv.isDefault) {
      return
    }

    const latestRemainingCandidateCv = await tx.candidateCv.findFirst({
      where: { candidateProfileId },
      orderBy: { uploadedAt: 'desc' },
      select: {
        id: true,
      },
    })

    if (!latestRemainingCandidateCv) {
      return
    }

    await tx.candidateCv.update({
      where: { id: latestRemainingCandidateCv.id },
      data: { isDefault: true },
    })
  })
}

export async function updateCandidateCvAnalysisStatus(
  candidateCvId: string,
  data: {
    analysisStatus: 'NOT_ANALYZED' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
    extractedText?: string | null
    lastAnalyzedAt?: Date | null
  },
) {
  return prisma.candidateCv.update({
    where: { id: candidateCvId },
    data,
  })
}

export async function createCandidateCv(data: {
  candidateProfileId: string
  fileHash: string
  fileSize: number
  label: string
  mimeType: string
  originalFilename: string
  storageFilename: string
  storageKey: string
}): Promise<CandidateCv> {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      return await prisma.$transaction(
        async (tx) => {
          const existingCandidateCv = await tx.candidateCv.findFirst({
            where: { candidateProfileId: data.candidateProfileId },
            select: { id: true },
          })

          return tx.candidateCv.create({
            data: {
              ...data,
              isDefault: !existingCandidateCv,
            },
          })
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
      )
    } catch (error) {
      if (attempt === 0 && isTransactionConflictError(error)) {
        continue
      }

      throw error
    }
  }

  throw new Error('Candidate CV creation failed.')
}

function isTransactionConflictError(error: unknown): boolean {
  return (
    error !== null &&
    typeof error === 'object' &&
    'code' in error &&
    (error as { code?: string }).code === 'P2034'
  )
}
