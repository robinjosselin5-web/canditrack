import { beforeEach, describe, expect, it, vi } from 'vitest'

const repositoryMock = vi.hoisted(() => ({
  createGeneratedCvSnapshot: vi.fn(),
  findExperiencesForProfile: vi.fn(),
  findGeneratedCvByIdForOwner: vi.fn(),
  findGeneratedCvByPublicId: vi.fn(),
  findGeneratedCvsForProfile: vi.fn(),
  findSkillsForProfile: vi.fn(),
  findTrainingsForProfile: vi.fn(),
  findUserPersonalDataForGeneratedCv: vi.fn(),
}))

vi.mock('../repositories/candidateGeneratedCvRepository.js', () => repositoryMock)

const sourceExperience = {
  id: 'experience-1', jobTitle: 'Développeur', companyName: 'Acme', startDate: '2020',
  endDate: null, isCurrent: true, location: null, description: 'Produit web', candidateProfileId: 'profile-1',
}
const sourceLanguage = { id: 'skill-1', name: 'Anglais', category: 'SPOKEN_LANGUAGES' as const, candidateProfileId: 'profile-1' }
const sourceSkill = { id: 'skill-2', name: 'TypeScript', category: 'PROGRAMMING_LANGUAGES' as const, candidateProfileId: 'profile-1' }
const sourceTraining = { id: 'training-1', title: 'Master', organizationName: 'Université', degree: null, fieldOfStudy: null, startDate: null, endDate: null, description: null, location: null, isCertification: false, certificationType: null, candidateProfileId: 'profile-1' }

describe('candidateGeneratedCvService', () => {
  beforeEach(() => vi.clearAllMocks())

  it('copies personal data and separates spoken languages from skills', async () => {
    repositoryMock.findUserPersonalDataForGeneratedCv.mockResolvedValue({
      firstname: 'Jean', lastname: 'Dupont', email: 'jean@example.test', age: 30, phone: null, address: null,
      linkedin: null, github: null, avatarStorageKey: 'avatars/jean.jpg', avatarMimeType: 'image/jpeg',
      candidateProfile: { id: 'profile-1' },
    })
    repositoryMock.findExperiencesForProfile.mockResolvedValue([sourceExperience])
    repositoryMock.findSkillsForProfile.mockResolvedValue([sourceLanguage, sourceSkill])
    repositoryMock.findTrainingsForProfile.mockResolvedValue([sourceTraining])
    repositoryMock.createGeneratedCvSnapshot.mockImplementation(async (data, experiences, skills, languages, trainings) => ({
      id: 'generated-1', publicId: 'public-1', candidateProfileId: 'profile-1', title: data.title, visibility: 'LINK_ONLY',
      ...data, createdAt: new Date('2026-01-01'), updatedAt: new Date('2026-01-01'), experiences, skills, languages, trainings,
    }))
    const { createGeneratedCvForUser } = await import('./candidateGeneratedCvService.js')

    const result = await createGeneratedCvForUser('user-1', {
      title: 'Mon CV', experienceIds: ['experience-1'], skillIds: ['skill-1', 'skill-2'], trainingIds: ['training-1'],
    })

    expect(repositoryMock.createGeneratedCvSnapshot).toHaveBeenCalledWith(
      expect.objectContaining({ firstname: 'Jean', lastname: 'Dupont', avatarStorageKey: 'avatars/jean.jpg' }),
      expect.arrayContaining([expect.objectContaining({ sourceExperienceId: 'experience-1', position: 0 })]),
      [expect.objectContaining({ sourceSkillId: 'skill-2', name: 'TypeScript', position: 0 })],
      [expect.objectContaining({ sourceSkillId: 'skill-1', name: 'Anglais', position: 0 })],
      [expect.objectContaining({ sourceTrainingId: 'training-1', position: 0 })],
    )
    expect(result.firstname).toBe('Jean')
  })

  it('rejects a source belonging to another profile without creating a snapshot', async () => {
    repositoryMock.findUserPersonalDataForGeneratedCv.mockResolvedValue({ candidateProfile: { id: 'profile-1' } })
    repositoryMock.findExperiencesForProfile.mockResolvedValue([])
    repositoryMock.findSkillsForProfile.mockResolvedValue([])
    repositoryMock.findTrainingsForProfile.mockResolvedValue([])
    const { createGeneratedCvForUser } = await import('./candidateGeneratedCvService.js')

    await expect(createGeneratedCvForUser('user-1', {
      title: 'CV', experienceIds: ['11111111-1111-4111-8111-111111111111'], skillIds: [], trainingIds: [],
    })).rejects.toMatchObject({ statusCode: 404 })
    expect(repositoryMock.createGeneratedCvSnapshot).not.toHaveBeenCalled()
  })

  it('maps public data without internal identifiers or storage paths', async () => {
    repositoryMock.findGeneratedCvByPublicId.mockResolvedValue({
      id: 'generated-1', publicId: 'public-1', candidateProfileId: 'profile-1', title: 'CV', visibility: 'LINK_ONLY',
      firstname: 'Élodie', lastname: 'Dûrand', email: 'elodie@example.test', phone: null, address: null, age: null,
      linkedin: null, github: null, avatarStorageKey: 'private/path.jpg', avatarMimeType: 'image/jpeg',
      createdAt: new Date('2026-01-01'), updatedAt: new Date('2026-01-01'), experiences: [], skills: [], trainings: [], languages: [],
    })
    const { getPublicGeneratedCv, slugifyCandidateName } = await import('./candidateGeneratedCvService.js')

    const result = await getPublicGeneratedCv('public-1')
    expect(result).not.toHaveProperty('avatarStorageKey')
    expect(result).not.toHaveProperty('candidateProfileId')
    expect(result.slug).toBe('durand-elodie')
    expect(slugifyCandidateName('O\'Neil', 'Jean  Paul')).toBe('o-neil-jean-paul')
  })
})
