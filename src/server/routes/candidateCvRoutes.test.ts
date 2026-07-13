import { beforeEach, describe, expect, it, vi } from 'vitest'

type RegisteredRoute = {
  method: string
  path: string
  handlers: Array<(...args: never[]) => unknown>
}

const registeredRoutes: RegisteredRoute[] = []

const controllerMock = vi.hoisted(() => ({
  analyzeCandidateCvController: vi.fn(),
  deleteCandidateCvController: vi.fn(),
  getCandidateCvsController: vi.fn(),
  getProfileExtractedDataController: vi.fn(),
  importCandidateCvController: vi.fn(),
}))

const authMock = vi.hoisted(() => ({
  authenticateRequest: vi.fn((_request, _response, next) => next?.()),
}))

const rateLimitMock = vi.hoisted(() => ({
  candidateCvUploadRateLimit: vi.fn((_request, _response, next) => next?.()),
}))

const asyncHandlerMock = vi.hoisted(() => ({
  asyncHandler: vi.fn((handler) => handler),
}))

const multerMock = vi.hoisted(() => {
  const uploadSingle = vi.fn((_request, _response, next) => next?.())
  const memoryStorage = vi.fn(() => ({}))

  return {
    default: Object.assign(vi.fn(() => ({
      single: uploadSingle,
    })), {
      memoryStorage,
    }),
    uploadSingle,
    memoryStorage,
  }
})

const expressMock = vi.hoisted(() => ({
  Router: vi.fn(() => ({
    delete: (path: string, ...handlers: RegisteredRoute['handlers']) => {
      registeredRoutes.push({ method: 'delete', path, handlers })
    },
    get: (path: string, ...handlers: RegisteredRoute['handlers']) => {
      registeredRoutes.push({ method: 'get', path, handlers })
    },
    post: (path: string, ...handlers: RegisteredRoute['handlers']) => {
      registeredRoutes.push({ method: 'post', path, handlers })
    },
    stack: registeredRoutes,
  })),
}))

vi.mock('../controllers/candidateCvController.js', () => controllerMock)
vi.mock('../middlewares/authenticateRequest.js', () => authMock)
vi.mock('../middlewares/rateLimiters.js', () => rateLimitMock)
vi.mock('../middlewares/asyncHandler.js', () => asyncHandlerMock)
vi.mock('express', () => expressMock)
vi.mock('multer', () => multerMock)

async function importCandidateCvRoutes() {
  vi.resetModules()
  return import('./candidateCvRoutes.js')
}

describe('candidateCvRoutes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    registeredRoutes.length = 0
  })

  it('wires the aggregate extracted-data route without a dynamic CV route', async () => {
    await importCandidateCvRoutes()

    const profileRouteIndex = registeredRoutes.findIndex(
      (layer) => layer.method === 'get' && layer.path === '/profile/cv/extracted-data',
    )
    const route = registeredRoutes[profileRouteIndex]

    expect(profileRouteIndex).toBeGreaterThanOrEqual(0)
    expect(route?.handlers).toEqual([
      authMock.authenticateRequest,
      controllerMock.getProfileExtractedDataController,
    ])
    expect(
      registeredRoutes.some(
        (layer) => layer.method === 'get' && layer.path.includes(':cvId') && layer.path.endsWith('/extracted-data'),
      ),
    ).toBe(false)
  })

  it('wires POST /profile/cv/:cvId/analyze with authenticateRequest then asyncHandler', async () => {
    await importCandidateCvRoutes()

    const route = registeredRoutes.find(
      (layer) => layer.method === 'post' && layer.path === '/profile/cv/:cvId/analyze',
    )

    expect(route?.handlers).toEqual([
      authMock.authenticateRequest,
      controllerMock.analyzeCandidateCvController,
    ])
  })

  it('does not apply rate limiting or multer on the analyze route', async () => {
    await importCandidateCvRoutes()

    const route = registeredRoutes.find(
      (layer) => layer.method === 'post' && layer.path === '/profile/cv/:cvId/analyze',
    )

    expect(route?.handlers.some((handler) => handler.name.includes('rateLimit'))).toBe(false)
    expect(route?.handlers.some((handler) => handler.name.includes('multer'))).toBe(false)
  })
})
