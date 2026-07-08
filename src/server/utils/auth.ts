import { AppError } from '../errors/appError.js'

export function getAuthenticatedUserId(request: {
  userId?: string
}): string {
  if (!request.userId) {
    throw new AppError('Authentification requise.', 401)
  }

  return request.userId
}
