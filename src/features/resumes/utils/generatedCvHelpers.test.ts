import { describe, expect, it } from 'vitest'
import { buildGeneratedCvPublicPath, slugifyCandidateName } from './generatedCvHelpers'

describe('generatedCvHelpers', () => {
  it.each([
    ['Dupont', 'Jean', 'dupont-jean'],
    ['Du Pont', 'Élodie', 'du-pont-elodie'],
    ["O'Connor", 'Anne-Marie', 'o-connor-anne-marie'],
    ['  Van   Damme  ', 'Jean', 'van-damme-jean'],
  ])('slugifies %s', (lastname, firstname, expected) => {
    expect(slugifyCandidateName(lastname, firstname)).toBe(expected)
  })

  it('uses a safe fallback for empty names', () => {
    expect(slugifyCandidateName('', '')).toBe('cv-candidat')
    expect(slugifyCandidateName(null, undefined)).toBe('cv-candidat')
  })

  it('builds a public path without changing the public id', () => {
    expect(buildGeneratedCvPublicPath({
      publicId: '550e8400-e29b-41d4-a716-446655440000',
      firstname: 'Jean',
      lastname: 'Dupont',
    })).toBe('/dupont-jean/550e8400-e29b-41d4-a716-446655440000')
  })
})
