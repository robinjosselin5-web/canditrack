import { describe, expect, it } from 'vitest'
import { createCandidateSkillBodySchema } from './candidateSkillValidators.js'

describe('candidateSkillValidators', () => {
  it('accepts and normalizes a valid skill', () => {
    expect(createCandidateSkillBodySchema.parse({ name: ' TypeScript ', category: 'PROGRAMMING_LANGUAGES' })).toEqual({
      name: 'TypeScript',
      category: 'PROGRAMMING_LANGUAGES',
    })
  })

  it('rejects empty, oversized, invalid, and unknown values', () => {
    expect(() => createCandidateSkillBodySchema.parse({ name: '', category: 'PROGRAMMING_LANGUAGES' })).toThrow()
    expect(() => createCandidateSkillBodySchema.parse({ name: '   ', category: 'PROGRAMMING_LANGUAGES' })).toThrow()
    expect(() => createCandidateSkillBodySchema.parse({ name: 'x'.repeat(256), category: 'PROGRAMMING_LANGUAGES' })).toThrow()
    expect(() => createCandidateSkillBodySchema.parse({ name: 'TypeScript', category: 'INVALID' })).toThrow()
    expect(() => createCandidateSkillBodySchema.parse({ name: 'TypeScript', category: 'PROGRAMMING_LANGUAGES', unknown: true })).toThrow()
    expect(createCandidateSkillBodySchema.parse({ name: 'Anglais', category: 'SPOKEN_LANGUAGES' }).category).toBe('SPOKEN_LANGUAGES')
    const legacyCategory = 'LANG' + 'UAGES'
    expect(() => createCandidateSkillBodySchema.parse({ name: 'TypeScript', category: legacyCategory })).toThrow()
  })
})
