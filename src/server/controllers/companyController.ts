import type { Request, Response } from 'express'
import { AppError } from '../errors/appError.js'
import { getAuthenticatedUserId } from '../utils/auth.js'
import type { IApiSuccessResponse } from '../types/api.types.js'
import type {
  ICompanyCreatedResponse,
  ICompanyListItem,
  ICompanyUpdatedResponse,
} from '../types/company.types.js'
import type {
  CreateCompanyBody,
  UpdateCompanyFavoriteBody,
} from '../validators/companyValidators.js'
import {
  createCompanyForUser,
  deleteCompanyForUser,
  getCompanyForUser,
  getCompaniesForUser,
  updateCompanyFavoriteForUser,
  updateCompanyForUser,
} from '../services/companyService.js'
import type { UpdateCompanyBody } from '../validators/companyUpdateValidators.js'

export async function createCompanyController(
  request: Request<unknown, unknown, CreateCompanyBody>,
  response: Response<IApiSuccessResponse<ICompanyCreatedResponse>>,
): Promise<void> {
  const company = await createCompanyForUser({
    categoryId: request.body.categoryId,
    city: request.body.city,
    country: request.body.country,
    email: request.body.email,
    name: request.body.name,
    phone: request.body.phone,
    recruiterName: request.body.recruiterName,
    userId: getAuthenticatedUserId(request),
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
  const companies = await getCompaniesForUser(getAuthenticatedUserId(request))

  response.status(200).json({
    success: true,
    data: companies,
  })
}

export async function getCompanyController(
  request: Request<{ id: string }>,
  response: Response<IApiSuccessResponse<ICompanyListItem>>,
): Promise<void> {
  const companyId = getCompanyId(request.params.id)
  const company = await getCompanyForUser(companyId, getAuthenticatedUserId(request))

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
  const companyId = getCompanyId(request.params.id)
  const company = await updateCompanyForUser(companyId, getAuthenticatedUserId(request), {
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
  const companyId = getCompanyId(request.params.id)
  const deleted = await deleteCompanyForUser(companyId, getAuthenticatedUserId(request))

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

export async function updateCompanyFavoriteController(
  request: Request<{ id: string }, unknown, UpdateCompanyFavoriteBody>,
  response: Response<IApiSuccessResponse<{ isFavorite: boolean }>>,
): Promise<void> {
  const companyId = getCompanyId(request.params.id)
  const updated = await updateCompanyFavoriteForUser(
    companyId,
    getAuthenticatedUserId(request),
    request.body.isFavorite,
  )

  if (!updated) {
    throw new AppError('Entreprise introuvable.', 404)
  }

  response.status(200).json({
    success: true,
    data: {
      isFavorite: request.body.isFavorite,
    },
  })
}

function getCompanyId(companyId: string): string {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  if (!uuidRegex.test(companyId)) {
    throw new AppError('Identifiant invalide.', 400)
  }

  return companyId
}
