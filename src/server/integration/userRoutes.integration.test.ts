import http from 'node:http'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import jwt from 'jsonwebtoken'
import type { SignOptions } from 'jsonwebtoken'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { env } from '../config/env.js'

const userServiceMock = vi.hoisted(() => ({
  getUserAvatar: vi.fn(),
  getUserProfile: vi.fn(),
  resolveAvatarPath: vi.fn(),
  updateUserAvatar: vi.fn(),
  updateUserProfile: vi.fn(),
}))

vi.mock('../services/userService.js', () => userServiceMock)

let server: http.Server | undefined
let baseUrl = ''
let avatarFixtureDir = ''
let avatarFixturePath = ''

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

const publicUser = {
  id: 'user-1',
  firstname: 'Ada',
  lastname: 'Lovelace',
  email: 'ada@example.com',
  age: 32,
  phone: '0600000000',
  address: '12 rue des Lilas',
  linkedin: 'https://www.linkedin.com/in/ada',
  github: 'https://github.com/ada',
  hasAvatar: false,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
}

describe('userRoutes integration', () => {
  beforeAll(async () => {
    avatarFixtureDir = await mkdtemp(path.join(os.tmpdir(), 'canditrack-avatar-'))
    avatarFixturePath = path.join(avatarFixtureDir, 'avatar.png')
    await writeFile(avatarFixturePath, Buffer.from([0x89, 0x50, 0x4e, 0x47]))
  })

  afterAll(async () => {
    await rm(avatarFixtureDir, { recursive: true, force: true })
  })

  beforeEach(async () => {
    vi.clearAllMocks()
    if (!server) {
      await startApp()
    }
  })

  afterEach(async () => {
    await stopApp()
  })

  it('GET /users/me returns the profile including the new fields', async () => {
    userServiceMock.getUserProfile.mockResolvedValueOnce(publicUser)

    const result = await requestJson('/api/v1/users/me', {
      headers: { Authorization: `Bearer ${createToken()}` },
    })

    expect(result.status).toBe(200)
    expect(result.body).toEqual({ success: true, data: publicUser })
  })

  it('GET /users/me remains protected', async () => {
    const result = await requestJson('/api/v1/users/me')

    expect(result.status).toBe(401)
  })

  it('PATCH /users/me accepts the new optional fields and forwards them to the service', async () => {
    const payload = {
      firstname: 'Ada',
      lastname: 'Lovelace',
      email: 'ada@example.com',
      age: 32,
      phone: '0600000000',
      address: '12 rue des Lilas',
      linkedin: 'https://www.linkedin.com/in/ada',
      github: 'https://github.com/ada',
    }
    userServiceMock.updateUserProfile.mockResolvedValueOnce({ ...publicUser })

    const result = await requestJson('/api/v1/users/me', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${createToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    expect(result.status).toBe(200)
    expect(userServiceMock.updateUserProfile).toHaveBeenCalledWith('user-1', payload)
  })

  it('PATCH /users/me clears optional fields when they are sent empty', async () => {
    userServiceMock.updateUserProfile.mockResolvedValueOnce({ ...publicUser })

    const result = await requestJson('/api/v1/users/me', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${createToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: 'Ada',
        lastname: 'Lovelace',
        email: 'ada@example.com',
        age: '',
        phone: '',
        address: '',
        linkedin: '',
        github: '',
      }),
    })

    expect(result.status).toBe(200)
    expect(userServiceMock.updateUserProfile).toHaveBeenCalledWith('user-1', {
      firstname: 'Ada',
      lastname: 'Lovelace',
      email: 'ada@example.com',
      age: null,
      phone: null,
      address: null,
      linkedin: null,
      github: null,
    })
  })

  it('PATCH /users/me rejects an age outside the allowed range with a 422', async () => {
    const result = await requestJson('/api/v1/users/me', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${createToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: 'Ada',
        lastname: 'Lovelace',
        email: 'ada@example.com',
        age: 5,
      }),
    })

    expect(result.status).toBe(422)
    expect(userServiceMock.updateUserProfile).not.toHaveBeenCalled()
  })

  it('PATCH /users/me rejects an invalid LinkedIn URL with a 422', async () => {
    const result = await requestJson('/api/v1/users/me', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${createToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: 'Ada',
        lastname: 'Lovelace',
        email: 'ada@example.com',
        linkedin: 'not-a-url',
      }),
    })

    expect(result.status).toBe(422)
    expect(userServiceMock.updateUserProfile).not.toHaveBeenCalled()
  })

  it('POST /users/me/avatar uploads the file and returns the updated user', async () => {
    userServiceMock.updateUserAvatar.mockResolvedValueOnce({ ...publicUser, hasAvatar: true })

    const formData = new FormData()
    formData.append('file', new Blob([Buffer.from([0x89, 0x50, 0x4e, 0x47])], { type: 'image/png' }), 'avatar.png')

    const response = await fetch(`${baseUrl}/api/v1/users/me/avatar`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${createToken()}` },
      body: formData,
    })
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual({ success: true, data: { ...publicUser, hasAvatar: true } })
    expect(userServiceMock.updateUserAvatar).toHaveBeenCalledWith(
      'user-1',
      expect.objectContaining({ originalname: 'avatar.png', mimetype: 'image/png' }),
    )
  })

  it('POST /users/me/avatar remains protected', async () => {
    const formData = new FormData()
    formData.append('file', new Blob([Buffer.from([0x89])], { type: 'image/png' }), 'avatar.png')

    const response = await fetch(`${baseUrl}/api/v1/users/me/avatar`, {
      method: 'POST',
      body: formData,
    })

    expect(response.status).toBe(401)
    expect(userServiceMock.updateUserAvatar).not.toHaveBeenCalled()
  })

  it('GET /users/me/avatar streams the stored file', async () => {
    userServiceMock.getUserAvatar.mockResolvedValueOnce({
      storageKey: 'users/user-1/avatar/avatar.png',
      mimeType: 'image/png',
    })
    userServiceMock.resolveAvatarPath.mockReturnValueOnce(avatarFixturePath)

    const response = await fetch(`${baseUrl}/api/v1/users/me/avatar`, {
      headers: { Authorization: `Bearer ${createToken()}` },
    })

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('image/png')
  })

  it('GET /users/me/avatar returns 404 when there is no avatar', async () => {
    userServiceMock.getUserAvatar.mockRejectedValueOnce(
      new (await import('../errors/appError.js')).AppError('Aucune photo de profil.', 404),
    )

    const result = await requestJson('/api/v1/users/me/avatar', {
      headers: { Authorization: `Bearer ${createToken()}` },
    })

    expect(result.status).toBe(404)
    expect(result.body).toEqual({
      success: false,
      message: 'Aucune photo de profil.',
      errors: [],
    })
  })
})
