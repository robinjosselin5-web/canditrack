import { beforeEach, describe, expect, it, vi } from 'vitest'

const httpClientMock = vi.hoisted(() => ({
  get: vi.fn(),
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
})
