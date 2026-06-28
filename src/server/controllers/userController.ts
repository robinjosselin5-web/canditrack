import type { Request, Response } from 'express'
import { AppError } from '../errors/appError.js'
import {
  getUserProfile,
  updateUserProfile,
} from '../services/userService.js'
import type { IApiSuccessResponse } from '../types/api.types.js'
import type { IUserPublic } from '../types/user.types.js'
import type { UpdateUserProfileBody } from '../validators/index.js'

export async function getUserProfileController(
  request: Request,
  response: Response<IApiSuccessResponse<IUserPublic>>,
): Promise<void> {
  const user = await getUserProfile(getAuthenticatedUserId(request))

  response.status(200).json({
    success: true,
    data: user,
  })
}

export async function updateUserProfileController(
  request: Request<unknown, unknown, UpdateUserProfileBody>,
  response: Response<IApiSuccessResponse<IUserPublic>>,
): Promise<void> {
  const user = await updateUserProfile(
    getAuthenticatedUserId(request),
    request.body,
  )

  response.status(200).json({
    success: true,
    data: user,
  })
}

function getAuthenticatedUserId(request: { userId?: string }): string {
  if (!request.userId) {
    throw new AppError('Authentification requise.', 401)
  }

  return request.userId
}
