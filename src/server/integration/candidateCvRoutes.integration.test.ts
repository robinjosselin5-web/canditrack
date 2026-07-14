import http from 'node:http'
import jwt from 'jsonwebtoken'
import type { SignOptions } from 'jsonwebtoken'
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { env } from '../config/env.js'

const candidateCvServiceMock = vi.hoisted(() => ({
  analyzeCandidateCv: vi.fn(),
  deleteCandidateCv: vi.fn(),
  getCandidateCvs: vi.fn(),
  getProfileExtractedData: vi.fn(),
  importCandidateCv: vi.fn(),
}))

vi.mock('../services/candidateCvService.js', () => candidateCvServiceMock)

let server: http.Server | undefined
let baseUrl = ''

async function startApp() {
  const { app } = await import('../app.js')

  const instance = app.listen(0)
  await new Promise<void>((resolve) => {
    instance.once('listening', resolve)
  })
  server = instance

  const address = instance.address()
  if (!address || typeof address === 'string') {
    throw new Error('Impossible to start test server')
  }

  baseUrl = `http://127.0.0.1:${address.port}`
}

async function stopApp() {
  if (!server) return

  await new Promise<void>((resolve, reject) => {
    server?.close((error) => {
      if (error) {
        reject(error)
        return
      }

      resolve()
    })
  })
  server = undefined
}

function createToken(expiresIn: SignOptions['expiresIn'] = '1h') {
  return jwt.sign({ sub: 'user-1', email: 'user@example.com' }, env.JWT_SECRET, {
    expiresIn,
  })
}

async function requestJson(
  path: string,
  options: RequestInit = {},
): Promise<{ body: unknown; status: number }> {
  const response = await fetch(`${baseUrl}${path}`, options)
  const body = await response.json()
  return { body, status: response.status }
}

describe('candidateCvRoutes integration', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    if (!server) {
      await startApp()
    }
  })

  afterEach(async () => {
    await stopApp()
  })

  it('GET /profile/cv/extracted-data returns the aggregated service payload', async () => {
    candidateCvServiceMock.getProfileExtractedData.mockResolvedValueOnce({
      experiences: [{ jobTitle: 'Developpeur' }],
      skills: [{ name: 'TypeScript' }],
      trainings: [{ title: 'Formation web' }],
    })

    const result = await requestJson('/api/v1/profile/cv/extracted-data', {
      headers: {
        Authorization: `Bearer ${createToken()}`,
      },
    })

    expect(result.status).toBe(200)
    expect(result.body).toEqual({
      success: true,
      data: {
        experiences: [{ jobTitle: 'Developpeur' }],
        skills: [{ name: 'TypeScript' }],
        trainings: [{ title: 'Formation web' }],
      },
    })
    expect(candidateCvServiceMock.getProfileExtractedData).toHaveBeenCalledWith(
      'user-1',
    )
  })

  it('GET /profile/cv/extracted-data returns empty data when the service returns an empty state', async () => {
    candidateCvServiceMock.getProfileExtractedData.mockResolvedValueOnce({
      experiences: [],
      skills: [],
      trainings: [],
    })

    const result = await requestJson('/api/v1/profile/cv/extracted-data', {
      headers: {
        Authorization: `Bearer ${createToken()}`,
      },
    })

    expect(result.status).toBe(200)
    expect(result.body).toEqual({
      success: true,
      data: {
        experiences: [],
        skills: [],
        trainings: [],
      },
    })
  })

  it('GET /profile/cv/extracted-data remains protected', async () => {
    const result = await requestJson('/api/v1/profile/cv/extracted-data')

    expect(result.status).toBe(401)
    expect(result.body).toEqual({
      success: false,
      message: 'Authentification requise.',
      errors: [],
    })
  })

  it('POST /profile/cv/:cvId/analyze returns 401 without auth', async () => {
    const result = await requestJson('/api/v1/profile/cv/123e4567-e89b-12d3-a456-426614174000/analyze', {
      method: 'POST',
    })

    expect(result.status).toBe(401)
    expect(result.body).toEqual({
      success: false,
      message: 'Authentification requise.',
      errors: [],
    })
  })

  it('POST /profile/cv/:cvId/analyze returns 400 for a bad cvId', async () => {
    const result = await requestJson('/api/v1/profile/cv/not-a-uuid/analyze', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${createToken()}`,
      },
    })

    expect(result.status).toBe(400)
    expect(result.body).toEqual({
      success: false,
      message: 'Identifiant de CV invalide.',
      errors: [],
    })
  })

  it('POST /profile/cv/:cvId/analyze returns 409 from the service', async () => {
    candidateCvServiceMock.analyzeCandidateCv.mockRejectedValueOnce(
      new (await import('../errors/appError.js')).AppError(
        'Une analyse est deja en cours.',
        409,
      ),
    )

    const result = await requestJson('/api/v1/profile/cv/123e4567-e89b-12d3-a456-426614174000/analyze', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${createToken()}`,
      },
    })

    expect(result.status).toBe(409)
    expect(result.body).toEqual({
      success: false,
      message: 'Une analyse est deja en cours.',
      errors: [],
    })
  })

  it('POST /profile/cv/:cvId/analyze returns 200 with null data on success', async () => {
    candidateCvServiceMock.analyzeCandidateCv.mockResolvedValueOnce(undefined)

    const result = await requestJson('/api/v1/profile/cv/123e4567-e89b-12d3-a456-426614174000/analyze', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${createToken()}`,
      },
    })

    expect(result.status).toBe(200)
    expect(result.body).toEqual({
      success: true,
      data: null,
    })
  })

  it('does not rate limit repeated analyze requests', async () => {
    candidateCvServiceMock.analyzeCandidateCv.mockResolvedValue(undefined)

    const headers = {
      Authorization: `Bearer ${createToken()}`,
    }

    const responses = await Promise.all(
      Array.from({ length: 6 }, () =>
        requestJson('/api/v1/profile/cv/123e4567-e89b-12d3-a456-426614174000/analyze', {
          method: 'POST',
          headers,
        }),
      ),
    )

    expect(responses.every((response) => response.status === 200)).toBe(true)
  })
})
