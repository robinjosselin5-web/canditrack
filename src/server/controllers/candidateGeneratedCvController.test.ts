import type { Request, Response } from 'express'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AppError } from '../errors/appError.js'

const authMock = vi.hoisted(() => ({ getAuthenticatedUserId: vi.fn() }))
const serviceMock = vi.hoisted(() => ({
  createGeneratedCvForUser: vi.fn(),
  getGeneratedCvForUser: vi.fn(),
  getGeneratedCvsForUser: vi.fn(),
  getPublicGeneratedCv: vi.fn(),
}))
const avatarServiceMock = vi.hoisted(() => ({
  getGeneratedCvAvatarPlaceholder: vi.fn(),
}))

vi.mock('../utils/auth.js', () => authMock)
vi.mock('../services/candidateGeneratedCvService.js', () => serviceMock)
vi.mock('../services/candidateGeneratedCvAvatarService.js', () => avatarServiceMock)

function createResponse() {
  const response = { status: vi.fn(), json: vi.fn() } as unknown as Response & {
    status: ReturnType<typeof vi.fn>
    json: ReturnType<typeof vi.fn>
  }
  response.status.mockReturnValue(response)
  return response
}

describe('candidateGeneratedCvController', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    authMock.getAuthenticatedUserId.mockReturnValue('user-1')
  })

  it('creates a generated CV for the authenticated user', async () => {
    const { createGeneratedCvController } = await import('./candidateGeneratedCvController.js')
    const data = { id: 'generated-1', title: 'CV' }
    serviceMock.createGeneratedCvForUser.mockResolvedValueOnce(data)
    const request = { body: { title: 'CV', experienceIds: [], skillIds: [], trainingIds: [] } } as Request
    const response = createResponse()

    await createGeneratedCvController(request, response)

    expect(serviceMock.createGeneratedCvForUser).toHaveBeenCalledWith('user-1', request.body)
    expect(response.status).toHaveBeenCalledWith(201)
    expect(response.json).toHaveBeenCalledWith({ success: true, data })
  })

  it('returns the private list and detail', async () => {
    const { getGeneratedCvsController, getGeneratedCvController } = await import('./candidateGeneratedCvController.js')
    serviceMock.getGeneratedCvsForUser.mockResolvedValueOnce([])
    serviceMock.getGeneratedCvForUser.mockResolvedValueOnce({ id: 'generated-1' })
    const response = createResponse()

    await getGeneratedCvsController({} as Request, response)
    await getGeneratedCvController({ params: { generatedCvId: '123e4567-e89b-12d3-a456-426614174000' } } as Request, response)

    expect(response.json).toHaveBeenNthCalledWith(1, { success: true, data: [] })
    expect(serviceMock.getGeneratedCvForUser).toHaveBeenCalledWith('user-1', '123e4567-e89b-12d3-a456-426614174000')
  })

  it('rejects an invalid private UUID before calling the service', async () => {
    const { getGeneratedCvController } = await import('./candidateGeneratedCvController.js')

    await expect(getGeneratedCvController({ params: { generatedCvId: 'bad-id' } } as Request, createResponse()))
      .rejects.toMatchObject({ statusCode: 400 })
    expect(serviceMock.getGeneratedCvForUser).not.toHaveBeenCalled()
  })

  it('serves the public DTO without authentication', async () => {
    const { getPublicGeneratedCvController } = await import('./candidateGeneratedCvController.js')
    const data = { publicId: 'public-1', title: 'CV' }
    serviceMock.getPublicGeneratedCv.mockResolvedValueOnce(data)
    const response = createResponse()

    await getPublicGeneratedCvController({ params: { publicId: '123e4567-e89b-12d3-a456-426614174000' } } as Request, response)

    expect(authMock.getAuthenticatedUserId).not.toHaveBeenCalled()
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).toHaveBeenCalledWith({ success: true, data })
  })

  it('reserves the avatar endpoint with a 501 placeholder', async () => {
    const { getGeneratedCvAvatarController } = await import('./candidateGeneratedCvController.js')
    avatarServiceMock.getGeneratedCvAvatarPlaceholder.mockRejectedValueOnce(
      new AppError('Avatar indisponible.', 501),
    )

    await expect(getGeneratedCvAvatarController({
      params: { publicId: '123e4567-e89b-12d3-a456-426614174000' },
    } as Request, createResponse()))
      .rejects.toMatchObject({ statusCode: 501 })
  })
})
