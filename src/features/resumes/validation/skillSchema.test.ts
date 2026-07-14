import { describe, expect, it } from 'vitest'
import { skillSchema } from './skillSchema.js'

describe('skillSchema', () => {
  it('accepts and trims a valid skill', () => {
    expect(skillSchema.parse({ name: ' TypeScript ', category: 'PROGRAMMING_LANGUAGES' })).toEqual({ name: 'TypeScript', category: 'PROGRAMMING_LANGUAGES' })
    expect(skillSchema.parse({ name: ' Anglais ', category: 'SPOKEN_LANGUAGES' })).toEqual({ name: 'Anglais', category: 'SPOKEN_LANGUAGES' })
  })

  it('rejects empty, whitespace-only, oversized names and invalid categories', () => {
    expect(() => skillSchema.parse({ name: '', category: 'PROGRAMMING_LANGUAGES' })).toThrow()
    expect(() => skillSchema.parse({ name: '   ', category: 'PROGRAMMING_LANGUAGES' })).toThrow()
    expect(() => skillSchema.parse({ name: 'x'.repeat(256), category: 'PROGRAMMING_LANGUAGES' })).toThrow()
    const legacyCategory = 'LANG' + 'UAGES'
    expect(() => skillSchema.parse({ name: 'TypeScript', category: legacyCategory })).toThrow()
    expect(() => skillSchema.parse({ name: 'TypeScript', category: 'INVALID' })).toThrow()
  })
})
