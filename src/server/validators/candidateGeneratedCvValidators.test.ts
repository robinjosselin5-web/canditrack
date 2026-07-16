import { describe, expect, it } from 'vitest'
import { createCandidateGeneratedCvBodySchema } from './candidateGeneratedCvValidators.js'

const experienceId = '11111111-1111-4111-8111-111111111111'
const skillId = '22222222-2222-4222-8222-222222222222'
const trainingId = '33333333-3333-4333-8333-333333333333'

describe('createCandidateGeneratedCvBodySchema', () => {
  it('accepts empty selections and trims the title', () => {
    expect(createCandidateGeneratedCvBodySchema.parse({
      title: '  Mon CV  ',
      experienceIds: [],
      skillIds: [],
      trainingIds: [],
    })).toMatchObject({ title: 'Mon CV' })
  })

  it('rejects invalid UUIDs, duplicates, and unknown fields', () => {
    expect(createCandidateGeneratedCvBodySchema.safeParse({
      title: 'CV',
      experienceIds: [experienceId, experienceId],
      skillIds: [skillId],
      trainingIds: [trainingId],
    }).success).toBe(false)

    expect(createCandidateGeneratedCvBodySchema.safeParse({
      title: 'CV',
      experienceIds: ['not-an-uuid'],
      skillIds: [],
      trainingIds: [],
    }).success).toBe(false)

    expect(createCandidateGeneratedCvBodySchema.safeParse({
      title: 'CV',
      experienceIds: [],
      skillIds: [],
      trainingIds: [],
      extra: true,
    }).success).toBe(false)
  })
})
