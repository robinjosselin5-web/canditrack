import type { NextFunction, Request, Response } from 'express'
import { env } from '../config/env.js'

export function requestLogger(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  if (env.NODE_ENV === 'development') {
    response.on('finish', () => {
      console.info(
        `${request.method} ${request.originalUrl} ${response.statusCode}`,
      )
    })
  }

  next()
}
