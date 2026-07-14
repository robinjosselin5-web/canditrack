import { prisma } from '../config/prisma.js'
import type {
  ICreateCandidateExperienceInput,
  ICreateCandidateSkillInput,
  ICreateCandidateTrainingInput,
  IUpdateCandidateExperienceRepositoryInput,
  IUpdateCandidateTrainingRepositoryInput,
} from '../types/candidateProfileData.types.js'

const candidateSkillSelect = {
  id: true,
  candidateCvId: true,
  name: true,
  category: true,
  confidence: true,
  source: true,
  dataSource: true,
} as const

const candidateTrainingSelect = {
  id: true,
  candidateCvId: true,
  title: true,
  organizationName: true,
  degree: true,
  fieldOfStudy: true,
  startDate: true,
  endDate: true,
  description: true,
  location: true,
  isCertification: true,
  certificationType: true,
  source: true,
} as const

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

export async function createCandidateSkill(candidateProfileId: string, data: ICreateCandidateSkillInput) {
  return prisma.cvSkill.create({
    data: { ...data, candidateProfileId, candidateCvId: null, dataSource: 'MANUAL', confidence: null, source: null },
    select: candidateSkillSelect,
  })
}

export async function deleteCandidateSkillByIdForProfile(skillId: string, candidateProfileId: string): Promise<boolean> {
  const result = await prisma.cvSkill.deleteMany({ where: { id: skillId, candidateProfileId } })
  return result.count > 0
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

export async function createCandidateTraining(
  candidateProfileId: string,
  data: ICreateCandidateTrainingInput,
) {
  return prisma.cvTraining.create({
    data: { ...data, candidateProfileId, candidateCvId: null, source: 'MANUAL' },
    select: candidateTrainingSelect,
  })
}

export async function findCandidateTrainingByIdForProfile(
  trainingId: string,
  candidateProfileId: string,
) {
  return prisma.cvTraining.findFirst({
    where: { id: trainingId, candidateProfileId },
    select: candidateTrainingSelect,
  })
}

export async function updateCandidateTrainingByIdForProfile(
  trainingId: string,
  candidateProfileId: string,
  data: IUpdateCandidateTrainingRepositoryInput,
) {
  const result = await prisma.cvTraining.updateMany({
    where: { id: trainingId, candidateProfileId },
    data,
  })

  if (result.count === 0) return null
  return findCandidateTrainingByIdForProfile(trainingId, candidateProfileId)
}

export async function deleteCandidateTrainingByIdForProfile(
  trainingId: string,
  candidateProfileId: string,
): Promise<boolean> {
  const result = await prisma.cvTraining.deleteMany({
    where: { id: trainingId, candidateProfileId },
  })
  return result.count > 0
}
