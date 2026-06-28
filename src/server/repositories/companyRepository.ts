import type { Company } from '../generated/prisma/client.js'
import { prisma } from '../config/prisma.js'
import type {
  ICreateCompanyInput,
  ICompanyCreatedResponse,
  ICompanyListItem,
  ICompanyUpdatedResponse,
} from '../types/company.types.js'
import { normalizeWebsiteUrl } from '../utils/normalizeWebsiteUrl.js'

export async function createCompany(
  data: ICreateCompanyInput,
): Promise<ICompanyCreatedResponse> {
  const company = await prisma.company.create({
    data: {
      categoryId: data.categoryId,
      city: data.city,
      country: data.country,
      email: data.email,
      name: data.name,
      phone: data.phone,
      recruiterName: data.recruiterName,
      status: 'DRAFT',
      userId: data.userId,
      website: normalizeWebsiteUrl(data.website),
    },
    select: {
      id: true,
      name: true,
      status: true,
    },
  })

  return {
    id: company.id,
    name: company.name,
    status: 'draft',
  }
}

export async function findCompanyById(companyId: string): Promise<Company | null> {
  return prisma.company.findUnique({
    where: { id: companyId },
  })
}

export async function findCompanyByIdForUser(
  companyId: string,
  userId: string,
): Promise<Company | null> {
  return prisma.company.findFirst({
    where: {
      id: companyId,
      userId,
    },
  })
}

export async function findCompaniesByUserId(
  userId: string,
): Promise<ICompanyListItem[]> {
  const companies = await prisma.company.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      website: true,
      email: true,
      phone: true,
      city: true,
      country: true,
      recruiterName: true,
      isFavorite: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return companies.map((company) => ({
    id: company.id,
    name: company.name,
    website: company.website,
    email: company.email,
    phone: company.phone,
    city: company.city,
    country: company.country,
    recruiterName: company.recruiterName,
    isFavorite: company.isFavorite,
    status: company.status.toLowerCase() as ICompanyListItem['status'],
    createdAt: company.createdAt.toISOString(),
    updatedAt: company.updatedAt.toISOString(),
  }))
}

export async function updateCompanyFavoriteById(
  companyId: string,
  userId: string,
  isFavorite: boolean,
): Promise<boolean> {
  const result = await prisma.company.updateMany({
    where: {
      id: companyId,
      userId,
    },
    data: {
      isFavorite,
    },
  })

  return result.count > 0
}

export async function updateCompanyById(
  companyId: string,
  userId: string,
  data: {
    categoryId?: string
    city?: string
    country?: string
    email: string
    name: string
    phone?: string
    recruiterName?: string
    website: string
  },
): Promise<ICompanyUpdatedResponse | null> {
  const company = await prisma.company.updateMany({
    where: {
      id: companyId,
      userId,
    },
    data: {
      categoryId: data.categoryId,
      city: data.city,
      country: data.country,
      email: data.email,
      name: data.name,
      phone: data.phone,
      recruiterName: data.recruiterName,
      website: normalizeWebsiteUrl(data.website),
    },
  })

  if (company.count === 0) {
    return null
  }

  const updatedCompany = await prisma.company.findFirst({
    where: {
      id: companyId,
      userId,
    },
    select: {
      id: true,
      name: true,
      website: true,
      email: true,
      phone: true,
      city: true,
      country: true,
      recruiterName: true,
      status: true,
      updatedAt: true,
    },
  })

  if (!updatedCompany) {
    return null
  }

  return {
    id: updatedCompany.id,
    name: updatedCompany.name,
    website: updatedCompany.website,
    email: updatedCompany.email,
    phone: updatedCompany.phone,
    city: updatedCompany.city,
    country: updatedCompany.country,
    recruiterName: updatedCompany.recruiterName,
    status: updatedCompany.status.toLowerCase() as ICompanyUpdatedResponse['status'],
    updatedAt: updatedCompany.updatedAt.toISOString(),
  }
}

export async function deleteCompanyById(
  companyId: string,
  userId: string,
): Promise<boolean> {
  const result = await prisma.company.deleteMany({
    where: {
      id: companyId,
      userId,
    },
  })

  return result.count > 0
}
