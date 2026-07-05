import assert from 'node:assert/strict'
import test from 'node:test'
import { normalizeWebsiteUrl } from './normalizeWebsiteUrl.js'

test('normalizeWebsiteUrl prefixes domains without protocol', () => {
  assert.equal(normalizeWebsiteUrl('example.com'), 'https://example.com')
})

test('normalizeWebsiteUrl preserves existing protocols and blank values', () => {
  assert.equal(normalizeWebsiteUrl('http://example.com'), 'http://example.com')
  assert.equal(normalizeWebsiteUrl('https://example.com'), 'https://example.com')
  assert.equal(normalizeWebsiteUrl(''), '')
  assert.equal(normalizeWebsiteUrl(null), null)
  assert.equal(normalizeWebsiteUrl(undefined), undefined)
})
