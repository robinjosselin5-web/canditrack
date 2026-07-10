import { describe, expect, it } from 'vitest'
import {
  emailVerificationBodySchema,
  forgotPasswordBodySchema,
  loginBodySchema,
  registerBodySchema,
  resendEmailVerificationBodySchema,
  resetPasswordBodySchema,
} from './authValidators.js'

describe('authValidators', () => {
  describe('registerBodySchema', () => {
    it('accepts a valid payload', () => {
      const result = registerBodySchema.safeParse({
        firstname: ' Jane ',
        lastname: ' Doe ',
        email: 'test@Example.COM',
        password: 'Valid@123',
      })

      expect(result.success).toBe(true)

      if (result.success) {
        expect(result.data.firstname).toBe('Jane')
        expect(result.data.lastname).toBe('Doe')
        expect(result.data.email).toBe('test@example.com')
      }
    })

    it('trims and validates firstname and lastname length', () => {
      expect(
        registerBodySchema.safeParse({
          firstname: ' ',
          lastname: 'Doe',
          email: 'test@example.com',
          password: 'Valid@123',
        }).success,
      ).toBe(false)

      expect(
        registerBodySchema.safeParse({
          firstname: 'A'.repeat(101),
          lastname: 'Doe',
          email: 'test@example.com',
          password: 'Valid@123',
        }).success,
      ).toBe(false)

      expect(
        registerBodySchema.safeParse({
          firstname: 'Jane',
          lastname: ' ',
          email: 'test@example.com',
          password: 'Valid@123',
        }).success,
      ).toBe(false)

      expect(
        registerBodySchema.safeParse({
          firstname: 'Jane',
          lastname: 'B'.repeat(101),
          email: 'test@example.com',
          password: 'Valid@123',
        }).success,
      ).toBe(false)
    })

    it('rejects invalid emails and normalizes valid ones to lowercase', () => {
      expect(
        registerBodySchema.safeParse({
          firstname: 'Jane',
          lastname: 'Doe',
          email: 'not-an-email',
          password: 'Valid@123',
        }).success,
      ).toBe(false)

      const result = registerBodySchema.safeParse({
        firstname: 'Jane',
        lastname: 'Doe',
        email: ' a@b.com ',
        password: 'Valid@123',
      })

      expect(result.success).toBe(true)

      if (result.success) {
        expect(result.data.email).toBe('a@b.com')
      }
    })

    it('rejects a missing or empty password', () => {
      expect(
        registerBodySchema.safeParse({
          firstname: 'Jane',
          lastname: 'Doe',
          email: 'test@example.com',
          password: '',
        }).success,
      ).toBe(false)

      expect(
        registerBodySchema.safeParse({
          firstname: 'Jane',
          lastname: 'Doe',
          email: 'test@example.com',
        }).success,
      ).toBe(false)
    })
  })

  describe('strongPassword rules via registerBodySchema and resetPasswordBodySchema', () => {
    const baseRegisterPayload = {
      firstname: 'Jane',
      lastname: 'Doe',
      email: 'test@example.com',
    }

    it('rejects passwords shorter than 8 characters', () => {
      const result = registerBodySchema.safeParse({
        ...baseRegisterPayload,
        password: 'Aa1@567',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.password).toContain(
          'Le mot de passe doit contenir au moins 8 caracteres.',
        )
      }
    })

    it('rejects passwords without uppercase letters', () => {
      const result = registerBodySchema.safeParse({
        ...baseRegisterPayload,
        password: 'valid@123',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.password).toContain(
          'Le mot de passe doit contenir une majuscule.',
        )
      }
    })

    it('rejects passwords without lowercase letters', () => {
      const result = registerBodySchema.safeParse({
        ...baseRegisterPayload,
        password: 'VALID@123',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.password).toContain(
          'Le mot de passe doit contenir une minuscule.',
        )
      }
    })

    it('rejects passwords without digits', () => {
      const result = registerBodySchema.safeParse({
        ...baseRegisterPayload,
        password: 'Valid@abc',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.password).toContain(
          'Le mot de passe doit contenir un chiffre.',
        )
      }
    })

    it('rejects passwords without special characters', () => {
      const result = registerBodySchema.safeParse({
        ...baseRegisterPayload,
        password: 'Valid1234',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.password).toContain(
          'Le mot de passe doit contenir un caractere special.',
        )
      }
    })

    it('accepts a valid password', () => {
      expect(
        registerBodySchema.safeParse({
          ...baseRegisterPayload,
          password: 'Valid@123',
        }).success,
      ).toBe(true)
    })

    it('applies the same strong password rules on resetPasswordBodySchema', () => {
      const result = resetPasswordBodySchema.safeParse({
        token: 'reset-token',
        password: 'weak',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.password).toContain(
          'Le mot de passe doit contenir au moins 8 caracteres.',
        )
      }
    })
  })

  describe('loginBodySchema', () => {
    it('accepts a valid payload', () => {
      const result = loginBodySchema.safeParse({
        email: 'test@Example.COM',
        password: 'abc',
      })

      expect(result.success).toBe(true)

      if (result.success) {
        expect(result.data.email).toBe('test@example.com')
        expect(result.data.password).toBe('abc')
      }
    })

    it('rejects invalid emails and lowercases valid emails', () => {
      expect(
        loginBodySchema.safeParse({
          email: 'not-an-email',
          password: 'abc',
        }).success,
      ).toBe(false)

      const result = loginBodySchema.safeParse({
        email: ' A@B.COM ',
        password: 'abc',
      })

      expect(result.success).toBe(true)

      if (result.success) {
        expect(result.data.email).toBe('a@b.com')
      }
    })

    it('rejects an empty password', () => {
      expect(
        loginBodySchema.safeParse({
          email: 'test@example.com',
          password: '',
        }).success,
      ).toBe(false)
    })

    it('does not apply password complexity rules on login', () => {
      const result = loginBodySchema.safeParse({
        email: 'test@example.com',
        password: 'abc',
      })

      expect(result.success).toBe(true)
    })
  })

  describe('emailVerificationBodySchema', () => {
    it('accepts a valid payload and uppercases the code', () => {
      const result = emailVerificationBodySchema.safeParse({
        code: 'ab3de',
        email: 'test@Example.COM',
      })

      expect(result.success).toBe(true)

      if (result.success) {
        expect(result.data.code).toBe('AB3DE')
        expect(result.data.email).toBe('test@example.com')
      }
    })

    it('requires exactly 5 characters', () => {
      expect(
        emailVerificationBodySchema.safeParse({
          code: 'ABCD',
          email: 'test@example.com',
        }).success,
      ).toBe(false)

      expect(
        emailVerificationBodySchema.safeParse({
          code: 'ABCDEF',
          email: 'test@example.com',
        }).success,
      ).toBe(false)
    })

    it('rejects non alphanumeric codes', () => {
      expect(
        emailVerificationBodySchema.safeParse({
          code: 'AB@12',
          email: 'test@example.com',
        }).success,
      ).toBe(false)
    })

    it('rejects invalid emails', () => {
      expect(
        emailVerificationBodySchema.safeParse({
          code: 'AB123',
          email: 'not-an-email',
        }).success,
      ).toBe(false)
    })
  })

  describe('resendEmailVerificationBodySchema and forgotPasswordBodySchema', () => {
    it.each([
      ['resendEmailVerificationBodySchema', resendEmailVerificationBodySchema],
      ['forgotPasswordBodySchema', forgotPasswordBodySchema],
    ] as const)('accepts a valid email for %s', (_, schema) => {
      const result = schema.safeParse({
        email: ' A@B.COM ',
      })

      expect(result.success).toBe(true)

      if (result.success) {
        expect(result.data.email).toBe('a@b.com')
      }
    })

    it.each([
      ['resendEmailVerificationBodySchema', resendEmailVerificationBodySchema],
      ['forgotPasswordBodySchema', forgotPasswordBodySchema],
    ] as const)('rejects invalid or empty emails for %s', (_, schema) => {
      expect(
        schema.safeParse({
          email: '',
        }).success,
      ).toBe(false)

      expect(
        schema.safeParse({
          email: 'not-an-email',
        }).success,
      ).toBe(false)
    })
  })

  describe('resetPasswordBodySchema', () => {
    it('rejects an empty token', () => {
      expect(
        resetPasswordBodySchema.safeParse({
          token: '',
          password: 'Valid@123',
        }).success,
      ).toBe(false)
    })

    it('rejects a weak password', () => {
      const result = resetPasswordBodySchema.safeParse({
        token: 'reset-token',
        password: 'weak',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.password).toContain(
          'Le mot de passe doit contenir au moins 8 caracteres.',
        )
      }
    })
  })
})
