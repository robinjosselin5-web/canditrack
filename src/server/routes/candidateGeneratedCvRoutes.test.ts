import { beforeEach, describe, expect, it, vi } from 'vitest'

type RegisteredRoute = {
  method: string
  path: string
  handlers: unknown[]
}

const registeredRoutes: RegisteredRoute[] = []
const controllerMock = vi.hoisted(() => ({
  createGeneratedCvController: vi.fn(),
  getGeneratedCvAvatarController: vi.fn(),
  getGeneratedCvController: vi.fn(),
  getGeneratedCvsController: vi.fn(),
  getPublicGeneratedCvController: vi.fn(),
}))
const authMock = vi.hoisted(() => ({ authenticateRequest: vi.fn() }))
const validateMock = vi.hoisted(() => ({ validateBody: vi.fn(() => 'validateBody') }))
const asyncMock = vi.hoisted(() => ({ asyncHandler: vi.fn((handler) => handler) }))
const expressMock = vi.hoisted(() => ({
  Router: vi.fn(() => ({
    post: (path: string, ...handlers: unknown[]) => registeredRoutes.push({ method: 'post', path, handlers }),
    get: (path: string, ...handlers: unknown[]) => registeredRoutes.push({ method: 'get', path, handlers }),
  })),
}))

vi.mock('../controllers/candidateGeneratedCvController.js', () => controllerMock)
vi.mock('../middlewares/authenticateRequest.js', () => authMock)
vi.mock('../middlewares/validateBody.js', () => validateMock)
vi.mock('../middlewares/asyncHandler.js', () => asyncMock)
vi.mock('../validators/candidateGeneratedCvValidators.js', () => ({ createCandidateGeneratedCvBodySchema: {} }))
vi.mock('express', () => expressMock)

describe('candidateGeneratedCvRoutes', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
    registeredRoutes.length = 0
  })

  it('protects private routes and validates the creation body', async () => {
    await import('./candidateGeneratedCvRoutes.js')
    const createRoute = registeredRoutes.find((route) => route.method === 'post')
    const listRoute = registeredRoutes.find((route) => route.path === '/profile/generated-cvs' && route.method === 'get')

    expect(createRoute?.path).toBe('/profile/generated-cvs')
    expect(createRoute?.handlers).toEqual([
      authMock.authenticateRequest,
      'validateBody',
      controllerMock.createGeneratedCvController,
    ])
    expect(listRoute?.handlers).toEqual([
      authMock.authenticateRequest,
      controllerMock.getGeneratedCvsController,
    ])
  })

  it('keeps public routes unauthenticated and declares the avatar contract first', async () => {
    await import('./candidateGeneratedCvRoutes.js')
    const avatarIndex = registeredRoutes.findIndex((route) => route.path.endsWith('/avatar'))
    const publicIndex = registeredRoutes.findIndex((route) => route.path === '/public/generated-cvs/:publicId')
    const publicRoutes = registeredRoutes.filter((route) => route.path.startsWith('/public/generated-cvs'))

    expect(avatarIndex).toBeLessThan(publicIndex)
    expect(publicRoutes.every((route) => !route.handlers.includes(authMock.authenticateRequest))).toBe(true)
    expect(registeredRoutes.some((route) => route.path === '/profile/generated-cvs/:generatedCvId')).toBe(true)
  })
})
