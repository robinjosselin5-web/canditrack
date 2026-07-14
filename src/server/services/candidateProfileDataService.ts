import { AppError } from '../errors/appError.js'
import {
  createCandidateProfile,
  findCandidateProfileByUserId,
} from '../repositories/candidateCvRepository.js'
import {
  createCandidateExperience,
  createCandidateSkill,
  deleteCandidateSkillByIdForProfile,
  deleteCandidateExperienceByIdForProfile,
  findCandidateExperienceByIdForProfile,
  updateCandidateExperienceByIdForProfile,
  createCandidateTraining,
  deleteCandidateTrainingByIdForProfile,
  findCandidateTrainingByIdForProfile,
  updateCandidateTrainingByIdForProfile,
} from '../repositories/candidateProfileDataRepository.js'
import type {
  ICreateCandidateExperienceInput,
  ICreateCandidateSkillInput,
  IUpdateCandidateExperienceInput,
  ICreateCandidateTrainingInput,
  IUpdateCandidateTrainingInput,
} from '../types/candidateProfileData.types.js'

export async function createSkillForUser(userId: string, data: ICreateCandidateSkillInput) {
  const candidateProfile = (await findCandidateProfileByUserId(userId)) ?? (await createCandidateProfile(userId))
  return createCandidateSkill(candidateProfile.id, data)
}

export async function deleteSkillForUser(userId: string, skillId: string): Promise<boolean> {
  const candidateProfile = await findCandidateProfileByUserId(userId)
  if (!candidateProfile) throw new AppError('Competence introuvable.', 404)
  return deleteCandidateSkillByIdForProfile(skillId, candidateProfile.id)
}

export async function createExperienceForUser(
  userId: string,
  data: ICreateCandidateExperienceInput,
) {
  const candidateProfile =
    (await findCandidateProfileByUserId(userId)) ??
    (await createCandidateProfile(userId))

  return createCandidateExperience(candidateProfile.id, data)
}

export async function updateExperienceForUser(
  userId: string,
  experienceId: string,
  data: IUpdateCandidateExperienceInput,
) {
  const candidateProfile = await findCandidateProfileByUserId(userId)

  if (!candidateProfile) {
    throw new AppError('Experience introuvable.', 404)
  }

  const currentExperience = await findCandidateExperienceByIdForProfile(
    experienceId,
    candidateProfile.id,
  )

  if (!currentExperience) {
    throw new AppError('Experience introuvable.', 404)
  }

  const updateData: IUpdateCandidateExperienceInput & { source: 'MANUAL' } = {
    ...data,
    source: 'MANUAL',
  }

  if (data.isCurrent === true) {
    updateData.endDate = null
  } else if (
    data.endDate !== undefined &&
    data.endDate !== null
  ) {
    updateData.isCurrent = false
  }

  return updateCandidateExperienceByIdForProfile(
    experienceId,
    candidateProfile.id,
    updateData,
  )
}

export async function deleteExperienceForUser(
  userId: string,
  experienceId: string,
): Promise<boolean> {
  const candidateProfile = await findCandidateProfileByUserId(userId)

  if (!candidateProfile) {
    throw new AppError('Experience introuvable.', 404)
  }

  return deleteCandidateExperienceByIdForProfile(
    experienceId,
    candidateProfile.id,
  )
}

export async function createTrainingForUser(userId: string, data: ICreateCandidateTrainingInput) {
  const candidateProfile =
    (await findCandidateProfileByUserId(userId)) ??
    (await createCandidateProfile(userId))
  return createCandidateTraining(candidateProfile.id, data)
}

export async function updateTrainingForUser(
  userId: string,
  trainingId: string,
  data: IUpdateCandidateTrainingInput,
) {
  const candidateProfile = await findCandidateProfileByUserId(userId)
  if (!candidateProfile) throw new AppError('Formation introuvable.', 404)
  const currentTraining = await findCandidateTrainingByIdForProfile(trainingId, candidateProfile.id)
  if (!currentTraining) throw new AppError('Formation introuvable.', 404)
  return updateCandidateTrainingByIdForProfile(trainingId, candidateProfile.id, {
    ...data,
    source: 'MANUAL',
  })
}

export async function deleteTrainingForUser(userId: string, trainingId: string): Promise<boolean> {
  const candidateProfile = await findCandidateProfileByUserId(userId)
  if (!candidateProfile) throw new AppError('Formation introuvable.', 404)
  return deleteCandidateTrainingByIdForProfile(trainingId, candidateProfile.id)
}
