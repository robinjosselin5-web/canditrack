import type { Request, Response } from 'express'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AppError } from '../errors/appError.js'

const authMock = vi.hoisted(() => ({
  getAuthenticatedUserId: vi.fn(),
}))

const candidateCvServiceMock = vi.hoisted(() => ({
  analyzeCandidateCv: vi.fn(),
  deleteCandidateCv: vi.fn(),
  getCandidateCvs: vi.fn(),
  getProfileExtractedData: vi.fn(),
  importCandidateCv: vi.fn(),
}))

vi.mock('../utils/auth.js', () => authMock)
vi.mock('../services/candidateCvService.js', () => candidateCvServiceMock)

async function importCandidateCvController() {
  vi.resetModules()
  return import('./candidateCvController.js')
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

describe('candidateCvController', () => {
  let response: ReturnType<typeof createResponse>

  beforeEach(() => {
    vi.clearAllMocks()
    response = createResponse()
    authMock.getAuthenticatedUserId.mockReturnValue('user-1')
  })

  describe('getProfileExtractedDataController', () => {
    it('reads aggregated extracted data for the authenticated user without URL params', async () => {
      const { getProfileExtractedDataController } =
        await importCandidateCvController()
      const extractedData = {
        experiences: [],
        skills: [],
        trainings: [],
      }
      candidateCvServiceMock.getProfileExtractedData.mockResolvedValueOnce(
        extractedData,
      )

      const request = {} as Request

      await getProfileExtractedDataController(request, response)

      expect(authMock.getAuthenticatedUserId).toHaveBeenCalledWith(request)
      expect(candidateCvServiceMock.getProfileExtractedData).toHaveBeenCalledWith(
        'user-1',
      )
      expect(response.status).toHaveBeenCalledWith(200)
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        data: extractedData,
      })
    })

    it('propagates the missing candidate profile error', async () => {
      const { getProfileExtractedDataController } =
        await importCandidateCvController()
      candidateCvServiceMock.getProfileExtractedData.mockRejectedValueOnce(
        new AppError('Profil candidat introuvable.', 404),
      )

      await expect(
        getProfileExtractedDataController({} as Request, response),
      ).rejects.toMatchObject({
        message: 'Profil candidat introuvable.',
        statusCode: 404,
      })
    })
  })

  describe('analyzeCandidateCvController', () => {
    it.each([
      ['abc'],
      ['12345'],
      [''],
      ['123e4567-e89b-62d3-a456-426614174000'],
      ['123e4567-e89b-12d3-c456-426614174000'],
    ])('rejects invalid CV ids: %s', async (cvId) => {
      const { analyzeCandidateCvController } = await importCandidateCvController()

      const request = {
        params: { cvId },
      } as Request<{ cvId: string }>

      await expect(analyzeCandidateCvController(request, response)).rejects.toMatchObject({
        message: 'Identifiant de CV invalide.',
        statusCode: 400,
      })
    })

    it('accepts a valid uppercase UUID', async () => {
      const { analyzeCandidateCvController } = await importCandidateCvController()

      const request = {
        params: { cvId: '123E4567-E89B-12D3-A456-426614174000' },
      } as Request<{ cvId: string }>

      await analyzeCandidateCvController(request, response)

      expect(candidateCvServiceMock.analyzeCandidateCv).toHaveBeenCalledWith(
        'user-1',
        '123E4567-E89B-12D3-A456-426614174000',
      )
      expect(response.status).toHaveBeenCalledWith(200)
    })

    it('throws a 400 for a non-UUID CV id', async () => {
      const { analyzeCandidateCvController } = await importCandidateCvController()

      const request = {
        params: { cvId: 'bad-id' },
      } as Request<{ cvId: string }>

      await expect(analyzeCandidateCvController(request, response)).rejects.toMatchObject(
        {
          message: 'Identifiant de CV invalide.',
          statusCode: 400,
        },
      )
    })

    it('throws a 401 when request.userId is absent', async () => {
      authMock.getAuthenticatedUserId.mockImplementationOnce(() => {
        throw new AppError('Authentification requise.', 401)
      })

      const { analyzeCandidateCvController } = await importCandidateCvController()

      const request = {
        params: { cvId: '123e4567-e89b-12d3-a456-426614174000' },
      } as Request<{ cvId: string }>

      await expect(analyzeCandidateCvController(request, response)).rejects.toMatchObject({
        message: 'Authentification requise.',
        statusCode: 401,
      })

      expect(candidateCvServiceMock.analyzeCandidateCv).not.toHaveBeenCalled()
    })

    it('calls the service with the authenticated user id', async () => {
      const { analyzeCandidateCvController } = await importCandidateCvController()

      const request = {
        params: { cvId: '123e4567-e89b-12d3-a456-426614174000' },
      } as Request<{ cvId: string }>

      await analyzeCandidateCvController(request, response)

      expect(authMock.getAuthenticatedUserId).toHaveBeenCalledWith(request)
      expect(candidateCvServiceMock.analyzeCandidateCv).toHaveBeenCalledWith(
        'user-1',
        '123e4567-e89b-12d3-a456-426614174000',
      )
      expect(response.status).toHaveBeenCalledWith(200)
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        data: null,
      })
    })

    it.each([
      new AppError('CV introuvable.', 404),
      new AppError('Accès refusé.', 403),
      new AppError('Une analyse est deja en cours.', 409),
      new AppError('Analyse temporairement indisponible.', 503),
      new AppError("L'analyse du CV a échoué.", 500),
    ])('propagates service errors unchanged: %s', async (error) => {
      const { analyzeCandidateCvController } = await importCandidateCvController()

      candidateCvServiceMock.analyzeCandidateCv.mockRejectedValueOnce(error)

      const request = {
        params: { cvId: '123e4567-e89b-12d3-a456-426614174000' },
      } as Request<{ cvId: string }>

      await expect(analyzeCandidateCvController(request, response)).rejects.toMatchObject({
        message: error.message,
        statusCode: error.statusCode,
      })
    })
  })

  describe('request.userId handling', () => {
    it('throws a 401 when the request has no userId', async () => {
      authMock.getAuthenticatedUserId.mockImplementationOnce(() => {
        throw new AppError('Authentification requise.', 401)
      })

      const { analyzeCandidateCvController } = await importCandidateCvController()

      const request = {
        params: { cvId: '123e4567-e89b-12d3-a456-426614174000' },
      } as Request<{ cvId: string }>

      await expect(analyzeCandidateCvController(request, response)).rejects.toMatchObject(
        {
          message: 'Authentification requise.',
          statusCode: 401,
        },
      )
    })
  })
})
