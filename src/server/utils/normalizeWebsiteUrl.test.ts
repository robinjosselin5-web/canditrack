import { describe, expect, it } from 'vitest'
import { normalizeWebsiteUrl } from './normalizeWebsiteUrl.js'

describe('normalizeWebsiteUrl', () => {
  it('prefixes domains without protocol', () => {
    expect(normalizeWebsiteUrl('example.com')).toBe('https://example.com')
  })

  it('preserves existing protocols and blank values', () => {
    expect(normalizeWebsiteUrl('http://example.com')).toBe('http://example.com')
    expect(normalizeWebsiteUrl('https://example.com')).toBe(
      'https://example.com',
    )
    expect(normalizeWebsiteUrl('')).toBe('')
    expect(normalizeWebsiteUrl(null)).toBe(null)
    expect(normalizeWebsiteUrl(undefined)).toBe(undefined)
  })
})
