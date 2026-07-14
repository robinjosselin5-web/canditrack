import { beforeEach, describe, expect, it, vi } from 'vitest'

const httpClientMock = vi.hoisted(() => ({
  get: vi.fn(),
  delete: vi.fn(),
  patch: vi.fn(),
  post: vi.fn(),
}))

vi.mock('@/services/httpClient', () => ({ httpClient: httpClientMock }))

describe('candidateResumeService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('gets aggregated extracted data without a CV id', async () => {
    const extractedData = {
      experiences: [],
      skills: [],
      trainings: [],
    }
    httpClientMock.get.mockResolvedValueOnce({ data: { data: extractedData } })

    const { getProfileExtractedData } = await import('./candidateResumeService.js')

    await expect(getProfileExtractedData()).resolves.toEqual(extractedData)
    expect(httpClientMock.get).toHaveBeenCalledWith('/profile/cv/extracted-data')
  })

  it('creates an experience with the protected fields excluded', async () => {
    const experience = {
      id: 'experience-1',
      candidateCvId: null,
      source: 'MANUAL',
      jobTitle: 'Developpeur',
      companyName: null,
      startDate: null,
      endDate: null,
      isCurrent: false,
      location: null,
      description: null,
    }
    const payload = {
      jobTitle: 'Developpeur',
      companyName: null,
      startDate: null,
      endDate: null,
      location: null,
    }
    httpClientMock.post.mockResolvedValueOnce({ data: { data: experience } })

    const { createCandidateExperience } = await import('./candidateResumeService.js')

    await expect(createCandidateExperience(payload)).resolves.toEqual(experience)
    expect(httpClientMock.post).toHaveBeenCalledWith('/profile/experiences', payload)
  })

  it('updates an experience with PATCH and preserves explicit null values', async () => {
    const experience = {
      id: 'experience-1',
      candidateCvId: 'cv-1',
      source: 'MANUAL',
      jobTitle: 'Senior developpeur',
      companyName: null,
      startDate: null,
      endDate: null,
      isCurrent: false,
      location: null,
      description: null,
    }
    const payload = { jobTitle: 'Senior developpeur', companyName: null }
    httpClientMock.patch.mockResolvedValueOnce({ data: { data: experience } })

    const { updateCandidateExperience } = await import('./candidateResumeService.js')

    await expect(updateCandidateExperience('experience-1', payload)).resolves.toEqual(experience)
    expect(httpClientMock.patch).toHaveBeenCalledWith(
      '/profile/experiences/experience-1',
      payload,
    )
  })

  it('deletes an experience with the correct identifier', async () => {
    httpClientMock.delete.mockResolvedValueOnce({
      data: { data: { message: 'Experience supprimee avec succes.' } },
    })

    const { deleteCandidateExperience } = await import('./candidateResumeService.js')

    await expect(deleteCandidateExperience('experience-1')).resolves.toBe(
      'Experience supprimee avec succes.',
    )
    expect(httpClientMock.delete).toHaveBeenCalledWith(
      '/profile/experiences/experience-1',
    )
  })

  it('creates a training with the expected endpoint and returns the response data', async () => {
    const training = { id: 'training-1', title: 'Formation web', source: 'MANUAL' }
    const payload = { title: 'Formation web', isCertification: false, certificationType: null }
    httpClientMock.post.mockResolvedValueOnce({ data: { data: training } })

    const { createCandidateTraining } = await import('./candidateResumeService.js')

    await expect(createCandidateTraining(payload)).resolves.toEqual(training)
    expect(httpClientMock.post).toHaveBeenCalledWith('/profile/trainings', payload)
  })

  it('updates a training with PATCH and preserves explicit null values', async () => {
    const training = { id: 'training-1', title: 'Formation avancee', certificationType: null, source: 'MANUAL' }
    const payload = { title: 'Formation avancee', certificationType: null }
    httpClientMock.patch.mockResolvedValueOnce({ data: { data: training } })

    const { updateCandidateTraining } = await import('./candidateResumeService.js')

    await expect(updateCandidateTraining('training-1', payload)).resolves.toEqual(training)
    expect(httpClientMock.patch).toHaveBeenCalledWith('/profile/trainings/training-1', payload)
  })

  it('deletes a training and returns the API message', async () => {
    httpClientMock.delete.mockResolvedValueOnce({
      data: { data: { message: 'Formation supprimee avec succes.' } },
    })

    const { deleteCandidateTraining } = await import('./candidateResumeService.js')

    await expect(deleteCandidateTraining('training-1')).resolves.toBe('Formation supprimee avec succes.')
    expect(httpClientMock.delete).toHaveBeenCalledWith('/profile/trainings/training-1')
  })

  it('propagates HTTP errors for training mutations', async () => {
    const error = new Error('network failure')
    httpClientMock.post.mockRejectedValueOnce(error)
    const { createCandidateTraining } = await import('./candidateResumeService.js')

    await expect(createCandidateTraining({ title: 'Formation web' })).rejects.toBe(error)
  })

  it('creates and deletes a skill with the expected endpoints', async () => {
    const skill = { id: 'skill-1', name: 'TypeScript', category: 'PROGRAMMING_LANGUAGES', candidateCvId: null, dataSource: 'MANUAL', confidence: null, source: null }
    httpClientMock.post.mockResolvedValueOnce({ data: { data: skill } })
    httpClientMock.delete.mockResolvedValueOnce({ data: { data: { message: 'Competence supprimee avec succes.' } } })
    const service = await import('./candidateResumeService.js')
    const payload = { name: 'TypeScript', category: 'PROGRAMMING_LANGUAGES' as const }

    await expect(service.createCandidateSkill(payload)).resolves.toEqual(skill)
    await expect(service.deleteCandidateSkill('skill-1')).resolves.toBe('Competence supprimee avec succes.')
    expect(httpClientMock.post).toHaveBeenCalledWith('/profile/skills', payload)
    expect(httpClientMock.delete).toHaveBeenCalledWith('/profile/skills/skill-1')
  })
})
