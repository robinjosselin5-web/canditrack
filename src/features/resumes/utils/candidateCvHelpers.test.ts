import assert from 'node:assert/strict'
import test from 'node:test'
import {
  formatCvDate,
  formatCvPeriod,
  formatCvSkillCategory,
  getCandidateCvErrorMessage,
} from './candidateCvHelpers.js'

test('formatCvDate formats an ISO date in fr-FR', () => {
  assert.equal(formatCvDate('2024-01-15'), '15/01/2024')
})

test('formatCvPeriod formats a start date only', () => {
  assert.equal(formatCvPeriod('2024-01-15', null), '15/01/2024')
})

test('formatCvPeriod formats a start and end date', () => {
  assert.equal(formatCvPeriod('2024-01-15', '2024-03-20'), '15/01/2024 - 20/03/2024')
})

test('formatCvPeriod keeps year and month partial dates readable', () => {
  assert.equal(formatCvPeriod('2024', null), '2024')
  assert.equal(formatCvPeriod('2024-03', '2024-06'), 'Mars 2024 - Juin 2024')
})

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
    getCandidateCvErrorMessage({ response: undefined }),
    "L'API est indisponible. Verifiez que le backend est demarre.",
  )
  assert.equal(
    getCandidateCvErrorMessage(new Error('Network error')),
    "Une erreur est survenue pendant l'import du CV.",
  )
})
