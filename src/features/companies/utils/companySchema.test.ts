import { describe, expect, it } from 'vitest'
import { companySchema } from './companySchema.js'

describe('companySchema', () => {
  it('accepts required fields and normalizes surrounding spaces', () => {
    const result = companySchema.safeParse({
      email: ' test@gmail.com ',
      name: ' Google ',
      website: ' google.com ',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual({
        email: 'test@gmail.com',
        name: 'Google',
        website: 'google.com',
      })
    }
  })

  it('accepts blank optional fields and converts them to undefined', () => {
    const result = companySchema.safeParse({
      city: '  ',
      country: '',
      email: 'test@gmail.com',
      name: 'Google',
      phone: '',
      recruiterName: undefined,
      website: 'google.com',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.city).toBeUndefined()
      expect(result.data.country).toBeUndefined()
      expect(result.data.phone).toBeUndefined()
      expect(result.data.recruiterName).toBeUndefined()
    }
  })

  it('rejects a name made only of spaces', () => {
    const result = companySchema.safeParse({
      email: 'test@gmail.com',
      name: '   ',
      website: 'google.com',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name?.[0]).toBe(
        "Le nom de l'entreprise est obligatoire.",
      )
    }
  })

  it('rejects invalid website and email values', () => {
    const websiteResult = companySchema.safeParse({
      email: 'test@gmail.com',
      name: 'Google',
      website: 'not a website',
    })
    const emailResult = companySchema.safeParse({
      email: 'not-an-email',
      name: 'Google',
      website: 'google.com',
    })

    expect(websiteResult.success).toBe(false)
    expect(emailResult.success).toBe(false)
    if (!websiteResult.success) {
      expect(websiteResult.error.flatten().fieldErrors.website?.[0]).toBe(
        'Le site web doit etre une URL valide.',
      )
    }
    if (!emailResult.success) {
      expect(emailResult.error.flatten().fieldErrors.email?.[0]).toBe(
        "L'adresse e-mail doit etre valide.",
      )
    }
  })

  it('rejects optional text values over their configured limits', () => {
    const result = companySchema.safeParse({
      email: 'test@gmail.com',
      name: 'Google',
      phone: '1'.repeat(51),
      website: 'google.com',
    })

    expect(result.success).toBe(false)
  })
})
