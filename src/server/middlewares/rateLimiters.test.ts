import type { Request, Response } from 'express'
import { describe, expect, it, vi } from 'vitest'

vi.mock('express-rate-limit', () => ({
  rateLimit: (options: unknown) => options,
}))

const {
  candidateCvUploadRateLimit,
  candidateProfileDataCreateRateLimit,
  emailVerificationRateLimit,
  forgotPasswordRateLimit,
  loginRateLimit,
} = await import(
  './rateLimiters.js'
)

type RateLimitConfig = {
  handler: (request: Request, response: Response) => void
  limit: number
  windowMs: number
}

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

function expectRateLimit(
  limiter: RateLimitConfig,
  expectedLimit: number,
  expectedWindowMs: number,
  expectedMessage: string,
): void {
  expect(limiter.limit).toBe(expectedLimit)
  expect(limiter.windowMs).toBe(expectedWindowMs)

  const request = {
    ip: '127.0.0.1',
    method: 'POST',
    originalUrl: '/test',
    url: '/test',
    headers: {},
  } as Request

  const response = createResponse()
  limiter.handler(request, response)

  expect(response.status).toHaveBeenCalledWith(429)
  expect(response.json).toHaveBeenCalledWith({
    success: false,
    message: expectedMessage,
    errors: [],
  })
}

describe('rateLimiters', () => {
  it('loginRateLimit blocks after 5 requests in 15 minutes', () => {
    expectRateLimit(
      loginRateLimit as unknown as RateLimitConfig,
      5,
      15 * 60 * 1000,
      'Trop de tentatives de connexion. Reessayez dans 15 minutes.',
    )
  })

  it('emailVerificationRateLimit blocks after 5 requests in 15 minutes', () => {
    expectRateLimit(
      emailVerificationRateLimit as unknown as RateLimitConfig,
      5,
      15 * 60 * 1000,
      'Trop de tentatives de verification e-mail. Reessayez dans 15 minutes.',
    )
  })

  it('forgotPasswordRateLimit blocks after 3 requests in 15 minutes', () => {
    expectRateLimit(
      forgotPasswordRateLimit as unknown as RateLimitConfig,
      3,
      15 * 60 * 1000,
      'Trop de demandes de reinitialisation. Reessayez dans 15 minutes.',
    )
  })

  it('candidateCvUploadRateLimit blocks after 10 requests in 1 hour', () => {
    expectRateLimit(
      candidateCvUploadRateLimit as unknown as RateLimitConfig,
      10,
      60 * 60 * 1000,
      "Trop d'envois de CV. Reessayez dans 1 heure.",
    )
  })

  it('candidateProfileDataCreateRateLimit blocks after 30 requests in 1 hour', () => {
    expectRateLimit(
      candidateProfileDataCreateRateLimit as unknown as RateLimitConfig,
      30,
      60 * 60 * 1000,
      'Trop de creations de donnees extraites. Reessayez dans 1 heure.',
    )
  })
})
