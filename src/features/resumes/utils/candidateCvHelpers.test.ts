import assert from 'node:assert/strict'
import test from 'node:test'
import {
  formatCvSkillCategory,
  getCandidateCvErrorMessage,
} from './candidateCvHelpers.js'

test('formatCvSkillCategory maps known categories to display labels', () => {
  assert.equal(formatCvSkillCategory('LANGUAGES'), 'Langages')
  assert.equal(formatCvSkillCategory('TOOLS_TECHNOLOGIES'), 'Outils & Technologies')
})

test('getCandidateCvErrorMessage prefers API messages with a fallback', () => {
  assert.equal(
    getCandidateCvErrorMessage({
      response: { data: { message: 'Format de fichier non supporte.' } },
    }),
    'Format de fichier non supporte.',
  )
  assert.equal(
    getCandidateCvErrorMessage(new Error('Network error')),
    "Une erreur est survenue pendant l'import du CV.",
  )
})
