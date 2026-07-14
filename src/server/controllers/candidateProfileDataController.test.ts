import type { Request, Response } from 'express'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const authMock = vi.hoisted(() => ({
  getAuthenticatedUserId: vi.fn(),
}))

const serviceMock = vi.hoisted(() => ({
  createExperienceForUser: vi.fn(),
  createSkillForUser: vi.fn(),
  deleteSkillForUser: vi.fn(),
  deleteExperienceForUser: vi.fn(),
  updateExperienceForUser: vi.fn(),
  createTrainingForUser: vi.fn(),
  deleteTrainingForUser: vi.fn(),
  updateTrainingForUser: vi.fn(),
}))

vi.mock('../utils/auth.js', () => authMock)
vi.mock('../services/candidateProfileDataService.js', () => serviceMock)

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

describe('candidateProfileDataController', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates an experience for the authenticated user', async () => {
    const { createCandidateExperienceController } = await import('./candidateProfileDataController.js')
    const response = createResponse()
    const request = {
      body: { jobTitle: 'Developpeur' },
    } as Request
    authMock.getAuthenticatedUserId.mockReturnValue('user-1')
    serviceMock.createExperienceForUser.mockResolvedValueOnce({ id: 'experience-1' })

    await createCandidateExperienceController(request, response)

    expect(serviceMock.createExperienceForUser).toHaveBeenCalledWith('user-1', request.body)
    expect(response.status).toHaveBeenCalledWith(201)
    expect(response.json).toHaveBeenCalledWith({
      success: true,
      data: { id: 'experience-1' },
    })
  })

  it('updates an experience with a valid UUID', async () => {
    const { updateCandidateExperienceController } = await import('./candidateProfileDataController.js')
    const response = createResponse()
    const request = {
      params: { experienceId: '123e4567-e89b-12d3-a456-426614174000' },
      body: { jobTitle: 'Senior developpeur' },
    } as Request<{ experienceId: string }>
    authMock.getAuthenticatedUserId.mockReturnValue('user-1')
    serviceMock.updateExperienceForUser.mockResolvedValueOnce({ id: 'experience-1' })

    await updateCandidateExperienceController(request, response)

    expect(serviceMock.updateExperienceForUser).toHaveBeenCalledWith(
      'user-1',
      request.params.experienceId,
      request.body,
    )
    expect(response.status).toHaveBeenCalledWith(200)
  })

  it('rejects an invalid UUID before calling the service', async () => {
    const { updateCandidateExperienceController } = await import('./candidateProfileDataController.js')
    const response = createResponse()
    const request = {
      params: { experienceId: 'not-a-uuid' },
      body: { jobTitle: 'Developpeur' },
    } as Request<{ experienceId: string }>

    await expect(updateCandidateExperienceController(request, response)).rejects.toMatchObject({
      statusCode: 400,
    })
    expect(serviceMock.updateExperienceForUser).not.toHaveBeenCalled()
  })

  it('deletes an experience and returns the standard success response', async () => {
    const { deleteCandidateExperienceController } = await import('./candidateProfileDataController.js')
    const response = createResponse()
    const request = {
      params: { experienceId: '123e4567-e89b-12d3-a456-426614174000' },
    } as Request<{ experienceId: string }>
    authMock.getAuthenticatedUserId.mockReturnValue('user-1')
    serviceMock.deleteExperienceForUser.mockResolvedValueOnce(true)

    await deleteCandidateExperienceController(request, response)

    expect(serviceMock.deleteExperienceForUser).toHaveBeenCalledWith(
      'user-1',
      request.params.experienceId,
    )
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).toHaveBeenCalledWith({
      success: true,
      data: { message: 'Experience supprimee avec succes.' },
    })
  })

  it('returns 404 when the service cannot delete the experience', async () => {
    const { deleteCandidateExperienceController } = await import('./candidateProfileDataController.js')
    const response = createResponse()
    const request = {
      params: { experienceId: '123e4567-e89b-12d3-a456-426614174000' },
    } as Request<{ experienceId: string }>
    authMock.getAuthenticatedUserId.mockReturnValue('user-1')
    serviceMock.deleteExperienceForUser.mockResolvedValueOnce(false)

    await expect(deleteCandidateExperienceController(request, response)).rejects.toMatchObject({
      statusCode: 404,
    })
  })

  it('creates and updates a training for the authenticated user', async () => {
    const controllers = await import('./candidateProfileDataController.js')
    const response = createResponse()
    authMock.getAuthenticatedUserId.mockReturnValue('user-1')
    serviceMock.createTrainingForUser.mockResolvedValueOnce({ id: 'training-1' })
    await controllers.createCandidateTrainingController({ body: { title: 'Formation' } } as Request, response)
    expect(serviceMock.createTrainingForUser).toHaveBeenCalledWith('user-1', { title: 'Formation' })
    expect(response.status).toHaveBeenCalledWith(201)

    serviceMock.updateTrainingForUser.mockResolvedValueOnce({ id: 'training-1' })
    await controllers.updateCandidateTrainingController({ params: { trainingId: '123e4567-e89b-12d3-a456-426614174000' }, body: { title: 'Master' } } as Request, response)
    expect(serviceMock.updateTrainingForUser).toHaveBeenCalledWith('user-1', '123e4567-e89b-12d3-a456-426614174000', { title: 'Master' })
  })

  it('deletes a training and rejects invalid ids', async () => {
    const controllers = await import('./candidateProfileDataController.js')
    const response = createResponse()
    authMock.getAuthenticatedUserId.mockReturnValue('user-1')
    serviceMock.deleteTrainingForUser.mockResolvedValueOnce(true)
    await controllers.deleteCandidateTrainingController({ params: { trainingId: '123e4567-e89b-12d3-a456-426614174000' } } as Request, response)
    expect(serviceMock.deleteTrainingForUser).toHaveBeenCalledWith('user-1', '123e4567-e89b-12d3-a456-426614174000')
    expect(response.json).toHaveBeenCalledWith({ success: true, data: { message: 'Formation supprimee avec succes.' } })
    await expect(controllers.updateCandidateTrainingController({ params: { trainingId: 'bad' }, body: {} } as Request, response)).rejects.toMatchObject({ statusCode: 400 })
  })

  it('creates and deletes a skill with UUID validation', async () => {
    const controllers = await import('./candidateProfileDataController.js')
    const response = createResponse()
    authMock.getAuthenticatedUserId.mockReturnValue('user-1')
    serviceMock.createSkillForUser.mockResolvedValueOnce({ id: 'skill-1' })
    await controllers.createCandidateSkillController({ body: { name: 'TypeScript', category: 'LANGUAGES' } } as Request, response)
    expect(serviceMock.createSkillForUser).toHaveBeenCalledWith('user-1', { name: 'TypeScript', category: 'LANGUAGES' })
    serviceMock.deleteSkillForUser.mockResolvedValueOnce(true)
    await controllers.deleteCandidateSkillController({ params: { skillId: '123e4567-e89b-12d3-a456-426614174000' } } as Request, response)
    expect(serviceMock.deleteSkillForUser).toHaveBeenCalledWith('user-1', '123e4567-e89b-12d3-a456-426614174000')
    await expect(controllers.deleteCandidateSkillController({ params: { skillId: 'bad' } } as Request, response)).rejects.toMatchObject({ statusCode: 400 })
    serviceMock.deleteSkillForUser.mockResolvedValueOnce(false)
    await expect(controllers.deleteCandidateSkillController({ params: { skillId: '123e4567-e89b-12d3-a456-426614174000' } } as Request, response)).rejects.toMatchObject({ statusCode: 404 })
  })
})
