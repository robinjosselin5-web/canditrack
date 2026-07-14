import { describe, expect, it } from 'vitest'
import {
  createCandidateTrainingBodySchema,
  updateCandidateTrainingBodySchema,
} from './candidateTrainingValidators.js'

describe('candidateTrainingValidators', () => {
  it('accepts and normalizes a complete creation body', () => {
    expect(createCandidateTrainingBodySchema.parse({
      title: ' Formation web ', organizationName: ' Acme ', degree: null,
      fieldOfStudy: ' Informatique ', startDate: ' 2020-09 ', endDate: null,
      description: ' Cours ', location: ' Paris ', isCertification: true,
      certificationType: ' RNCP ',
    })).toEqual({
      title: 'Formation web', organizationName: 'Acme', degree: null,
      fieldOfStudy: 'Informatique', startDate: '2020-09', endDate: null,
      description: 'Cours', location: 'Paris', isCertification: true,
      certificationType: 'RNCP',
    })
  })

  it('requires a non-empty title and rejects invalid lengths', () => {
    expect(() => createCandidateTrainingBodySchema.parse({})).toThrow()
    expect(() => createCandidateTrainingBodySchema.parse({ title: ' ' })).toThrow()
    expect(() => createCandidateTrainingBodySchema.parse({ title: 'x'.repeat(256) })).toThrow()
    expect(() => createCandidateTrainingBodySchema.parse({ title: 'Formation', location: 'x'.repeat(101) })).toThrow()
  })

  it('validates dates, nullable values, booleans, and strict fields', () => {
    expect(() => createCandidateTrainingBodySchema.parse({ title: 'Formation', startDate: '2024/01' })).toThrow()
    expect(createCandidateTrainingBodySchema.parse({ title: 'Formation', organizationName: '', certificationType: null, isCertification: false })).toMatchObject({ organizationName: null, certificationType: null, isCertification: false })
    expect(() => createCandidateTrainingBodySchema.parse({ title: 'Formation', unknown: true })).toThrow()
  })

  it('accepts partial updates and rejects empty or unknown updates', () => {
    expect(updateCandidateTrainingBodySchema.parse({ title: ' Formation avancee ' })).toEqual({ title: 'Formation avancee' })
    expect(updateCandidateTrainingBodySchema.parse({ degree: '', endDate: null })).toEqual({ degree: null, endDate: null })
    expect(() => updateCandidateTrainingBodySchema.parse({})).toThrow()
    expect(() => updateCandidateTrainingBodySchema.parse({ source: 'AI' })).toThrow()
  })
})
