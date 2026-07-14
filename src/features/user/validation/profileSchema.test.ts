import { describe, expect, it } from 'vitest'
import { profileSchema } from './profileSchema'

const validValues = {
  firstname: 'Ada',
  lastname: 'Lovelace',
  email: 'ada@example.com',
  age: '32',
  phone: '0600000000',
  address: '12 rue des Lilas',
  linkedin: 'https://www.linkedin.com/in/ada',
  github: 'https://github.com/ada',
}

describe('profileSchema', () => {
  it('accepts a fully filled valid form and coerces age to a number', () => {
    const result = profileSchema.safeParse(validValues)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.age).toBe(32)
    }
  })

  it('converts empty optional fields to null', () => {
    const result = profileSchema.safeParse({
      ...validValues,
      age: '',
      phone: '',
      address: '',
      linkedin: '',
      github: '',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toMatchObject({
        age: null,
        phone: null,
        address: null,
        linkedin: null,
        github: null,
      })
    }
  })

  it('rejects an age below 16', () => {
    const result = profileSchema.safeParse({ ...validValues, age: '15' })

    expect(result.success).toBe(false)
  })

  it('rejects an age above 120', () => {
    const result = profileSchema.safeParse({ ...validValues, age: '121' })

    expect(result.success).toBe(false)
  })

  it('rejects a non-integer age', () => {
    const result = profileSchema.safeParse({ ...validValues, age: '32.5' })

    expect(result.success).toBe(false)
  })

  it('rejects an invalid LinkedIn URL', () => {
    const result = profileSchema.safeParse({ ...validValues, linkedin: 'not-a-url' })

    expect(result.success).toBe(false)
  })

  it('rejects an invalid GitHub URL', () => {
    const result = profileSchema.safeParse({ ...validValues, github: 'not-a-url' })

    expect(result.success).toBe(false)
  })

  it('requires firstname, lastname and a valid email', () => {
    expect(profileSchema.safeParse({ ...validValues, firstname: '' }).success).toBe(false)
    expect(profileSchema.safeParse({ ...validValues, lastname: '' }).success).toBe(false)
    expect(profileSchema.safeParse({ ...validValues, email: 'not-an-email' }).success).toBe(false)
  })
})
