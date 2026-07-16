import type { Request, Response } from 'express'
import { AppError } from '../errors/appError.js'
import { getAuthenticatedUserId } from '../utils/auth.js'
import {
  createGeneratedCvForUser,
  getGeneratedCvForUser,
  getGeneratedCvsForUser,
  getPublicGeneratedCv,
} from '../services/candidateGeneratedCvService.js'
import { getGeneratedCvAvatarPlaceholder } from '../services/candidateGeneratedCvAvatarService.js'
import type { IApiSuccessResponse } from '../types/api.types.js'
import type { CreateCandidateGeneratedCvBody } from '../validators/candidateGeneratedCvValidators.js'
import type {
  IGeneratedCvDetail,
  IGeneratedCvListItem,
  IGeneratedCvRenderData,
} from '../types/candidateGeneratedCv.types.js'

export async function createGeneratedCvController(
  request: Request<unknown, unknown, CreateCandidateGeneratedCvBody>,
  response: Response<IApiSuccessResponse<IGeneratedCvDetail>>,
): Promise<void> {
  const generatedCv = await createGeneratedCvForUser(
    getAuthenticatedUserId(request),
    request.body,
  )

  response.status(201).json({ success: true, data: generatedCv })
}

export async function getGeneratedCvsController(
  request: Request,
  response: Response<IApiSuccessResponse<IGeneratedCvListItem[]>>,
): Promise<void> {
  const generatedCvs = await getGeneratedCvsForUser(
    getAuthenticatedUserId(request),
  )

  response.status(200).json({ success: true, data: generatedCvs })
}

export async function getGeneratedCvController(
  request: Request<{ generatedCvId: string }>,
  response: Response<IApiSuccessResponse<IGeneratedCvDetail>>,
): Promise<void> {
  const generatedCv = await getGeneratedCvForUser(
    getAuthenticatedUserId(request),
    getUuidParam(request.params.generatedCvId, 'Identifiant de CV généré invalide.'),
  )

  response.status(200).json({ success: true, data: generatedCv })
}

export async function getPublicGeneratedCvController(
  request: Request<{ publicId: string }>,
  response: Response<IApiSuccessResponse<IGeneratedCvRenderData>>,
): Promise<void> {
  const generatedCv = await getPublicGeneratedCv(
    getUuidParam(request.params.publicId, 'Identifiant public invalide.'),
  )

  response.status(200).json({ success: true, data: generatedCv })
}

export async function getGeneratedCvAvatarController(
  request: Request<{ publicId: string }>,
  response: Response,
): Promise<void> {
  getUuidParam(request.params.publicId, 'Identifiant public invalide.')
  void response
  await getGeneratedCvAvatarPlaceholder()
}

function getUuidParam(value: string, message: string): string {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  if (!uuidRegex.test(value)) {
    throw new AppError(message, 400)
  }

  return value
}
