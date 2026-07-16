import { describe, expect, it } from 'vitest'
import { resumesQueryKeys } from './resumesQueryKeys.js'

describe('resumesQueryKeys', () => {
  it('provides a stable profile key distinct from CV-scoped data', () => {
    const profileKey = resumesQueryKeys.profileExtractedData()

    expect(profileKey).toEqual(['resumes', 'profile-extracted-data'])
    expect(profileKey).toEqual(resumesQueryKeys.profileExtractedData())
    expect(profileKey.join('/')).not.toContain('cv-1')
  })

  it('provides dedicated generated CV keys', () => {
    expect(resumesQueryKeys.generatedCvs()).toEqual(['resumes', 'generated-cvs'])
    expect(resumesQueryKeys.generatedCv('cv-1')).toEqual(['resumes', 'generated-cvs', 'cv-1'])
    expect(resumesQueryKeys.publicGeneratedCv('public-1')).toEqual([
      'resumes', 'public-generated-cvs', 'public-1',
    ])
  })
})
