import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { AppError } from '../errors/appError.js'

interface IJwtPayload {
  sub?: string
  email?: string
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string
      email: string
    }
  }
}

export function authJwt(
  request: Request,
  _response: Response,
  next: NextFunction,
): void {
  const header = request.headers.authorization

  if (!header?.startsWith('Bearer ')) {
    next(new AppError('Non autorise.', 401))
    return
  }

  const token = header.slice(7)

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as IJwtPayload

    if (!payload.sub || !payload.email) {
      next(new AppError('Non autorise.', 401))
      return
    }

    request.user = {
      id: payload.sub,
      email: payload.email,
    }
    next()
  } catch {
    next(new AppError('Non autorise.', 401))
  }
}

