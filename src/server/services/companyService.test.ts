import { beforeEach, describe, expect, it, vi } from 'vitest'

const companyRepositoryMock = vi.hoisted(() => ({
  createCompany: vi.fn(),
  deleteCompanyById: vi.fn(),
  findCompaniesByUserId: vi.fn(),
  findCompanyByIdForUser: vi.fn(),
  updateCompanyById: vi.fn(),
  updateCompanyFavoriteById: vi.fn(),
}))

vi.mock('../repositories/companyRepository.js', () => companyRepositoryMock)

async function importCompanyService() {
  vi.resetModules()
  return import('./companyService.js')
}

describe('companyService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createCompanyForUser', () => {
    it('calls the repository and returns a lowercased status', async () => {
      const { createCompanyForUser } = await importCompanyService()

      companyRepositoryMock.createCompany.mockResolvedValue({
        id: 'company-1',
        name: 'ACME',
        status: 'DRAFT',
      })

      const result = await createCompanyForUser({
        userId: 'user-1',
        name: 'ACME',
        website: 'https://example.com',
        email: 'contact@example.com',
      })

      expect(companyRepositoryMock.createCompany).toHaveBeenCalledWith({
        userId: 'user-1',
        name: 'ACME',
        website: 'https://example.com',
        email: 'contact@example.com',
      })
      expect(result).toEqual({
        id: 'company-1',
        name: 'ACME',
        status: 'draft',
      })
    })

    it('does not require an explicit status in the input', async () => {
      const { createCompanyForUser } = await importCompanyService()

      companyRepositoryMock.createCompany.mockResolvedValue({
        id: 'company-2',
        name: 'Beta',
        status: 'DRAFT',
      })

      await createCompanyForUser({
        userId: 'user-2',
        name: 'Beta',
        website: 'example.com',
      })

      expect(companyRepositoryMock.createCompany).toHaveBeenCalledWith({
        userId: 'user-2',
        name: 'Beta',
        website: 'example.com',
      })
    })
  })

  describe('getCompaniesForUser', () => {
    it('returns a mapped list for the given userId', async () => {
      const { getCompaniesForUser } = await importCompanyService()

      companyRepositoryMock.findCompaniesByUserId.mockResolvedValue([
        {
          id: 'company-1',
          name: 'ACME',
          website: 'https://example.com',
          email: 'contact@example.com',
          phone: '0123456789',
          city: 'Paris',
          country: 'France',
          recruiterName: 'Jane Doe',
          isFavorite: true,
          status: 'DRAFT',
          createdAt: new Date('2025-01-01T00:00:00.000Z'),
          updatedAt: new Date('2025-01-02T00:00:00.000Z'),
        },
      ])

      const result = await getCompaniesForUser('user-1')

      expect(companyRepositoryMock.findCompaniesByUserId).toHaveBeenCalledWith(
        'user-1',
      )
      expect(result).toEqual([
        {
          id: 'company-1',
          name: 'ACME',
          website: 'https://example.com',
          email: 'contact@example.com',
          phone: '0123456789',
          city: 'Paris',
          country: 'France',
          recruiterName: 'Jane Doe',
          isFavorite: true,
          status: 'draft',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-02T00:00:00.000Z',
        },
      ])
    })

    it('returns an empty array when the user has no companies', async () => {
      const { getCompaniesForUser } = await importCompanyService()

      companyRepositoryMock.findCompaniesByUserId.mockResolvedValue([])

      await expect(getCompaniesForUser('user-1')).resolves.toEqual([])
      expect(companyRepositoryMock.findCompaniesByUserId).toHaveBeenCalledWith(
        'user-1',
      )
    })
  })

  describe('getCompanyForUser', () => {
    it('returns company details when the company belongs to the user', async () => {
      const { getCompanyForUser } = await importCompanyService()

      companyRepositoryMock.findCompanyByIdForUser.mockResolvedValue({
        id: 'company-1',
        name: 'ACME',
        website: 'https://example.com',
        email: 'contact@example.com',
        phone: '0123456789',
        city: 'Paris',
        country: 'France',
        recruiterName: 'Jane Doe',
        isFavorite: false,
        status: 'DRAFT',
        createdAt: new Date('2025-01-01T00:00:00.000Z'),
        updatedAt: new Date('2025-01-02T00:00:00.000Z'),
      })

      const result = await getCompanyForUser('company-1', 'user-1')

      expect(companyRepositoryMock.findCompanyByIdForUser).toHaveBeenCalledWith(
        'company-1',
        'user-1',
      )
      expect(result).toEqual({
        id: 'company-1',
        name: 'ACME',
        website: 'https://example.com',
        email: 'contact@example.com',
        phone: '0123456789',
        city: 'Paris',
        country: 'France',
        recruiterName: 'Jane Doe',
        isFavorite: false,
        status: 'draft',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-02T00:00:00.000Z',
      })
    })

    it('returns null when the company does not exist or belongs to another user', async () => {
      const { getCompanyForUser } = await importCompanyService()

      companyRepositoryMock.findCompanyByIdForUser.mockResolvedValue(null)

      await expect(getCompanyForUser('company-1', 'user-1')).resolves.toBeNull()
      expect(companyRepositoryMock.findCompanyByIdForUser).toHaveBeenCalledWith(
        'company-1',
        'user-1',
      )
    })
  })

  describe('updateCompanyForUser', () => {
    it('returns an updated response when the update succeeds', async () => {
      const { updateCompanyForUser } = await importCompanyService()

      companyRepositoryMock.updateCompanyById.mockResolvedValue({
        id: 'company-1',
        name: 'ACME Updated',
        website: 'https://acme.example',
        email: 'updated@example.com',
        phone: '0102030405',
        city: 'Lyon',
        country: 'France',
        recruiterName: 'Jane Doe',
        status: 'DRAFT',
        createdAt: new Date('2025-01-01T00:00:00.000Z'),
        updatedAt: new Date('2025-01-03T00:00:00.000Z'),
      })

      const payload = {
        name: 'ACME Updated',
        website: 'https://acme.example',
        email: 'updated@example.com',
        phone: '0102030405',
        city: 'Lyon',
        country: 'France',
        recruiterName: 'Jane Doe',
      }

      const result = await updateCompanyForUser('company-1', 'user-1', payload)

      expect(companyRepositoryMock.updateCompanyById).toHaveBeenCalledWith(
        'company-1',
        'user-1',
        payload,
      )
      expect(result).toEqual({
        id: 'company-1',
        name: 'ACME Updated',
        website: 'https://acme.example',
        email: 'updated@example.com',
        phone: '0102030405',
        city: 'Lyon',
        country: 'France',
        recruiterName: 'Jane Doe',
        status: 'draft',
        updatedAt: '2025-01-03T00:00:00.000Z',
      })
    })

    it('returns null when no company is updated', async () => {
      const { updateCompanyForUser } = await importCompanyService()

      companyRepositoryMock.updateCompanyById.mockResolvedValue(null)

      await expect(
        updateCompanyForUser('company-1', 'user-1', {
          name: 'ACME Updated',
          website: 'https://acme.example',
          email: 'updated@example.com',
          phone: '0102030405',
          city: 'Lyon',
          country: 'France',
          recruiterName: 'Jane Doe',
        }),
      ).resolves.toBeNull()
    })

    it('passes the validated payload without dropping fields', async () => {
      const { updateCompanyForUser } = await importCompanyService()

      companyRepositoryMock.updateCompanyById.mockResolvedValue(null)

      const payload = {
        name: 'ACME Updated',
        website: 'https://acme.example',
        email: 'updated@example.com',
        phone: '0102030405',
        city: 'Lyon',
        country: 'France',
        recruiterName: 'Jane Doe',
        categoryId: '123e4567-e89b-12d3-a456-426614174000',
      }

      await updateCompanyForUser('company-1', 'user-1', payload)

      expect(companyRepositoryMock.updateCompanyById).toHaveBeenCalledWith(
        'company-1',
        'user-1',
        payload,
      )
    })
  })

  describe('deleteCompanyForUser', () => {
    it('returns true when the deletion succeeds', async () => {
      const { deleteCompanyForUser } = await importCompanyService()

      companyRepositoryMock.deleteCompanyById.mockResolvedValue(true)

      await expect(deleteCompanyForUser('company-1', 'user-1')).resolves.toBe(
        true,
      )
      expect(companyRepositoryMock.deleteCompanyById).toHaveBeenCalledWith(
        'company-1',
        'user-1',
      )
    })

    it('returns false when the company does not exist or belongs to another user', async () => {
      const { deleteCompanyForUser } = await importCompanyService()

      companyRepositoryMock.deleteCompanyById.mockResolvedValue(false)

      await expect(deleteCompanyForUser('company-1', 'user-1')).resolves.toBe(
        false,
      )
    })
  })

  describe('updateCompanyFavoriteForUser', () => {
    it('returns true when the toggle succeeds', async () => {
      const { updateCompanyFavoriteForUser } = await importCompanyService()

      companyRepositoryMock.updateCompanyFavoriteById.mockResolvedValue(true)

      await expect(
        updateCompanyFavoriteForUser('company-1', 'user-1', true),
      ).resolves.toBe(true)
      expect(companyRepositoryMock.updateCompanyFavoriteById).toHaveBeenCalledWith(
        'company-1',
        'user-1',
        true,
      )
    })

    it('returns false when the company does not exist or belongs to another user', async () => {
      const { updateCompanyFavoriteForUser } = await importCompanyService()

      companyRepositoryMock.updateCompanyFavoriteById.mockResolvedValue(false)

      await expect(
        updateCompanyFavoriteForUser('company-1', 'user-1', false),
      ).resolves.toBe(false)
    })
  })
})
