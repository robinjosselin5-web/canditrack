import type { ErrorRequestHandler } from 'express'
import { AppError } from '../errors/appError.js'
import type { IApiErrorResponse } from '../types/api.types.js'

export const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  next,
) => {
  void next
  console.error(error)

  if (error instanceof AppError) {
    const body: IApiErrorResponse = {
      success: false,
      message: error.message,
      errors: error.errors,
    }

    response.status(error.statusCode).json(body)
    return
  }

  const body: IApiErrorResponse = {
    success: false,
    message: 'Internal server error',
    errors: [],
  }

  response.status(500).json(body)
}
