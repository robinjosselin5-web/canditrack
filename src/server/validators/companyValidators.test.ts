import { describe, expect, it } from 'vitest'
import { createCompanyBodySchema } from './companyValidators.js'
import { updateCompanyBodySchema } from './companyUpdateValidators.js'
import { updateCompanyFavoriteBodySchema } from './companyValidators.js'

const validCompanyPayload = {
  name: 'ACME',
  website: 'https://example.com',
  email: 'contact@example.com',
  phone: '0123456789',
  city: 'Paris',
  country: 'France',
  categoryId: '123e4567-e89b-12d3-a456-426614174000',
  recruiterName: 'Jane Doe',
}

describe('companyValidators', () => {
  it.each([
    ['createCompanyBodySchema', createCompanyBodySchema],
    ['updateCompanyBodySchema', updateCompanyBodySchema],
  ] as const)('%s accepts a complete valid payload', (_, schema) => {
    const result = schema.safeParse(validCompanyPayload)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('ACME')
      expect(result.data.website).toBe('https://example.com')
    }
  })

  it.each([
    ['createCompanyBodySchema', createCompanyBodySchema],
    ['updateCompanyBodySchema', updateCompanyBodySchema],
  ] as const)('%s rejects missing required fields', (_, schema) => {
    expect(
      schema.safeParse({
        ...validCompanyPayload,
        name: undefined,
      }).success,
    ).toBe(false)

    expect(
      schema.safeParse({
        ...validCompanyPayload,
        website: undefined,
      }).success,
    ).toBe(false)
  })

  it.each([
    ['createCompanyBodySchema', createCompanyBodySchema],
    ['updateCompanyBodySchema', updateCompanyBodySchema],
  ] as const)('%s accepts a minimal payload with required fields', (_, schema) => {
    const result = schema.safeParse({
      name: 'ACME',
      website: 'example.com',
      email: 'contact@example.com',
    })

    expect(result.success).toBe(true)
  })

  it('updateCompanyFavoriteBodySchema accepts booleans', () => {
    expect(
      updateCompanyFavoriteBodySchema.safeParse({ isFavorite: true }).success,
    ).toBe(true)
    expect(
      updateCompanyFavoriteBodySchema.safeParse({ isFavorite: false }).success,
    ).toBe(true)
  })

  it('updateCompanyFavoriteBodySchema rejects non booleans', () => {
    expect(
      updateCompanyFavoriteBodySchema.safeParse({ isFavorite: 'true' }).success,
    ).toBe(false)
    expect(
      updateCompanyFavoriteBodySchema.safeParse({ isFavorite: 1 }).success,
    ).toBe(false)
    expect(updateCompanyFavoriteBodySchema.safeParse({}).success).toBe(false)
  })
})
