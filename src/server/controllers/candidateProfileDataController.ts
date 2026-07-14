import type { Request, Response } from 'express'
import { AppError } from '../errors/appError.js'
import { getAuthenticatedUserId } from '../utils/auth.js'
import type { IApiSuccessResponse } from '../types/api.types.js'
import type {
  CreateCandidateExperienceBody,
  UpdateCandidateExperienceBody,
} from '../validators/candidateExperienceValidators.js'
import type { CreateCandidateTrainingBody, UpdateCandidateTrainingBody } from '../validators/candidateTrainingValidators.js'
import type { CreateCandidateSkillBody } from '../validators/candidateSkillValidators.js'
import {
  createExperienceForUser,
  deleteExperienceForUser,
  updateExperienceForUser,
  createTrainingForUser,
  deleteTrainingForUser,
  updateTrainingForUser,
  createSkillForUser,
  deleteSkillForUser,
} from '../services/candidateProfileDataService.js'

export async function createCandidateSkillController(request: Request<unknown, unknown, CreateCandidateSkillBody>, response: Response<IApiSuccessResponse<unknown>>): Promise<void> {
  response.status(201).json({ success: true, data: await createSkillForUser(getAuthenticatedUserId(request), request.body) })
}

export async function deleteCandidateSkillController(request: Request<{ skillId: string }>, response: Response<IApiSuccessResponse<{ message: string }>>): Promise<void> {
  const deleted = await deleteSkillForUser(getAuthenticatedUserId(request), getSkillId(request.params.skillId))
  if (!deleted) throw new AppError('Competence introuvable.', 404)
  response.status(200).json({ success: true, data: { message: 'Competence supprimee avec succes.' } })
}

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

export async function createCandidateTrainingController(
  request: Request<unknown, unknown, CreateCandidateTrainingBody>, response: Response<IApiSuccessResponse<unknown>>,
): Promise<void> {
  response.status(201).json({ success: true, data: await createTrainingForUser(getAuthenticatedUserId(request), request.body) })
}

export async function updateCandidateTrainingController(
  request: Request<{ trainingId: string }, unknown, UpdateCandidateTrainingBody>, response: Response<IApiSuccessResponse<unknown>>,
): Promise<void> {
  const training = await updateTrainingForUser(getAuthenticatedUserId(request), getTrainingId(request.params.trainingId), request.body)
  if (!training) throw new AppError('Formation introuvable.', 404)
  response.status(200).json({ success: true, data: training })
}

export async function deleteCandidateTrainingController(
  request: Request<{ trainingId: string }>, response: Response<IApiSuccessResponse<{ message: string }>>,
): Promise<void> {
  const deleted = await deleteTrainingForUser(getAuthenticatedUserId(request), getTrainingId(request.params.trainingId))
  if (!deleted) throw new AppError('Formation introuvable.', 404)
  response.status(200).json({ success: true, data: { message: 'Formation supprimee avec succes.' } })
}

function getTrainingId(trainingId: string): string {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(trainingId)) throw new AppError('Identifiant de formation invalide.', 400)
  return trainingId
}

function getSkillId(skillId: string): string {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(skillId)) throw new AppError('Identifiant de competence invalide.', 400)
  return skillId
}
