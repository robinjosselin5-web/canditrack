import assert from 'node:assert/strict'
import test from 'node:test'
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

test('parseCandidateCvAnalysisResponse rejects invalid JSON', () => {
  assert.throws(
    () => parseCandidateCvAnalysisResponse('{invalid json'),
    (error) =>
      error instanceof AppError &&
      error.message === "La réponse IA n'est pas un JSON valide.",
  )
})

test('parseCandidateCvAnalysisResponse rejects empty extracted data', () => {
  assert.throws(
    () =>
      parseCandidateCvAnalysisResponse(
        JSON.stringify({
          experiences: [],
          skills: [],
          trainings: [],
        }),
      ),
    (error) =>
      error instanceof AppError &&
      error.message === "Aucune donnée exploitable n'a pu être extraite du CV.",
  )
})

test('candidateCvAnalysisResponseSchema rejects invalid date formats', () => {
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

    assert.equal(result.success, false)

    if (!result.success) {
      assert.equal(
        result.error.issues.some(
          (issue) =>
            issue.message ===
            'Le format de date doit etre YYYY, YYYY-MM ou YYYY-MM-DD.',
        ),
        true,
      )
    }
  }
})

test('candidateCvAnalysisResponseSchema accepts valid date formats', () => {
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

    assert.equal(result.success, true)
  }
})

test('candidateCvAnalysisResponseSchema rejects empty training dates', () => {
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

  assert.equal(result.success, false)
})

test('candidateCvAnalysisResponseSchema rejects current experience with end date', () => {
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

  assert.equal(result.success, false)

  if (!result.success) {
    assert.equal(
      result.error.flatten().fieldErrors.experiences?.[0],
      'Une experience en cours ne peut pas avoir de date de fin.',
    )
  }
})

test('parseCandidateCvAnalysisResponse accepts valid structured data', () => {
  const parsed = parseCandidateCvAnalysisResponse(
    JSON.stringify({
      experiences: [validExperience],
      skills: [validSkill],
      trainings: [],
    }),
  )

  assert.equal(parsed.experiences.length, 1)
  assert.equal(parsed.skills[0]?.category, 'LANGUAGES')
  assert.equal(parsed.trainings.length, 0)
})

test('parseCandidateCvAnalysisResponse accepts fenced JSON responses', () => {
  const parsed = parseCandidateCvAnalysisResponse(
    '```json\n' +
      JSON.stringify({
        experiences: [validExperience],
        skills: [validSkill],
        trainings: [],
      }) +
      '\n```',
  )

  assert.equal(parsed.experiences.length, 1)
  assert.equal(parsed.skills[0]?.category, 'LANGUAGES')
})
