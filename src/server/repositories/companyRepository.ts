import type { Company } from '../generated/prisma/client.js'
import { prisma } from '../config/prisma.js'
import type {
  ICreateCompanyInput,
  ICompanyCreatedResponse,
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
