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
})
