import type { Company } from '@prisma/client'
import { prisma } from '../config/prisma.js'
import type { ICreateCompanyInput } from '../types/company.types.js'
import { normalizeWebsiteUrl } from '../utils/normalizeWebsiteUrl.js'

export async function createCompany(
  data: ICreateCompanyInput,
): Promise<{
  id: string
  name: string
  status: Company['status']
}> {
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
    select: { id: true, name: true, status: true },
  })

  return company
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
): Promise<
  Array<{
    city: string | null
    country: string | null
    createdAt: Date
    email: string | null
    id: string
    isFavorite: boolean
    name: string
    phone: string | null
    recruiterName: string | null
    status: Company['status']
    updatedAt: Date
    website: string | null
  }>
> {
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

  return companies
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
): Promise<{
  city: string | null
  country: string | null
  createdAt: Date
  email: string | null
  id: string
  name: string
  phone: string | null
  recruiterName: string | null
  status: Company['status']
  updatedAt: Date
  website: string | null
} | null> {
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
      createdAt: true,
      updatedAt: true,
    },
  })

  return updatedCompany
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
