import { describe, expect, it } from 'vitest'
import { skillSchema } from './skillSchema.js'

describe('skillSchema', () => {
  it('accepts and trims a valid skill', () => {
    expect(skillSchema.parse({ name: ' TypeScript ', category: 'LANGUAGES' })).toEqual({ name: 'TypeScript', category: 'LANGUAGES' })
  })

  it('rejects empty, whitespace-only, oversized names and invalid categories', () => {
    expect(() => skillSchema.parse({ name: '', category: 'LANGUAGES' })).toThrow()
    expect(() => skillSchema.parse({ name: '   ', category: 'LANGUAGES' })).toThrow()
    expect(() => skillSchema.parse({ name: 'x'.repeat(256), category: 'LANGUAGES' })).toThrow()
    expect(() => skillSchema.parse({ name: 'TypeScript', category: 'INVALID' })).toThrow()
  })
})
