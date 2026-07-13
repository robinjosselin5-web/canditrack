import { describe, expect, it } from 'vitest'
import {
  createCandidateExperienceBodySchema,
  updateCandidateExperienceBodySchema,
} from './candidateExperienceValidators.js'

describe('candidateExperienceValidators', () => {
  it('accepts and normalizes a minimal creation body', () => {
    expect(
      createCandidateExperienceBodySchema.parse({
        jobTitle: '  Developpeur  ',
      }),
    ).toEqual({ jobTitle: 'Developpeur' })
  })

  it('accepts a complete creation body and normalizes optional values', () => {
    expect(
      createCandidateExperienceBodySchema.parse({
        jobTitle: ' Developpeur ',
        companyName: ' Acme ',
        startDate: ' 2024-01 ',
        endDate: null,
        isCurrent: true,
        location: '   ',
        description: ' Produit web ',
      }),
    ).toEqual({
      jobTitle: 'Developpeur',
      companyName: 'Acme',
      startDate: '2024-01',
      endDate: null,
      isCurrent: true,
      location: null,
      description: 'Produit web',
    })
  })

  it('rejects a missing or empty job title', () => {
    expect(() => createCandidateExperienceBodySchema.parse({})).toThrow()
    expect(() => createCandidateExperienceBodySchema.parse({ jobTitle: '  ' })).toThrow()
  })

  it('rejects invalid dates and inconsistent current experiences', () => {
    expect(() =>
      createCandidateExperienceBodySchema.parse({
        jobTitle: 'Developpeur',
        startDate: '2024/01',
      }),
    ).toThrow()
    expect(() =>
      createCandidateExperienceBodySchema.parse({
        jobTitle: 'Developpeur',
        isCurrent: true,
        endDate: '2024',
      }),
    ).toThrow()
  })

  it('accepts a partial update without inventing absent properties', () => {
    const parsed = updateCandidateExperienceBodySchema.parse({
      jobTitle: ' Developpeur senior ',
    })

    expect(parsed).toEqual({ jobTitle: 'Developpeur senior' })
    expect(Object.hasOwn(parsed, 'endDate')).toBe(false)
  })

  it('accepts explicit null values in a partial update', () => {
    expect(
      updateCandidateExperienceBodySchema.parse({
        companyName: '',
        endDate: null,
      }),
    ).toEqual({ companyName: null, endDate: null })
  })

  it('rejects an empty or unknown-field update body', () => {
    expect(() => updateCandidateExperienceBodySchema.parse({})).toThrow()
    expect(() =>
      updateCandidateExperienceBodySchema.parse({
        jobTitle: 'Developpeur',
        source: 'AI',
      }),
    ).toThrow()
    expect(() =>
      createCandidateExperienceBodySchema.parse({
        jobTitle: 'Developpeur',
        candidateProfileId: 'profile-1',
      }),
    ).toThrow()
  })
})
