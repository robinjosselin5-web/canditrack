import type { Request, Response } from 'express'
import type { IApiErrorResponse } from '../types/api.types.js'

export function notFoundHandler(
  request: Request,
  response: Response<IApiErrorResponse>,
): void {
  response.status(404).json({
    success: false,
    message: `Route ${request.method} ${request.originalUrl} not found`,
    errors: [],
  })
}
