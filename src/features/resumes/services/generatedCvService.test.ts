import { beforeEach, describe, expect, it, vi } from 'vitest'

const httpClientMock = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
}))

vi.mock('@/services/httpClient', () => ({ httpClient: httpClientMock }))

describe('generatedCvService', () => {
  beforeEach(() => vi.clearAllMocks())

  it('creates a generated CV', async () => {
    const payload = { title: 'Mon CV', experienceIds: [], skillIds: [], trainingIds: [] }
    const generatedCv = { id: 'cv-1', title: 'Mon CV' }
    httpClientMock.post.mockResolvedValueOnce({ data: { data: generatedCv } })
    const { createGeneratedCv } = await import('./generatedCvService')

    await expect(createGeneratedCv(payload)).resolves.toEqual(generatedCv)
    expect(httpClientMock.post).toHaveBeenCalledWith('/profile/generated-cvs', payload)
  })

  it('gets private list and detail endpoints', async () => {
    httpClientMock.get
      .mockResolvedValueOnce({ data: { data: [] } })
      .mockResolvedValueOnce({ data: { data: { id: 'cv-1' } } })
    const service = await import('./generatedCvService')

    await expect(service.getGeneratedCvs()).resolves.toEqual([])
    await expect(service.getGeneratedCv('cv-1')).resolves.toEqual({ id: 'cv-1' })
    expect(httpClientMock.get).toHaveBeenNthCalledWith(1, '/profile/generated-cvs')
    expect(httpClientMock.get).toHaveBeenNthCalledWith(2, '/profile/generated-cvs/cv-1')
  })

  it('gets public render data and prepares the avatar request', async () => {
    const renderData = { publicId: 'public-1', title: 'CV' }
    const avatar = new Blob(['avatar'], { type: 'image/jpeg' })
    httpClientMock.get
      .mockResolvedValueOnce({ data: { data: renderData } })
      .mockResolvedValueOnce({ data: avatar })
    const service = await import('./generatedCvService')

    await expect(service.getPublicGeneratedCv('public-1')).resolves.toEqual(renderData)
    await expect(service.getGeneratedCvAvatar('public-1')).resolves.toBe(avatar)
    expect(httpClientMock.get).toHaveBeenNthCalledWith(1, '/public/generated-cvs/public-1')
    expect(httpClientMock.get).toHaveBeenNthCalledWith(
      2,
      '/public/generated-cvs/public-1/avatar',
      { responseType: 'blob' },
    )
  })

  it('propagates API errors', async () => {
    const error = new Error('API failure')
    httpClientMock.get.mockRejectedValueOnce(error)
    const { getGeneratedCvs } = await import('./generatedCvService')

    await expect(getGeneratedCvs()).rejects.toBe(error)
  })
})
