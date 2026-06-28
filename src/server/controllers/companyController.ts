import type { Request, Response } from 'express'
import { AppError } from '../errors/appError.js'
import type { IApiSuccessResponse } from '../types/api.types.js'
import type { ICompanyCreatedResponse } from '../types/company.types.js'
import type { CreateCompanyBody } from '../validators/companyValidators.js'
import { createCompany as createCompanyRecord } from '../repositories/companyRepository.js'

export async function createCompanyController(
  request: Request<unknown, unknown, CreateCompanyBody>,
  response: Response<IApiSuccessResponse<ICompanyCreatedResponse>>,
): Promise<void> {
  if (!request.user) {
    throw new AppError('Non autorise.', 401)
  }

  const company = await createCompanyRecord({
    categoryId: request.body.categoryId,
    city: request.body.city,
    country: request.body.country,
    email: request.body.email,
    name: request.body.name,
    phone: request.body.phone,
    recruiterName: request.body.recruiterName,
    userId: request.user.id,
    website: request.body.website,
  })

  response.status(201).json({
    success: true,
    data: company,
  })
}
