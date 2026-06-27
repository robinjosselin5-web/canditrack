import type { Request, Response } from 'express'
import { getHealthStatus } from '../services/healthService.js'
import type { IApiSuccessResponse } from '../types/api.types.js'

export function getHealthController(
  _request: Request,
  response: Response<IApiSuccessResponse<ReturnType<typeof getHealthStatus>>>,
): void {
  response.status(200).json({
    success: true,
    data: getHealthStatus(),
  })
}
