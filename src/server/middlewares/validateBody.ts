import type { NextFunction, Request, Response } from 'express'
import type { ZodSchema } from 'zod'
import type { IApiErrorResponse } from '../types/api.types.js'

export function validateBody(schema: ZodSchema) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const result = schema.safeParse(request.body)

    if (!result.success) {
      const body: IApiErrorResponse = {
        success: false,
        message: 'Validation error',
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      }

      response.status(422).json(body)
      return
    }

    request.body = result.data
    next()
  }
}
