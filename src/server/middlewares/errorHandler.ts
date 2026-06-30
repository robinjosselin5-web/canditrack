import type { ErrorRequestHandler } from 'express'
import { MulterError } from 'multer'
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

  if (error instanceof MulterError && error.code === 'LIMIT_FILE_SIZE') {
    response.status(413).json({
      success: false,
      message: 'Le fichier dépasse la limite de 10 Mo.',
      errors: [],
    })
    return
  }

  const body: IApiErrorResponse = {
    success: false,
    message: 'Internal server error',
    errors: [],
  }

  response.status(500).json(body)
}
