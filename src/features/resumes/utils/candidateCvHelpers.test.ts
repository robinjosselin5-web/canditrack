import { describe, expect, it } from 'vitest'
import {
  formatCvDate,
  formatCvPeriod,
  formatCvSkillCategory,
  getCandidateCvErrorMessage,
} from './candidateCvHelpers.js'

describe('candidateCvHelpers', () => {
  it('formatCvDate formats an ISO date in fr-FR', () => {
    expect(formatCvDate('2024-01-15')).toBe('15/01/2024')
  })

  it('formatCvPeriod formats a start date only', () => {
    expect(formatCvPeriod('2024-01-15', null)).toBe('15/01/2024')
  })

  it('formatCvPeriod formats a start and end date', () => {
    expect(formatCvPeriod('2024-01-15', '2024-03-20')).toBe(
      '15/01/2024 - 20/03/2024',
    )
  })

  it('formatCvPeriod keeps year and month partial dates readable', () => {
    expect(formatCvPeriod('2024', null)).toBe('2024')
    expect(formatCvPeriod('2024-03', '2024-06')).toBe('Mars 2024 - Juin 2024')
  })

  it('formatCvPeriod handles current experiences and unknown start dates', () => {
    expect(formatCvPeriod('2024-01-15', null, true)).toBe(
      "15/01/2024 - Aujourd'hui",
    )
    expect(formatCvPeriod(null, null)).toBe('Date de debut inconnue')
  })

  it('formatCvSkillCategory maps known categories to display labels', () => {
    expect(formatCvSkillCategory('SPOKEN_LANGUAGES')).toBe('Langues parlées')
    expect(formatCvSkillCategory('PROGRAMMING_LANGUAGES')).toBe('Langages de programmation')
    expect(formatCvSkillCategory('FRAMEWORKS_LIBRARIES')).toBe(
      'Frameworks & Bibliotheques',
    )
    expect(formatCvSkillCategory('TOOLS_TECHNOLOGIES')).toBe(
      'Outils & Technologies',
    )
    expect(formatCvSkillCategory('METHODOLOGIES')).toBe('Methodologies')
    expect(formatCvSkillCategory('SOFT_SKILLS')).toBe('Soft Skills')
    expect(formatCvSkillCategory('UNKNOWN_CATEGORY')).toBe('Autres')
  })

  it('getCandidateCvErrorMessage prefers API messages with a fallback', () => {
    expect(
      getCandidateCvErrorMessage({
        response: { data: { message: 'Format de fichier non supporte.' } },
      }),
    ).toBe('Format de fichier non supporte.')
    expect(getCandidateCvErrorMessage({ isAxiosError: true })).toBe(
      "L'API est indisponible. Vérifiez que le backend est démarré.",
    )
    expect(
      getCandidateCvErrorMessage(
        { response: { data: {} } },
        'Message de secours personnalise.',
      ),
    ).toBe('Message de secours personnalise.')
    expect(
      getCandidateCvErrorMessage(
        { isAxiosError: true, response: { data: { message: 'Erreur API.' } } },
        'Message de secours personnalise.',
      ),
    ).toBe('Erreur API.')
    expect(getCandidateCvErrorMessage(new Error('Network error'))).toBe(
      "Une erreur est survenue pendant l'import du CV.",
    )
  })
})
