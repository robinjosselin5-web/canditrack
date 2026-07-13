import { AppError } from '../errors/appError.js'
import {
  createCandidateProfile,
  findCandidateProfileByUserId,
} from '../repositories/candidateCvRepository.js'
import {
  createCandidateExperience,
  deleteCandidateExperienceByIdForProfile,
  findCandidateExperienceByIdForProfile,
  updateCandidateExperienceByIdForProfile,
} from '../repositories/candidateProfileDataRepository.js'
import type {
  ICreateCandidateExperienceInput,
  IUpdateCandidateExperienceInput,
} from '../types/candidateProfileData.types.js'

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
