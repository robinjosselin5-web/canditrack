import { beforeEach, describe, expect, it, vi } from 'vitest'

type RegisteredRoute = {
  method: string
  path: string
  handlers: Array<(...args: never[]) => unknown>
}

const registeredRoutes: RegisteredRoute[] = []

const controllerMock = vi.hoisted(() => ({
  createCandidateExperienceController: vi.fn(),
  createCandidateSkillController: vi.fn(),
  createCandidateTrainingController: vi.fn(),
  deleteCandidateExperienceController: vi.fn(),
  deleteCandidateSkillController: vi.fn(),
  deleteCandidateTrainingController: vi.fn(),
  updateCandidateExperienceController: vi.fn(),
  updateCandidateTrainingController: vi.fn(),
}))

const authMock = vi.hoisted(() => ({
  authenticateRequest: vi.fn((_request, _response, next) => next?.()),
}))

const rateLimitMock = vi.hoisted(() => ({
  candidateProfileDataCreateRateLimit: vi.fn((_request, _response, next) => next?.()),
}))

const validateBodyMock = vi.hoisted(() => ({
  validateBody: vi.fn((schema) => {
    void schema
    return (_request: unknown, _response: unknown, next: (() => void) | undefined) => next?.()
  }),
}))

const asyncHandlerMock = vi.hoisted(() => ({
  asyncHandler: vi.fn((handler) => handler),
}))

const expressMock = vi.hoisted(() => ({
  Router: vi.fn(() => ({
    delete: (path: string, ...handlers: RegisteredRoute['handlers']) => {
      registeredRoutes.push({ method: 'delete', path, handlers })
    },
    patch: (path: string, ...handlers: RegisteredRoute['handlers']) => {
      registeredRoutes.push({ method: 'patch', path, handlers })
    },
    post: (path: string, ...handlers: RegisteredRoute['handlers']) => {
      registeredRoutes.push({ method: 'post', path, handlers })
    },
    stack: registeredRoutes,
  })),
}))

vi.mock('../controllers/candidateProfileDataController.js', () => controllerMock)
vi.mock('../middlewares/authenticateRequest.js', () => authMock)
vi.mock('../middlewares/rateLimiters.js', () => rateLimitMock)
vi.mock('../middlewares/validateBody.js', () => validateBodyMock)
vi.mock('../middlewares/asyncHandler.js', () => asyncHandlerMock)
vi.mock('express', () => expressMock)

async function importCandidateProfileDataRoutes() {
  vi.resetModules()
  return import('./candidateProfileDataRoutes.js')
}

describe('candidateProfileDataRoutes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    registeredRoutes.length = 0
  })

  it('applies the shared rate limiter only to manual creation routes', async () => {
    await importCandidateProfileDataRoutes()

    const postExperienceRoute = registeredRoutes.find(
      (layer) => layer.method === 'post' && layer.path === '/profile/experiences',
    )
    const postTrainingRoute = registeredRoutes.find(
      (layer) => layer.method === 'post' && layer.path === '/profile/trainings',
    )
    const postSkillRoute = registeredRoutes.find(
      (layer) => layer.method === 'post' && layer.path === '/profile/skills',
    )

    expect(postExperienceRoute?.handlers).toEqual([
      authMock.authenticateRequest,
      rateLimitMock.candidateProfileDataCreateRateLimit,
      validateBodyMock.validateBody.mock.results[0]?.value,
      controllerMock.createCandidateExperienceController,
    ])
    expect(postTrainingRoute?.handlers).toEqual([
      authMock.authenticateRequest,
      rateLimitMock.candidateProfileDataCreateRateLimit,
      validateBodyMock.validateBody.mock.results[2]?.value,
      controllerMock.createCandidateTrainingController,
    ])
    expect(postSkillRoute?.handlers).toEqual([
      authMock.authenticateRequest,
      rateLimitMock.candidateProfileDataCreateRateLimit,
      validateBodyMock.validateBody.mock.results[4]?.value,
      controllerMock.createCandidateSkillController,
    ])

    expect(
      registeredRoutes
        .filter((layer) => layer.method !== 'post')
        .every((layer) =>
          layer.handlers.every(
            (handler) => handler !== rateLimitMock.candidateProfileDataCreateRateLimit,
          ),
        ),
    ).toBe(true)
  })
})
