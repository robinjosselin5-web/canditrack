import {
  deleteCompanyById,
  findCompaniesByUserId,
  updateCompanyById,
} from '../repositories/companyRepository.js'
import type {
  ICompanyListItem,
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
