import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { AppError } from '../errors/appError.js'

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string
    user?: {
      id: string
      email: string
    }
  }
}

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
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError('Session expiree, veuillez vous reconnecter.', 401)
    }

    throw new AppError('Token invalide.', 401)
  }

  if (typeof payload === 'string' || typeof payload.sub !== 'string') {
    throw new AppError('Authentification requise.', 401)
  }

  request.userId = payload.sub
  if (typeof payload.email === 'string') {
    request.user = {
      id: payload.sub,
      email: payload.email,
    }
  }
  next()
}
