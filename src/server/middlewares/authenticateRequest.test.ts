import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AppError } from '../errors/appError.js'

const envMock = vi.hoisted(() => ({
  env: {
    JWT_SECRET: 'development-secret-change-me-32-chars',
  },
}))

vi.mock('../config/env.js', () => envMock)
vi.mock('jsonwebtoken', () => ({
  default: {
    TokenExpiredError: class TokenExpiredError extends Error {
      expiredAt: Date

      constructor(message: string, expiredAt: Date) {
        super(message)
        this.name = 'TokenExpiredError'
        this.expiredAt = expiredAt
      }
    },
    verify: vi.fn(),
  },
}))

const jwtMock = jwt as unknown as {
  verify: ReturnType<typeof vi.fn>
}

function createRequest(authorization?: string): Request {
  return {
    headers: {
      authorization,
    },
  } as Request
}

describe('authenticateRequest', () => {
  const response = {} as Response
  const next = vi.fn() as unknown as NextFunction

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('throws when the Authorization header is missing', async () => {
    const { authenticateRequest } = await import('./authenticateRequest.js')

    expect(() => authenticateRequest(createRequest(), response, next)).toThrow(
      AppError,
    )
    expect(() => authenticateRequest(createRequest(), response, next)).toThrow(
      'Authentification requise.',
    )
  })

  it('throws when the Authorization header is malformed', async () => {
    const { authenticateRequest } = await import('./authenticateRequest.js')

    expect(() =>
      authenticateRequest(createRequest('Token abc'), response, next),
    ).toThrow('Authentification requise.')
    expect(() =>
      authenticateRequest(createRequest('abc'), response, next),
    ).toThrow('Authentification requise.')
  })

  it('populates request.userId and request.user for a valid token', async () => {
    const { authenticateRequest } = await import('./authenticateRequest.js')

    jwtMock.verify.mockReturnValue({
      sub: 'user-1',
      email: 'test@example.com',
    })

    const request = createRequest('Bearer valid-token')
    authenticateRequest(request, response, next)

    expect(jwtMock.verify).toHaveBeenCalledWith(
      'valid-token',
      envMock.env.JWT_SECRET,
    )
    expect(request.userId).toBe('user-1')
    expect(request.user).toEqual({
      id: 'user-1',
      email: 'test@example.com',
    })
    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith()
  })

  it('throws when the token is expired', async () => {
    const { authenticateRequest } = await import('./authenticateRequest.js')

    jwtMock.verify.mockImplementation(() => {
      throw new jwt.TokenExpiredError('jwt expired', new Date())
    })

    expect(() =>
      authenticateRequest(createRequest('Bearer expired-token'), response, next),
    ).toThrow('Session expiree, veuillez vous reconnecter.')
  })

  it('throws when the token signature is invalid', async () => {
    const { authenticateRequest } = await import('./authenticateRequest.js')

    jwtMock.verify.mockImplementation(() => {
      throw new Error('invalid signature')
    })

    expect(() =>
      authenticateRequest(createRequest('Bearer invalid-token'), response, next),
    ).toThrow('Token invalide.')
  })

  it('throws when the decoded payload sub is not a string', async () => {
    const { authenticateRequest } = await import('./authenticateRequest.js')

    jwtMock.verify.mockReturnValue({
      sub: 123,
      email: 'test@example.com',
    })

    expect(() =>
      authenticateRequest(createRequest('Bearer valid-token'), response, next),
    ).toThrow('Authentification requise.')
  })
})
