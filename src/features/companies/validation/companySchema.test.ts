import { describe, expect, it } from 'vitest'
import { companySchema } from './companySchema.js'

describe('companySchema', () => {
  it('accepts required fields and optional blanks', () => {
    const result = companySchema.safeParse({
      city: '',
      country: '',
      email: 'test@gmail.com',
      name: 'Google',
      phone: '',
      recruiterName: '',
      website: 'google.com',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.website).toBe('google.com')
      expect(result.data.email).toBe('test@gmail.com')
    }
  })

  it('rejects missing website with a user-friendly message', () => {
    const result = companySchema.safeParse({
      city: '',
      country: '',
      email: 'test@gmail.com',
      name: 'Google',
      phone: '',
      recruiterName: '',
      website: '',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.website?.[0]).toBe(
        'Le site web est obligatoire.',
      )
    }
  })
})
