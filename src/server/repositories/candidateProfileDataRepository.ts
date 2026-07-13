import { prisma } from '../config/prisma.js'
import type {
  ICreateCandidateExperienceInput,
  IUpdateCandidateExperienceRepositoryInput,
} from '../types/candidateProfileData.types.js'

const candidateExperienceSelect = {
  id: true,
  candidateCvId: true,
  source: true,
  jobTitle: true,
  companyName: true,
  startDate: true,
  endDate: true,
  isCurrent: true,
  location: true,
  description: true,
} as const

export async function createCandidateExperience(
  candidateProfileId: string,
  data: ICreateCandidateExperienceInput,
) {
  return prisma.cvExperience.create({
    data: {
      ...data,
      candidateProfileId,
      candidateCvId: null,
      source: 'MANUAL',
    },
    select: candidateExperienceSelect,
  })
}

export async function findCandidateExperienceByIdForProfile(
  experienceId: string,
  candidateProfileId: string,
) {
  return prisma.cvExperience.findFirst({
    where: {
      id: experienceId,
      candidateProfileId,
    },
    select: candidateExperienceSelect,
  })
}

export async function updateCandidateExperienceByIdForProfile(
  experienceId: string,
  candidateProfileId: string,
  data: IUpdateCandidateExperienceRepositoryInput,
) {
  const result = await prisma.cvExperience.updateMany({
    where: {
      id: experienceId,
      candidateProfileId,
    },
    data,
  })

  if (result.count === 0) {
    return null
  }

  return findCandidateExperienceByIdForProfile(experienceId, candidateProfileId)
}

export async function deleteCandidateExperienceByIdForProfile(
  experienceId: string,
  candidateProfileId: string,
): Promise<boolean> {
  const result = await prisma.cvExperience.deleteMany({
    where: {
      id: experienceId,
      candidateProfileId,
    },
  })

  return result.count > 0
}
