import { beforeEach, describe, expect, it, vi } from 'vitest'

const reactQueryMock = vi.hoisted(() => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
  useQueryClient: vi.fn(),
}))
const serviceMock = vi.hoisted(() => ({
  createGeneratedCv: vi.fn(),
  getGeneratedCv: vi.fn(),
  getGeneratedCvs: vi.fn(),
  getPublicGeneratedCv: vi.fn(),
}))

vi.mock('@tanstack/react-query', () => reactQueryMock)
vi.mock('../services/generatedCvService', () => serviceMock)

describe('generated CV hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    reactQueryMock.useQuery.mockReturnValue({ data: [] })
    reactQueryMock.useMutation.mockReturnValue({ mutate: vi.fn() })
    reactQueryMock.useQueryClient.mockReturnValue({ invalidateQueries: vi.fn() })
  })

  it('configures the list, detail, and public queries with dedicated keys', async () => {
    const { useGeneratedCvs } = await import('./useGeneratedCvs')
    const { useGeneratedCv } = await import('./useGeneratedCv')
    const { usePublicGeneratedCv } = await import('./usePublicGeneratedCv')

    useGeneratedCvs()
    useGeneratedCv('cv-1')
    usePublicGeneratedCv('public-1')

    expect(reactQueryMock.useQuery).toHaveBeenNthCalledWith(1, expect.objectContaining({
      queryKey: ['resumes', 'generated-cvs'],
      queryFn: serviceMock.getGeneratedCvs,
    }))
    expect(reactQueryMock.useQuery).toHaveBeenNthCalledWith(2, expect.objectContaining({
      queryKey: ['resumes', 'generated-cvs', 'cv-1'],
      enabled: true,
    }))
    expect(reactQueryMock.useQuery).toHaveBeenNthCalledWith(3, expect.objectContaining({
      queryKey: ['resumes', 'public-generated-cvs', 'public-1'],
      enabled: true,
    }))
  })

  it('disables detail queries when their identifier is empty', async () => {
    const { useGeneratedCv } = await import('./useGeneratedCv')
    const { usePublicGeneratedCv } = await import('./usePublicGeneratedCv')

    useGeneratedCv('')
    usePublicGeneratedCv('')

    expect(reactQueryMock.useQuery).toHaveBeenNthCalledWith(1, expect.objectContaining({ enabled: false }))
    expect(reactQueryMock.useQuery).toHaveBeenNthCalledWith(2, expect.objectContaining({ enabled: false }))
  })

  it('invalidates only generated CVs after creation', async () => {
    const queryClient = { invalidateQueries: vi.fn().mockResolvedValue(undefined) }
    reactQueryMock.useQueryClient.mockReturnValue(queryClient)
    const { useCreateGeneratedCv } = await import('./useCreateGeneratedCv')

    useCreateGeneratedCv()
    const options = reactQueryMock.useMutation.mock.calls[0]?.[0]
    await options.onSuccess()

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: ['resumes', 'generated-cvs'],
    })
    expect(queryClient.invalidateQueries).toHaveBeenCalledTimes(1)
  })
})
