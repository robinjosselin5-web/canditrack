import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { AppError } from '../errors/appError.js'

export function authenticateRequest(
  request: Request,
  _response: Response,
  next: NextFunction,
): void {
  const authorizationHeader = request.headers.authorization

  if (!authorizationHeader?.startsWith('Bearer ')) {
    throw new AppError('Authentification requise.', 401)
  }

  const token = authorizationHeader.slice('Bearer '.length)
  let payload: string | jwt.JwtPayload

  try {
    payload = jwt.verify(token, env.JWT_SECRET)
  } catch {
    throw new AppError('Token invalide.', 401)
  }

  if (typeof payload === 'string' || typeof payload.sub !== 'string') {
    throw new AppError('Token invalide.', 401)
  }

  request.userId = payload.sub
  next()
}
