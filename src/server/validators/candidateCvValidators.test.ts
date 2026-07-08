import { describe, expect, it } from 'vitest'
import { AppError } from '../errors/appError.js'
import {
  candidateCvAnalysisResponseSchema,
  parseCandidateCvAnalysisResponse,
} from './candidateCvValidators.js'

const validSkill = {
  name: 'TypeScript',
  category: 'LANGUAGES',
  confidence: 0.98,
  source: 'Developpement TypeScript',
}

const validExperience = {
  jobTitle: 'Developpeur full-stack',
  companyName: 'CandiTrack',
  startDate: '2025-06',
  endDate: null,
  isCurrent: true,
  location: null,
  description: null,
}

describe('candidateCvValidators', () => {
  it('parseCandidateCvAnalysisResponse rejects invalid JSON', () => {
    expect(() => parseCandidateCvAnalysisResponse('{invalid json')).toThrow(
      AppError,
    )
    expect(() => parseCandidateCvAnalysisResponse('{invalid json')).toThrow(
      "La réponse IA n'est pas un JSON valide.",
    )
  })

  it('parseCandidateCvAnalysisResponse rejects empty extracted data', () => {
    expect(() =>
      parseCandidateCvAnalysisResponse(
        JSON.stringify({
          experiences: [],
          skills: [],
          trainings: [],
        }),
      ),
    ).toThrow("Aucune donnée exploitable n'a pu être extraite du CV.")
  })

  it('candidateCvAnalysisResponseSchema rejects invalid date formats', () => {
    for (const invalidDate of ['Juin 2025', '2025/06', '2025-6', '']) {
      const result = candidateCvAnalysisResponseSchema.safeParse({
        experiences: [
          {
            ...validExperience,
            isCurrent: false,
            startDate: invalidDate,
          },
        ],
        skills: [],
        trainings: [],
      })

      expect(result.success).toBe(false)

      if (!result.success) {
        expect(
          result.error.issues.some(
            (issue) =>
              issue.message ===
              'Le format de date doit etre YYYY, YYYY-MM ou YYYY-MM-DD.',
          ),
        ).toBe(true)
      }
    }
  })

  it('candidateCvAnalysisResponseSchema accepts valid date formats', () => {
    for (const validDate of ['2025', '2025-06', '2025-06-30']) {
      const result = candidateCvAnalysisResponseSchema.safeParse({
        experiences: [
          {
            ...validExperience,
            isCurrent: false,
            startDate: validDate,
            endDate: null,
          },
        ],
        skills: [],
        trainings: [],
      })

      expect(result.success).toBe(true)
    }
  })

  it('candidateCvAnalysisResponseSchema rejects empty training dates', () => {
    const result = candidateCvAnalysisResponseSchema.safeParse({
      experiences: [],
      skills: [],
      trainings: [
        {
          title: 'Certification',
          organizationName: null,
          degree: null,
          fieldOfStudy: null,
          startDate: '',
          endDate: null,
          description: null,
          location: null,
          isCertification: true,
          certificationType: null,
        },
      ],
    })

    expect(result.success).toBe(false)
  })

  it('candidateCvAnalysisResponseSchema rejects current experience with end date', () => {
    const result = candidateCvAnalysisResponseSchema.safeParse({
      experiences: [
        {
          ...validExperience,
          endDate: '2024-12',
          isCurrent: true,
        },
      ],
      skills: [],
      trainings: [],
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.experiences?.[0]).toBe(
        'Une experience en cours ne peut pas avoir de date de fin.',
      )
    }
  })

  it('parseCandidateCvAnalysisResponse accepts valid structured data', () => {
    const parsed = parseCandidateCvAnalysisResponse(
      JSON.stringify({
        experiences: [validExperience],
        skills: [validSkill],
        trainings: [],
      }),
    )

    expect(parsed.experiences).toHaveLength(1)
    expect(parsed.skills[0]?.category).toBe('LANGUAGES')
    expect(parsed.trainings).toHaveLength(0)
  })

  it('parseCandidateCvAnalysisResponse accepts fenced JSON responses', () => {
    const parsed = parseCandidateCvAnalysisResponse(
      '```json\n' +
        JSON.stringify({
          experiences: [validExperience],
          skills: [validSkill],
          trainings: [],
        }) +
        '\n```',
    )

    expect(parsed.experiences).toHaveLength(1)
    expect(parsed.skills[0]?.category).toBe('LANGUAGES')
  })
})
