import { describe, expect, it } from 'vitest'
import { AppError } from '../errors/appError.js'
import { getAuthenticatedUserId } from './auth.js'

describe('getAuthenticatedUserId', () => {
  it('returns the request user id when present', () => {
    expect(getAuthenticatedUserId({ userId: 'user-1' })).toBe('user-1')
  })

  it('throws an AppError when the request user id is missing', () => {
    expect(() => getAuthenticatedUserId({})).toThrow(AppError)
    expect(() => getAuthenticatedUserId({})).toThrow('Authentification requise.')
  })

  it('throws an AppError when the request user id is undefined', () => {
    expect(() => getAuthenticatedUserId({ userId: undefined })).toThrow(AppError)
    expect(() => getAuthenticatedUserId({ userId: undefined })).toThrow(
      'Authentification requise.',
    )
  })
})
