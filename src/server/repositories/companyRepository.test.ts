import { beforeEach, describe, expect, it, vi } from 'vitest'

const prismaMock = vi.hoisted(() => ({
  company: {
    create: vi.fn(),
    deleteMany: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    updateMany: vi.fn(),
  },
}))

vi.mock('../config/prisma.js', () => ({
  prisma: prismaMock,
}))

async function importCompanyRepository() {
  vi.resetModules()
  return import('./companyRepository.js')
}

describe('companyRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('normalizeWebsiteUrl integration via createCompany / updateCompanyById', () => {
    it('prefixes https:// when no protocol is provided on createCompany', async () => {
      const { createCompany } = await importCompanyRepository()

      prismaMock.company.create.mockResolvedValue({
        id: 'company-1',
        name: 'ACME',
        status: 'DRAFT',
      })

      await createCompany({
        userId: 'user-1',
        name: 'ACME',
        website: 'example.com',
      })

      expect(prismaMock.company.create).toHaveBeenCalledWith({
        data: {
          categoryId: undefined,
          city: undefined,
          country: undefined,
          email: undefined,
          name: 'ACME',
          phone: undefined,
          recruiterName: undefined,
          status: 'DRAFT',
          userId: 'user-1',
          website: 'https://example.com',
        },
        select: { id: true, name: true, status: true },
      })
    })

    it('keeps an existing protocol unchanged on updateCompanyById', async () => {
      const { updateCompanyById } = await importCompanyRepository()

      prismaMock.company.updateMany.mockResolvedValue({ count: 1 })
      prismaMock.company.findFirst.mockResolvedValue({
        id: 'company-1',
        name: 'ACME',
        website: 'https://example.com',
        email: 'contact@example.com',
        phone: null,
        city: null,
        country: null,
        recruiterName: null,
        status: 'DRAFT',
        createdAt: new Date('2025-01-01T00:00:00.000Z'),
        updatedAt: new Date('2025-01-02T00:00:00.000Z'),
      })

      await updateCompanyById('company-1', 'user-1', {
        name: 'ACME',
        website: 'https://example.com',
        email: 'contact@example.com',
      })

      expect(prismaMock.company.updateMany).toHaveBeenCalledWith({
        where: {
          id: 'company-1',
          userId: 'user-1',
        },
        data: {
          categoryId: undefined,
          city: undefined,
          country: undefined,
          email: 'contact@example.com',
          name: 'ACME',
          phone: undefined,
          recruiterName: undefined,
          website: 'https://example.com',
        },
      })
    })
  })

  describe('tenant isolation', () => {
    it('scopes findCompaniesByUserId by userId', async () => {
      const { findCompaniesByUserId } = await importCompanyRepository()

      prismaMock.company.findMany.mockResolvedValue([])

      await findCompaniesByUserId('user-1')

      expect(prismaMock.company.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
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
    })

    it('scopes findCompanyByIdForUser by id and userId', async () => {
      const { findCompanyByIdForUser } = await importCompanyRepository()

      prismaMock.company.findFirst.mockResolvedValue(null)

      await findCompanyByIdForUser('company-1', 'user-1')

      expect(prismaMock.company.findFirst).toHaveBeenCalledWith({
        where: {
          id: 'company-1',
          userId: 'user-1',
        },
      })
    })

    it('scopes updateCompanyById by id and userId', async () => {
      const { updateCompanyById } = await importCompanyRepository()

      prismaMock.company.updateMany.mockResolvedValue({ count: 1 })
      prismaMock.company.findFirst.mockResolvedValue(null)

      await updateCompanyById('company-1', 'user-1', {
        name: 'ACME',
        website: 'example.com',
        email: 'contact@example.com',
      })

      expect(prismaMock.company.updateMany).toHaveBeenCalledWith({
        where: {
          id: 'company-1',
          userId: 'user-1',
        },
        data: {
          categoryId: undefined,
          city: undefined,
          country: undefined,
          email: 'contact@example.com',
          name: 'ACME',
          phone: undefined,
          recruiterName: undefined,
          website: 'https://example.com',
        },
      })
      expect(prismaMock.company.findFirst).toHaveBeenCalledWith({
        where: {
          id: 'company-1',
          userId: 'user-1',
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
    })

    it('scopes deleteCompanyById by id and userId', async () => {
      const { deleteCompanyById } = await importCompanyRepository()

      prismaMock.company.deleteMany.mockResolvedValue({ count: 1 })

      await deleteCompanyById('company-1', 'user-1')

      expect(prismaMock.company.deleteMany).toHaveBeenCalledWith({
        where: {
          id: 'company-1',
          userId: 'user-1',
        },
      })
    })

    it('scopes updateCompanyFavoriteById by id and userId', async () => {
      const { updateCompanyFavoriteById } = await importCompanyRepository()

      prismaMock.company.updateMany.mockResolvedValue({ count: 1 })

      await updateCompanyFavoriteById('company-1', 'user-1', true)

      expect(prismaMock.company.updateMany).toHaveBeenCalledWith({
        where: {
          id: 'company-1',
          userId: 'user-1',
        },
        data: {
          isFavorite: true,
        },
      })
    })
  })
})
