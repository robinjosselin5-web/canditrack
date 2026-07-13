import {
  createCompany as createCompanyRecord,
  deleteCompanyById,
  findCompaniesByUserId,
  findCompanyByIdForUser,
  updateCompanyFavoriteById,
  updateCompanyById,
} from '../repositories/companyRepository.js'
import type {
  ICompanyCreatedResponse,
  ICompanyListItem,
  ICompanyListItem as ICompanyDetails,
  ICompanyUpdatedResponse,
  ICreateCompanyInput,
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

export async function createCompanyForUser(
  data: ICreateCompanyInput,
): Promise<ICompanyCreatedResponse> {
  const company = await createCompanyRecord(data)

  return {
    id: company.id,
    name: company.name,
    status: company.status.toLowerCase() as ICompanyCreatedResponse['status'],
  }
}

export async function getCompaniesForUser(
  userId: string,
): Promise<ICompanyListItem[]> {
  const companies = await findCompaniesByUserId(userId)

  return companies.map(mapCompanyRecordToListItem)
}

export async function getCompanyForUser(
  companyId: string,
  userId: string,
): Promise<ICompanyDetails | null> {
  const company = await findCompanyByIdForUser(companyId, userId)

  if (!company) {
    return null
  }

  return mapCompanyRecordToDetails(company)
}

export async function updateCompanyForUser(
  companyId: string,
  userId: string,
  data: IUpdateCompanyInput,
): Promise<ICompanyUpdatedResponse | null> {
  const company = await updateCompanyById(companyId, userId, data)

  if (!company) {
    return null
  }

  return mapCompanyRecordToUpdatedResponse(company)
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

function mapCompanyRecordToListItem(company: {
  city: string | null
  country: string | null
  createdAt: Date
  email: string | null
  id: string
  isFavorite: boolean
  name: string
  phone: string | null
  recruiterName: string | null
  status: string
  updatedAt: Date
  website: string | null
}): ICompanyListItem {
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

function mapCompanyRecordToDetails(company: {
  city: string | null
  country: string | null
  createdAt: Date
  email: string | null
  id: string
  isFavorite: boolean
  name: string
  phone: string | null
  recruiterName: string | null
  status: string
  updatedAt: Date
  website: string | null
}): ICompanyDetails {
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

function mapCompanyRecordToUpdatedResponse(company: {
  city: string | null
  country: string | null
  createdAt: Date
  email: string | null
  id: string
  name: string
  phone: string | null
  recruiterName: string | null
  status: string
  updatedAt: Date
  website: string | null
}): ICompanyUpdatedResponse {
  return {
    id: company.id,
    name: company.name,
    website: company.website,
    email: company.email,
    phone: company.phone,
    city: company.city,
    country: company.country,
    recruiterName: company.recruiterName,
    status: company.status.toLowerCase() as ICompanyUpdatedResponse['status'],
    updatedAt: company.updatedAt.toISOString(),
  }
}
