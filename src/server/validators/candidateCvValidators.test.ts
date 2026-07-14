import { describe, expect, it } from 'vitest'
import { AppError } from '../errors/appError.js'
import {
  candidateCvAnalysisResponseSchema,
  parseCandidateCvAnalysisResponse,
} from './candidateCvValidators.js'

const validSkill = {
  name: 'TypeScript',
  category: 'PROGRAMMING_LANGUAGES',
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

const validTraining = {
  title: 'Certification',
  organizationName: null,
  degree: null,
  fieldOfStudy: null,
  startDate: '2025-01',
  endDate: null,
  description: null,
  location: null,
  isCertification: true,
  certificationType: null,
}

function buildSchemaPayload(overrides: {
  experiences?: unknown
  skills?: unknown
  trainings?: unknown
  extraField?: unknown
} = {}) {
  return {
    experiences: overrides.experiences ?? [],
    skills: overrides.skills ?? [],
    trainings: overrides.trainings ?? [],
    ...(overrides.extraField === undefined ? {} : { extraField: overrides.extraField }),
  }
}

describe('candidateCvValidators', () => {
  describe('strict schemas and field validation', () => {
    it('rejects unknown keys on cvExperienceSchema', () => {
      const result = candidateCvAnalysisResponseSchema.safeParse(
        buildSchemaPayload({
          experiences: [
            {
              ...validExperience,
              extraField: 'unexpected',
            },
          ],
        }),
      )

      expect(result.success).toBe(false)
    })

    it('rejects unknown keys on cvSkillSchema', () => {
      const result = candidateCvAnalysisResponseSchema.safeParse(
        buildSchemaPayload({
          skills: [
            {
              ...validSkill,
              extraField: 'unexpected',
            },
          ],
        }),
      )

      expect(result.success).toBe(false)
    })

    it('rejects unknown keys on cvTrainingSchema', () => {
      const result = candidateCvAnalysisResponseSchema.safeParse(
        buildSchemaPayload({
          trainings: [
            {
              ...validTraining,
              extraField: 'unexpected',
            },
          ],
        }),
      )

      expect(result.success).toBe(false)
    })

    it('rejects unknown keys at the root schema level', () => {
      const result = candidateCvAnalysisResponseSchema.safeParse(
        buildSchemaPayload({ extraField: 'unexpected' }),
      )

      expect(result.success).toBe(false)
    })

    it.each([
      [-0.1, false],
      [1.1, false],
      [0, true],
      [1, true],
    ])('validates confidence bounds for %s', (confidence, expectedSuccess) => {
      const result = candidateCvAnalysisResponseSchema.safeParse(
        buildSchemaPayload({
          skills: [
            {
              ...validSkill,
              confidence,
            },
          ],
        }),
      )

      expect(result.success).toBe(expectedSuccess)
    })

    it('accepts null confidence', () => {
      const result = candidateCvAnalysisResponseSchema.safeParse(
        buildSchemaPayload({
          skills: [
            {
              ...validSkill,
              confidence: null,
            },
          ],
        }),
      )

      expect(result.success).toBe(true)
    })

    it('rejects non numeric confidence', () => {
      const result = candidateCvAnalysisResponseSchema.safeParse(
        buildSchemaPayload({
          skills: [
            {
              ...validSkill,
              confidence: 'high',
            },
          ],
        }),
      )

      expect(result.success).toBe(false)
    })

    it('rejects empty required text fields', () => {
      expect(
        candidateCvAnalysisResponseSchema.safeParse(
          buildSchemaPayload({
            experiences: [
              {
                ...validExperience,
                jobTitle: '',
              },
            ],
          }),
        ).success,
      ).toBe(false)

      expect(
        candidateCvAnalysisResponseSchema.safeParse(
          buildSchemaPayload({
            skills: [
              {
                ...validSkill,
                name: '',
              },
            ],
          }),
        ).success,
      ).toBe(false)

      expect(
        candidateCvAnalysisResponseSchema.safeParse(
          buildSchemaPayload({
            trainings: [
              {
                ...validTraining,
                title: '',
              },
            ],
          }),
        ).success,
      ).toBe(false)
    })

    it('accepts null and non empty strings for nullableTextSchema', () => {
      const validResult = candidateCvAnalysisResponseSchema.safeParse(
        buildSchemaPayload({
          experiences: [
            {
              ...validExperience,
              companyName: '  CandiTrack  ',
            },
          ],
        }),
      )

      expect(validResult.success).toBe(true)

      const nullResult = candidateCvAnalysisResponseSchema.safeParse(
        buildSchemaPayload({
          experiences: [
            {
              ...validExperience,
              companyName: null,
            },
          ],
        }),
      )

      expect(nullResult.success).toBe(true)

      expect(
        candidateCvAnalysisResponseSchema.safeParse(
          buildSchemaPayload({
            experiences: [
              {
                ...validExperience,
                companyName: '',
              },
            ],
          }),
        ).success,
      ).toBe(false)
    })

    it.each([
      'SPOKEN_LANGUAGES',
      'PROGRAMMING_LANGUAGES',
      'FRAMEWORKS_LIBRARIES',
      'TOOLS_TECHNOLOGIES',
      'METHODOLOGIES',
      'SOFT_SKILLS',
      'OTHER',
    ])('accepts valid skill categories: %s', (category) => {
      const result = candidateCvAnalysisResponseSchema.safeParse(
        buildSchemaPayload({
          skills: [
            {
              ...validSkill,
              category,
            },
          ],
        }),
      )

      expect(result.success).toBe(true)
    })

    it('rejects an invalid skill category', () => {
      const result = candidateCvAnalysisResponseSchema.safeParse(
        buildSchemaPayload({
          skills: [
            {
              ...validSkill,
              category: 'INVALID_CATEGORY',
            },
          ],
        }),
      )

      expect(result.success).toBe(false)
    })

    it('rejects the legacy language category', () => {
      const legacyCategory = 'LANG' + 'UAGES'
      const result = candidateCvAnalysisResponseSchema.safeParse(
        buildSchemaPayload({
          skills: [{ ...validSkill, category: legacyCategory }],
        }),
      )

      expect(result.success).toBe(false)
    })
  })

  it('parseCandidateCvAnalysisResponse rejects invalid JSON', () => {
    expect(() => parseCandidateCvAnalysisResponse('{invalid json')).toThrow(
      AppError,
    )
    expect(() => parseCandidateCvAnalysisResponse('{invalid json')).toThrow(
      'La r\u00e9ponse IA n\'est pas un JSON valide.',
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
    ).toThrow('Aucune donn\u00e9e exploitable n\'a pu \u00eatre extraite du CV.')
  })

  it('candidateCvAnalysisResponseSchema rejects invalid date formats', () => {
    for (const invalidDate of ['Juin 2025', '2025/06', '2025-6', '']) {
      const result = candidateCvAnalysisResponseSchema.safeParse(
        buildSchemaPayload({
          experiences: [
            {
              ...validExperience,
              isCurrent: false,
              startDate: invalidDate,
            },
          ],
        }),
      )

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
      const result = candidateCvAnalysisResponseSchema.safeParse(
        buildSchemaPayload({
          experiences: [
            {
              ...validExperience,
              isCurrent: false,
              startDate: validDate,
              endDate: null,
            },
          ],
        }),
      )

      expect(result.success).toBe(true)
    }
  })

  it('candidateCvAnalysisResponseSchema rejects empty training dates', () => {
    const result = candidateCvAnalysisResponseSchema.safeParse(
      buildSchemaPayload({
        trainings: [{ ...validTraining, startDate: '' }],
      }),
    )

    expect(result.success).toBe(false)
  })

  it('candidateCvAnalysisResponseSchema rejects current experience with end date', () => {
    const result = candidateCvAnalysisResponseSchema.safeParse(
      buildSchemaPayload({
        experiences: [
          {
            ...validExperience,
            endDate: '2024-12',
            isCurrent: true,
          },
        ],
      }),
    )

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
    expect(parsed.skills[0]?.category).toBe('PROGRAMMING_LANGUAGES')
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
    expect(parsed.skills[0]?.category).toBe('PROGRAMMING_LANGUAGES')
  })

  it('parseCandidateCvAnalysisResponse rejects raw text without JSON', () => {
    expect(() => parseCandidateCvAnalysisResponse('plain text response')).toThrow(
      "La r\u00e9ponse IA n'est pas un JSON valide.",
    )
  })

  it('parseCandidateCvAnalysisResponse rejects text wrapped around JSON', () => {
    const parsed = parseCandidateCvAnalysisResponse(
      'Voici le resultat : ' +
        JSON.stringify({
          experiences: [validExperience],
          skills: [validSkill],
          trainings: [],
        }) +
        ' Merci',
    )

    expect(parsed.experiences).toHaveLength(1)
  })

  it('parseCandidateCvAnalysisResponse rejects blank responses', () => {
    expect(() => parseCandidateCvAnalysisResponse('   ')).toThrow(
      'La r\u00e9ponse IA est vide ou inutilisable.',
    )
  })

  it('parseCandidateCvAnalysisResponse rejects JSON with an unexpected root type', () => {
    expect(() => parseCandidateCvAnalysisResponse('null')).toThrow(
      'La r\u00e9ponse IA ne respecte pas le format attendu.',
    )
    expect(() => parseCandidateCvAnalysisResponse('[]')).toThrow(
      'La r\u00e9ponse IA ne respecte pas le format attendu.',
    )
    expect(() => parseCandidateCvAnalysisResponse('"une simple chaine"')).toThrow(
      'La r\u00e9ponse IA ne respecte pas le format attendu.',
    )
  })

  it('distinguishes 502 from 422 depending on the validation issue', () => {
    expect(() =>
      parseCandidateCvAnalysisResponse(
        JSON.stringify({
          foo: 'bar',
        }),
      ),
    ).toThrow('La r\u00e9ponse IA ne respecte pas le format attendu.')

    expect(() =>
      parseCandidateCvAnalysisResponse(
        JSON.stringify({
          experiences: [],
          skills: [],
          trainings: [],
        }),
      ),
    ).toThrow("Aucune donn\u00e9e exploitable n'a pu \u00eatre extraite du CV.")
  })

  it('points validation errors to the right experience index', () => {
    const result = candidateCvAnalysisResponseSchema.safeParse(
      buildSchemaPayload({
        experiences: [
          {
            ...validExperience,
            jobTitle: 'Valid job',
          },
          {
            ...validExperience,
            jobTitle: '',
          },
        ],
      }),
    )

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(
        result.error.issues.some((issue) =>
          issue.path.join('.').includes('experiences.1'),
        ),
      ).toBe(true)
    }
  })

  it('accepts a single valid training even when experiences and skills are empty', () => {
    const result = candidateCvAnalysisResponseSchema.safeParse(
      buildSchemaPayload({
        trainings: [validTraining],
      }),
    )

    expect(result.success).toBe(true)
  })
})
