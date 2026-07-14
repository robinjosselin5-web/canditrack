import { describe, expect, it } from 'vitest'
import { createCandidateSkillBodySchema } from './candidateSkillValidators.js'

describe('candidateSkillValidators', () => {
  it('accepts and normalizes a valid skill', () => {
    expect(createCandidateSkillBodySchema.parse({ name: ' TypeScript ', category: 'LANGUAGES' })).toEqual({
      name: 'TypeScript',
      category: 'LANGUAGES',
    })
  })

  it('rejects empty, oversized, invalid, and unknown values', () => {
    expect(() => createCandidateSkillBodySchema.parse({ name: '', category: 'LANGUAGES' })).toThrow()
    expect(() => createCandidateSkillBodySchema.parse({ name: '   ', category: 'LANGUAGES' })).toThrow()
    expect(() => createCandidateSkillBodySchema.parse({ name: 'x'.repeat(256), category: 'LANGUAGES' })).toThrow()
    expect(() => createCandidateSkillBodySchema.parse({ name: 'TypeScript', category: 'INVALID' })).toThrow()
    expect(() => createCandidateSkillBodySchema.parse({ name: 'TypeScript', category: 'LANGUAGES', unknown: true })).toThrow()
  })
})
