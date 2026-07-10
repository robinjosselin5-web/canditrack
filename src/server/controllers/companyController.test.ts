import type { NextFunction, Request, Response } from 'express'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AppError } from '../errors/appError.js'

const authMock = vi.hoisted(() => ({
  getAuthenticatedUserId: vi.fn(),
}))

const companyServiceMock = vi.hoisted(() => ({
  createCompanyForUser: vi.fn(),
  deleteCompanyForUser: vi.fn(),
  getCompanyForUser: vi.fn(),
  getCompaniesForUser: vi.fn(),
  updateCompanyFavoriteForUser: vi.fn(),
  updateCompanyForUser: vi.fn(),
}))

vi.mock('../utils/auth.js', () => authMock)
vi.mock('../services/companyService.js', () => companyServiceMock)

async function importCompanyController() {
  vi.resetModules()
  return import('./companyController.js')
}

function createResponse() {
  const response = {
    json: vi.fn(),
    status: vi.fn(),
  } as unknown as Response & {
    json: ReturnType<typeof vi.fn>
    status: ReturnType<typeof vi.fn>
  }

  response.status.mockReturnValue(response)

  return response
}

describe('companyController', () => {
  const response = createResponse()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getCompanyId', () => {
    it('throws when the id is not a UUID', async () => {
      const { getCompanyController } = await importCompanyController()

      const request = {
        params: { id: 'not-a-uuid' },
      } as Request<{ id: string }>

      await expect(getCompanyController(request, response)).rejects.toThrow(
        'Identifiant invalide.',
      )
    })

    it('passes a valid UUID to the service', async () => {
      const { getCompanyController } = await importCompanyController()

      authMock.getAuthenticatedUserId.mockReturnValue('user-1')
      companyServiceMock.getCompanyForUser.mockResolvedValue({
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

      const request = {
        params: { id: '123e4567-e89b-12d3-a456-426614174000' },
      } as Request<{ id: string }>

      await getCompanyController(request, response)

      expect(companyServiceMock.getCompanyForUser).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174000',
        'user-1',
      )
    })
  })

  describe('handlers', () => {
    it('createCompanyController returns the created DTO', async () => {
      const { createCompanyController } = await importCompanyController()

      authMock.getAuthenticatedUserId.mockReturnValue('user-1')
      companyServiceMock.createCompanyForUser.mockResolvedValue({
        id: 'company-1',
        name: 'ACME',
        status: 'draft',
      })

      const request = {
        body: {
          categoryId: '123e4567-e89b-12d3-a456-426614174000',
          city: 'Paris',
          country: 'France',
          email: 'contact@example.com',
          name: 'ACME',
          phone: '0123456789',
          recruiterName: 'Jane Doe',
          website: 'https://example.com',
        },
      } as Request

      await createCompanyController(request, response)

      expect(authMock.getAuthenticatedUserId).toHaveBeenCalledWith(request)
      expect(companyServiceMock.createCompanyForUser).toHaveBeenCalledWith({
        categoryId: '123e4567-e89b-12d3-a456-426614174000',
        city: 'Paris',
        country: 'France',
        email: 'contact@example.com',
        name: 'ACME',
        phone: '0123456789',
        recruiterName: 'Jane Doe',
        userId: 'user-1',
        website: 'https://example.com',
      })
      expect(response.status).toHaveBeenCalledWith(201)
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        data: {
          id: 'company-1',
          name: 'ACME',
          status: 'draft',
        },
      })
    })

    it('getCompaniesController returns the list DTO', async () => {
      const { getCompaniesController } = await importCompanyController()

      authMock.getAuthenticatedUserId.mockReturnValue('user-1')
      companyServiceMock.getCompaniesForUser.mockResolvedValue([])

      const request = {} as Request

      await getCompaniesController(request, response)

      expect(authMock.getAuthenticatedUserId).toHaveBeenCalledWith(request)
      expect(companyServiceMock.getCompaniesForUser).toHaveBeenCalledWith(
        'user-1',
      )
      expect(response.status).toHaveBeenCalledWith(200)
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        data: [],
      })
    })

    it('getCompanyController returns 404 when the service returns null', async () => {
      const { getCompanyController } = await importCompanyController()

      authMock.getAuthenticatedUserId.mockReturnValue('user-1')
      companyServiceMock.getCompanyForUser.mockResolvedValue(null)

      const request = {
        params: { id: '123e4567-e89b-12d3-a456-426614174000' },
      } as Request<{ id: string }>

      await expect(getCompanyController(request, response)).rejects.toThrow(
        'Entreprise introuvable.',
      )
      expect(companyServiceMock.getCompanyForUser).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174000',
        'user-1',
      )
    })

    it('getCompanyController returns the DTO when the service finds a company', async () => {
      const { getCompanyController } = await importCompanyController()

      authMock.getAuthenticatedUserId.mockReturnValue('user-1')
      companyServiceMock.getCompanyForUser.mockResolvedValue({
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

      const request = {
        params: { id: '123e4567-e89b-12d3-a456-426614174000' },
      } as Request<{ id: string }>

      await getCompanyController(request, response)

      expect(response.status).toHaveBeenCalledWith(200)
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        data: {
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
        },
      })
    })

    it('updateCompanyController returns 404 when the service returns null', async () => {
      const { updateCompanyController } = await importCompanyController()

      authMock.getAuthenticatedUserId.mockReturnValue('user-1')
      companyServiceMock.updateCompanyForUser.mockResolvedValue(null)

      const request = {
        body: {
          categoryId: '123e4567-e89b-12d3-a456-426614174000',
          city: 'Paris',
          country: 'France',
          email: 'contact@example.com',
          name: 'ACME',
          phone: '0123456789',
          recruiterName: 'Jane Doe',
          website: 'https://example.com',
        },
        params: { id: '123e4567-e89b-12d3-a456-426614174000' },
      } as Request<{ id: string }>

      await expect(updateCompanyController(request, response)).rejects.toThrow(
        'Entreprise introuvable.',
      )
      expect(companyServiceMock.updateCompanyForUser).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174000',
        'user-1',
        {
          categoryId: '123e4567-e89b-12d3-a456-426614174000',
          city: 'Paris',
          country: 'France',
          email: 'contact@example.com',
          name: 'ACME',
          phone: '0123456789',
          recruiterName: 'Jane Doe',
          website: 'https://example.com',
        },
      )
    })

    it('updateCompanyController returns the DTO when the service updates a company', async () => {
      const { updateCompanyController } = await importCompanyController()

      authMock.getAuthenticatedUserId.mockReturnValue('user-1')
      companyServiceMock.updateCompanyForUser.mockResolvedValue({
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

      const request = {
        body: {
          categoryId: '123e4567-e89b-12d3-a456-426614174000',
          city: 'Lyon',
          country: 'France',
          email: 'updated@example.com',
          name: 'ACME Updated',
          phone: '0102030405',
          recruiterName: 'Jane Doe',
          website: 'https://acme.example',
        },
        params: { id: '123e4567-e89b-12d3-a456-426614174000' },
      } as Request<{ id: string }>

      await updateCompanyController(request, response)

      expect(response.status).toHaveBeenCalledWith(200)
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        data: {
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
        },
      })
    })

    it('deleteCompanyController returns 404 when the service returns false', async () => {
      const { deleteCompanyController } = await importCompanyController()

      authMock.getAuthenticatedUserId.mockReturnValue('user-1')
      companyServiceMock.deleteCompanyForUser.mockResolvedValue(false)

      const request = {
        params: { id: '123e4567-e89b-12d3-a456-426614174000' },
      } as Request<{ id: string }>

      await expect(deleteCompanyController(request, response)).rejects.toThrow(
        'Entreprise introuvable.',
      )
      expect(companyServiceMock.deleteCompanyForUser).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174000',
        'user-1',
      )
    })

    it('deleteCompanyController returns the expected success DTO', async () => {
      const { deleteCompanyController } = await importCompanyController()

      authMock.getAuthenticatedUserId.mockReturnValue('user-1')
      companyServiceMock.deleteCompanyForUser.mockResolvedValue(true)

      const request = {
        params: { id: '123e4567-e89b-12d3-a456-426614174000' },
      } as Request<{ id: string }>

      await deleteCompanyController(request, response)

      expect(response.status).toHaveBeenCalledWith(200)
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        data: {
          message: 'Entreprise supprimée avec succès.',
        },
      })
    })

    it('updateCompanyFavoriteController returns 404 when the service returns false', async () => {
      const { updateCompanyFavoriteController } = await importCompanyController()

      authMock.getAuthenticatedUserId.mockReturnValue('user-1')
      companyServiceMock.updateCompanyFavoriteForUser.mockResolvedValue(false)

      const request = {
        body: {
          isFavorite: true,
        },
        params: { id: '123e4567-e89b-12d3-a456-426614174000' },
      } as Request<{ id: string }>

      await expect(
        updateCompanyFavoriteController(request, response),
      ).rejects.toThrow('Entreprise introuvable.')
      expect(companyServiceMock.updateCompanyFavoriteForUser).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174000',
        'user-1',
        true,
      )
    })

    it('updateCompanyFavoriteController returns the expected DTO', async () => {
      const { updateCompanyFavoriteController } = await importCompanyController()

      authMock.getAuthenticatedUserId.mockReturnValue('user-1')
      companyServiceMock.updateCompanyFavoriteForUser.mockResolvedValue(true)

      const request = {
        body: {
          isFavorite: false,
        },
        params: { id: '123e4567-e89b-12d3-a456-426614174000' },
      } as Request<{ id: string }>

      await updateCompanyFavoriteController(request, response)

      expect(response.status).toHaveBeenCalledWith(200)
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        data: {
          isFavorite: false,
        },
      })
    })

    it('uses getAuthenticatedUserId before calling the service', async () => {
      const { getCompaniesController } = await importCompanyController()

      authMock.getAuthenticatedUserId.mockReturnValue('user-1')
      companyServiceMock.getCompaniesForUser.mockResolvedValue([])

      const request = {} as Request

      await getCompaniesController(request, response)

      expect(authMock.getAuthenticatedUserId).toHaveBeenCalledWith(request)
      expect(companyServiceMock.getCompaniesForUser).toHaveBeenCalledWith(
        'user-1',
      )
    })
  })
})
