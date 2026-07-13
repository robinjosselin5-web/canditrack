import { describe, expect, it } from 'vitest'
import {
  companyCategoryIdSchema,
  companyCitySchema,
  companyCountrySchema,
  companyEmailSchema,
  companyNameSchema,
  companyPhoneSchema,
  companyRecruiterNameSchema,
  companyWebsiteSchema,
} from './companyBaseValidators.js'

describe('companyBaseValidators', () => {
  describe('companyNameSchema', () => {
    it('rejects empty or missing values', () => {
      expect(companyNameSchema.safeParse('').success).toBe(false)
      expect(companyNameSchema.safeParse(undefined).success).toBe(false)
      expect(companyNameSchema.safeParse(null).success).toBe(false)
    })

    it('rejects values longer than 255 characters', () => {
      expect(companyNameSchema.safeParse('A'.repeat(256)).success).toBe(false)
    })

    it('trims surrounding spaces', () => {
      const result = companyNameSchema.safeParse('  ACME  ')

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toBe('ACME')
      }
    })
  })

  describe('companyWebsiteSchema', () => {
    it('rejects empty values', () => {
      const result = companyWebsiteSchema.safeParse('')

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().formErrors[0]).toBe(
          'Le site web est obligatoire.',
        )
      }
    })

    it('rejects invalid url-like values', () => {
      expect(companyWebsiteSchema.safeParse('not-a-website').success).toBe(false)
      expect(companyWebsiteSchema.safeParse('http://').success).toBe(false)
      expect(companyWebsiteSchema.safeParse('example').success).toBe(false)
    })

    it('accepts domains with or without protocol', () => {
      expect(companyWebsiteSchema.safeParse('example.com').success).toBe(true)
      expect(companyWebsiteSchema.safeParse('https://example.com').success).toBe(
        true,
      )
    })

    it('rejects values longer than 255 characters', () => {
      expect(
        companyWebsiteSchema.safeParse(`https://example.com/${'a'.repeat(240)}`)
          .success,
      ).toBe(false)
    })
  })

  describe('companyEmailSchema', () => {
    it('rejects an empty string as missing email', () => {
      const result = companyEmailSchema.safeParse('')

      expect(result.success).toBe(false)
    })

    it('rejects invalid email formats', () => {
      expect(companyEmailSchema.safeParse('not-an-email').success).toBe(false)
      expect(companyEmailSchema.safeParse('user@').success).toBe(false)
      expect(companyEmailSchema.safeParse('user@example').success).toBe(false)
    })

    it('accepts a valid email', () => {
      const result = companyEmailSchema.safeParse('Test@Example.COM')

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toBe('Test@Example.COM')
      }
    })

    it('rejects values longer than 255 characters', () => {
      expect(companyEmailSchema.safeParse(`${'a'.repeat(256)}@ex.com`).success).toBe(false)
    })
  })

  describe('optionalText schemas', () => {
    it.each([
      ['companyPhoneSchema', companyPhoneSchema],
      ['companyCitySchema', companyCitySchema],
      ['companyCountrySchema', companyCountrySchema],
      ['companyRecruiterNameSchema', companyRecruiterNameSchema],
    ] as const)('%s returns undefined for empty values', (_, schema) => {
      expect(schema.safeParse('').success).toBe(true)
      const result = schema.safeParse('   ')

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toBeUndefined()
      }
    })

    it.each([
      ['companyPhoneSchema', companyPhoneSchema, 50],
      ['companyCitySchema', companyCitySchema, 100],
      ['companyCountrySchema', companyCountrySchema, 100],
      ['companyRecruiterNameSchema', companyRecruiterNameSchema, 150],
    ] as const)('%s rejects values above max length', (_, schema, maxLength) => {
      expect(schema.safeParse('A'.repeat(maxLength + 1)).success).toBe(false)
    })

    it.each([
      ['companyPhoneSchema', companyPhoneSchema],
      ['companyCitySchema', companyCitySchema],
      ['companyCountrySchema', companyCountrySchema],
      ['companyRecruiterNameSchema', companyRecruiterNameSchema],
    ] as const)('%s trims valid values', (_, schema) => {
      const result = schema.safeParse('  Valid value  ')

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toBe('Valid value')
      }
    })
  })

  describe('companyCategoryIdSchema', () => {
    it('accepts an absent value', () => {
      expect(companyCategoryIdSchema.safeParse(undefined).success).toBe(true)
    })

    it('rejects a non UUID value', () => {
      const result = companyCategoryIdSchema.safeParse('not-a-uuid')

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().formErrors[0]).toBe(
          'La categorie doit etre un UUID valide.',
        )
      }
    })

    it('accepts a UUID value', () => {
      expect(
        companyCategoryIdSchema.safeParse('123e4567-e89b-12d3-a456-426614174000')
          .success,
      ).toBe(true)
    })
  })
})
