import {
  deleteCompanyById,
  findCompaniesByUserId,
  findCompanyByIdForUser,
  updateCompanyFavoriteById,
  updateCompanyById,
} from '../repositories/companyRepository.js'
import type {
  ICompanyListItem,
  ICompanyListItem as ICompanyDetails,
  ICompanyUpdatedResponse,
} from '../types/company.types.js'

interface IUpdateCompanyInput {
  categoryId?: string
  city?: string
  country?: string
  email: string
  name: string
  phone?: string
  recruiterName?: string
  website: string
}

export async function getCompaniesForUser(
  userId: string,
): Promise<ICompanyListItem[]> {
  return findCompaniesByUserId(userId)
}

export async function getCompanyForUser(
  companyId: string,
  userId: string,
): Promise<ICompanyDetails | null> {
  const company = await findCompanyByIdForUser(companyId, userId)

  if (!company) {
    return null
  }

  return {
    id: company.id,
    name: company.name,
    website: company.website,
    email: company.email,
    phone: company.phone,
    city: company.city,
    country: company.country,
    recruiterName: company.recruiterName,
    isFavorite: company.isFavorite,
    status: company.status.toLowerCase() as ICompanyDetails['status'],
    createdAt: company.createdAt.toISOString(),
    updatedAt: company.updatedAt.toISOString(),
  }
}

export async function updateCompanyForUser(
  companyId: string,
  userId: string,
  data: IUpdateCompanyInput,
): Promise<ICompanyUpdatedResponse | null> {
  return updateCompanyById(companyId, userId, data)
}

export async function deleteCompanyForUser(
  companyId: string,
  userId: string,
): Promise<boolean> {
  return deleteCompanyById(companyId, userId)
}

export async function updateCompanyFavoriteForUser(
  companyId: string,
  userId: string,
  isFavorite: boolean,
): Promise<boolean> {
  return updateCompanyFavoriteById(companyId, userId, isFavorite)
}
