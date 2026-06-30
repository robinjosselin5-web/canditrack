import { prisma } from '../config/prisma.js'
import type { CandidateCv, CandidateProfile } from '../generated/prisma/client.js'

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

export async function findFirstCandidateCvByProfileId(
  candidateProfileId: string,
): Promise<CandidateCv | null> {
  return prisma.candidateCv.findFirst({
    where: { candidateProfileId },
    orderBy: { createdAt: 'asc' },
  })
}

export async function createCandidateCv(data: {
  candidateProfileId: string
  fileHash: string
  fileSize: number
  isDefault: boolean
  label: string
  mimeType: string
  originalFilename: string
  storageFilename: string
  storageKey: string
}): Promise<CandidateCv> {
  return prisma.candidateCv.create({
    data,
  })
}
