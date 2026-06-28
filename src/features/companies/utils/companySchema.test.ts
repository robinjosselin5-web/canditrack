import test from 'node:test'
import assert from 'node:assert/strict'
import { companySchema } from './companySchema.js'

test('companySchema accepts required fields and optional blanks', () => {
  const result = companySchema.safeParse({
    city: '',
    country: '',
    email: 'test@gmail.com',
    name: 'Google',
    phone: '',
    recruiterName: '',
    website: 'google.com',
  })

  assert.equal(result.success, true)
  if (result.success) {
    assert.equal(result.data.website, 'google.com')
    assert.equal(result.data.email, 'test@gmail.com')
  }
})

test('companySchema rejects missing website with a user-friendly message', () => {
  const result = companySchema.safeParse({
    city: '',
    country: '',
    email: 'test@gmail.com',
    name: 'Google',
    phone: '',
    recruiterName: '',
    website: '',
  })

  assert.equal(result.success, false)
  if (!result.success) {
    assert.equal(result.error.flatten().fieldErrors.website?.[0], 'Le site web est obligatoire.')
  }
})

