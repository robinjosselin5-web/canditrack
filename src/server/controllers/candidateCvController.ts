import type { Request, Response } from 'express'
import { AppError } from '../errors/appError.js'
import { importCandidateCv } from '../services/candidateCvService.js'
import type { IApiSuccessResponse } from '../types/api.types.js'
import type { ICandidateCvPublic } from '../types/candidateCv.types.js'

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

function getAuthenticatedUserId(request: { userId?: string }): string {
  if (!request.userId) {
    throw new AppError('Authentification requise.', 401)
  }

  return request.userId
}
