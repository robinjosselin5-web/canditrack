import type { Request, Response } from 'express'
import { AppError } from '../errors/appError.js'
import {
  analyzeCandidateCv,
  deleteCandidateCv,
  getCandidateCvs,
  importCandidateCv,
} from '../services/candidateCvService.js'
import type { IApiSuccessResponse } from '../types/api.types.js'
import type {
  ICandidateCvListResponse,
  ICandidateCvPublic,
} from '../types/candidateCv.types.js'

export async function importCandidateCvController(
  request: Request,
  response: Response<IApiSuccessResponse<ICandidateCvPublic>>,
): Promise<void> {
  const userId = getAuthenticatedUserId(request)
  const candidateCv = await importCandidateCv(
    userId,
    request.file,
    typeof request.body.label === 'string' ? request.body.label : undefined,
  )

  response.status(201).json({
    success: true,
    data: candidateCv,
  })
}

export async function getCandidateCvsController(
  request: Request,
  response: Response<IApiSuccessResponse<ICandidateCvListResponse>>,
): Promise<void> {
  const cvs = await getCandidateCvs(getAuthenticatedUserId(request))

  response.status(200).json({
    success: true,
    data: cvs,
  })
}

export async function analyzeCandidateCvController(
  request: Request<{ cvId: string }>,
  response: Response<IApiSuccessResponse<null>>,
): Promise<void> {
  const cvId = getCandidateCvId(request.params.cvId)

  await analyzeCandidateCv(getAuthenticatedUserId(request), cvId)

  response.status(200).json({
    success: true,
    data: null,
  })
}

export async function deleteCandidateCvController(
  request: Request<{ cvId: string }>,
  response: Response<IApiSuccessResponse<null>>,
): Promise<void> {
  const cvId = getCandidateCvId(request.params.cvId)

  await deleteCandidateCv(getAuthenticatedUserId(request), cvId)

  response.status(200).json({
    success: true,
    data: null,
  })
}

function getAuthenticatedUserId(request: { userId?: string }): string {
  if (!request.userId) {
    throw new AppError('Authentification requise.', 401)
  }

  return request.userId
}

function getCandidateCvId(cvId: string): string {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  if (!uuidRegex.test(cvId)) {
    throw new AppError('Identifiant de CV invalide.', 400)
  }

  return cvId
}
