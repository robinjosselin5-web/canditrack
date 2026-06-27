import type { IApiErrorDetail } from '../types/api.types.js'

export class AppError extends Error {
  readonly errors: IApiErrorDetail[]
  readonly statusCode: number

  constructor(
    message: string,
    statusCode = 500,
    errors: IApiErrorDetail[] = [],
  ) {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode
    this.errors = errors
  }
}
