import type { Request, Response } from 'express'
import { AppError } from '../errors/appError.js'
import type { IApiSuccessResponse } from '../types/api.types.js'
import type {
  ICompanyCreatedResponse,
  ICompanyListItem,
  ICompanyUpdatedResponse,
} from '../types/company.types.js'
import type { CreateCompanyBody } from '../validators/companyValidators.js'
import { createCompany as createCompanyRecord } from '../repositories/companyRepository.js'
import {
  deleteCompanyForUser,
  getCompanyForUser,
  getCompaniesForUser,
  updateCompanyForUser,
} from '../services/companyService.js'
import type { UpdateCompanyBody } from '../validators/companyUpdateValidators.js'

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

export async function getCompaniesController(
  request: Request,
  response: Response<IApiSuccessResponse<ICompanyListItem[]>>,
): Promise<void> {
  if (!request.user) {
    throw new AppError('Non autorise.', 401)
  }

  const companies = await getCompaniesForUser(request.user.id)

  response.status(200).json({
    success: true,
    data: companies,
  })
}

export async function getCompanyController(
  request: Request<{ id: string }>,
  response: Response<IApiSuccessResponse<ICompanyListItem>>,
): Promise<void> {
  if (!request.user) {
    throw new AppError('Non autorise.', 401)
  }

  const company = await getCompanyForUser(request.params.id, request.user.id)

  if (!company) {
    throw new AppError('Entreprise introuvable.', 404)
  }

  response.status(200).json({
    success: true,
    data: company,
  })
}

export async function updateCompanyController(
  request: Request<{ id: string }, unknown, UpdateCompanyBody>,
  response: Response<IApiSuccessResponse<ICompanyUpdatedResponse>>,
): Promise<void> {
  if (!request.user) {
    throw new AppError('Non autorise.', 401)
  }

  const company = await updateCompanyForUser(request.params.id, request.user.id, {
    categoryId: request.body.categoryId,
    city: request.body.city,
    country: request.body.country,
    email: request.body.email,
    name: request.body.name,
    phone: request.body.phone,
    recruiterName: request.body.recruiterName,
    website: request.body.website,
  })

  if (!company) {
    throw new AppError('Entreprise introuvable.', 404)
  }

  response.status(200).json({
    success: true,
    data: company,
  })
}

export async function deleteCompanyController(
  request: Request<{ id: string }>,
  response: Response<IApiSuccessResponse<{ message: string }>>,
): Promise<void> {
  if (!request.user) {
    throw new AppError('Non autorise.', 401)
  }

  const deleted = await deleteCompanyForUser(request.params.id, request.user.id)

  if (!deleted) {
    throw new AppError('Entreprise introuvable.', 404)
  }

  response.status(200).json({
    success: true,
    data: {
      message: 'Entreprise supprimée avec succès.',
    },
  })
}
