import type { Request, Response } from 'express'
import { AppError } from '../errors/appError.js'
import { getAuthenticatedUserId } from '../utils/auth.js'
import type { IApiSuccessResponse } from '../types/api.types.js'
import type {
  CreateCandidateExperienceBody,
  UpdateCandidateExperienceBody,
} from '../validators/candidateExperienceValidators.js'
import {
  createExperienceForUser,
  deleteExperienceForUser,
  updateExperienceForUser,
} from '../services/candidateProfileDataService.js'

export async function createCandidateExperienceController(
  request: Request<unknown, unknown, CreateCandidateExperienceBody>,
  response: Response<IApiSuccessResponse<unknown>>,
): Promise<void> {
  const experience = await createExperienceForUser(
    getAuthenticatedUserId(request),
    request.body,
  )

  response.status(201).json({
    success: true,
    data: experience,
  })
}

export async function updateCandidateExperienceController(
  request: Request<{ experienceId: string }, unknown, UpdateCandidateExperienceBody>,
  response: Response<IApiSuccessResponse<unknown>>,
): Promise<void> {
  const experienceId = getExperienceId(request.params.experienceId)
  const experience = await updateExperienceForUser(
    getAuthenticatedUserId(request),
    experienceId,
    request.body,
  )

  if (!experience) {
    throw new AppError('Experience introuvable.', 404)
  }

  response.status(200).json({
    success: true,
    data: experience,
  })
}

export async function deleteCandidateExperienceController(
  request: Request<{ experienceId: string }>,
  response: Response<IApiSuccessResponse<{ message: string }>>,
): Promise<void> {
  const experienceId = getExperienceId(request.params.experienceId)
  const deleted = await deleteExperienceForUser(
    getAuthenticatedUserId(request),
    experienceId,
  )

  if (!deleted) {
    throw new AppError('Experience introuvable.', 404)
  }

  response.status(200).json({
    success: true,
    data: {
      message: 'Experience supprimee avec succes.',
    },
  })
}

function getExperienceId(experienceId: string): string {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  if (!uuidRegex.test(experienceId)) {
    throw new AppError('Identifiant d experience invalide.', 400)
  }

  return experienceId
}
