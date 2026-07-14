import { beforeEach, describe, expect, it, vi } from 'vitest'

const candidateCvRepositoryMock = vi.hoisted(() => ({
  createCandidateProfile: vi.fn(),
  findCandidateProfileByUserId: vi.fn(),
}))

const candidateProfileDataRepositoryMock = vi.hoisted(() => ({
  createCandidateExperience: vi.fn(),
  createCandidateSkill: vi.fn(),
  deleteCandidateSkillByIdForProfile: vi.fn(),
  deleteCandidateExperienceByIdForProfile: vi.fn(),
  findCandidateExperienceByIdForProfile: vi.fn(),
  updateCandidateExperienceByIdForProfile: vi.fn(),
  createCandidateTraining: vi.fn(),
  deleteCandidateTrainingByIdForProfile: vi.fn(),
  findCandidateTrainingByIdForProfile: vi.fn(),
  updateCandidateTrainingByIdForProfile: vi.fn(),
}))

vi.mock('../repositories/candidateCvRepository.js', () => candidateCvRepositoryMock)
vi.mock('../repositories/candidateProfileDataRepository.js', () => candidateProfileDataRepositoryMock)

describe('candidateProfileDataService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates a manual experience and creates the profile when absent', async () => {
    candidateCvRepositoryMock.findCandidateProfileByUserId.mockResolvedValueOnce(null)
    candidateCvRepositoryMock.createCandidateProfile.mockResolvedValueOnce({ id: 'profile-1' })
    candidateProfileDataRepositoryMock.createCandidateExperience.mockResolvedValueOnce({
      id: 'experience-1',
      source: 'MANUAL',
    })
    const { createExperienceForUser } = await import('./candidateProfileDataService.js')

    await expect(
      createExperienceForUser('user-1', { jobTitle: 'Developpeur' }),
    ).resolves.toMatchObject({ source: 'MANUAL' })

    expect(candidateCvRepositoryMock.createCandidateProfile).toHaveBeenCalledWith('user-1')
    expect(candidateProfileDataRepositoryMock.createCandidateExperience).toHaveBeenCalledWith(
      'profile-1',
      { jobTitle: 'Developpeur' },
    )
  })

  it('turns an AI experience manual while preserving its CV provenance', async () => {
    candidateCvRepositoryMock.findCandidateProfileByUserId.mockResolvedValueOnce({ id: 'profile-1' })
    candidateProfileDataRepositoryMock.findCandidateExperienceByIdForProfile.mockResolvedValueOnce({
      id: 'experience-1',
      candidateCvId: 'cv-1',
      source: 'AI',
      isCurrent: false,
      endDate: '2023',
    })
    candidateProfileDataRepositoryMock.updateCandidateExperienceByIdForProfile.mockResolvedValueOnce({
      id: 'experience-1',
      source: 'MANUAL',
      candidateCvId: 'cv-1',
    })
    const { updateExperienceForUser } = await import('./candidateProfileDataService.js')

    await expect(
      updateExperienceForUser('user-1', 'experience-1', { jobTitle: 'Senior developpeur' }),
    ).resolves.toMatchObject({ source: 'MANUAL', candidateCvId: 'cv-1' })

    expect(candidateProfileDataRepositoryMock.updateCandidateExperienceByIdForProfile).toHaveBeenCalledWith(
      'experience-1',
      'profile-1',
      { jobTitle: 'Senior developpeur', source: 'MANUAL' },
    )
  })

  it('forces the end date to null when a partial update marks the experience current', async () => {
    candidateCvRepositoryMock.findCandidateProfileByUserId.mockResolvedValueOnce({ id: 'profile-1' })
    candidateProfileDataRepositoryMock.findCandidateExperienceByIdForProfile.mockResolvedValueOnce({
      id: 'experience-1',
      isCurrent: false,
      endDate: '2023',
    })
    candidateProfileDataRepositoryMock.updateCandidateExperienceByIdForProfile.mockResolvedValueOnce({
      id: 'experience-1',
    })
    const { updateExperienceForUser } = await import('./candidateProfileDataService.js')

    await updateExperienceForUser('user-1', 'experience-1', { isCurrent: true })

    expect(candidateProfileDataRepositoryMock.updateCandidateExperienceByIdForProfile).toHaveBeenCalledWith(
      'experience-1',
      'profile-1',
      { isCurrent: true, endDate: null, source: 'MANUAL' },
    )
  })

  it('sets isCurrent to false when a partial update provides an end date', async () => {
    candidateCvRepositoryMock.findCandidateProfileByUserId.mockResolvedValueOnce({ id: 'profile-1' })
    candidateProfileDataRepositoryMock.findCandidateExperienceByIdForProfile.mockResolvedValueOnce({
      id: 'experience-1',
      isCurrent: true,
      endDate: null,
    })
    candidateProfileDataRepositoryMock.updateCandidateExperienceByIdForProfile.mockResolvedValueOnce({
      id: 'experience-1',
    })
    const { updateExperienceForUser } = await import('./candidateProfileDataService.js')

    await updateExperienceForUser('user-1', 'experience-1', { endDate: '2024' })

    expect(candidateProfileDataRepositoryMock.updateCandidateExperienceByIdForProfile).toHaveBeenCalledWith(
      'experience-1',
      'profile-1',
      { endDate: '2024', isCurrent: false, source: 'MANUAL' },
    )
  })

  it('returns 404 for an experience outside the authenticated profile', async () => {
    candidateCvRepositoryMock.findCandidateProfileByUserId.mockResolvedValueOnce({ id: 'profile-1' })
    candidateProfileDataRepositoryMock.findCandidateExperienceByIdForProfile.mockResolvedValueOnce(null)
    const { updateExperienceForUser } = await import('./candidateProfileDataService.js')

    await expect(
      updateExperienceForUser('user-1', 'experience-1', { jobTitle: 'Autre' }),
    ).rejects.toMatchObject({ statusCode: 404 })
  })

  it('deletes a scoped experience and returns 404 when it does not exist', async () => {
    candidateCvRepositoryMock.findCandidateProfileByUserId.mockResolvedValue({ id: 'profile-1' })
    candidateProfileDataRepositoryMock.deleteCandidateExperienceByIdForProfile
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false)
    const { deleteExperienceForUser } = await import('./candidateProfileDataService.js')

    await expect(deleteExperienceForUser('user-1', 'experience-1')).resolves.toBe(true)
    await expect(deleteExperienceForUser('user-1', 'experience-2')).resolves.toBe(false)
  })

  it('creates a training and creates the profile when absent', async () => {
    candidateCvRepositoryMock.findCandidateProfileByUserId.mockResolvedValueOnce(null)
    candidateCvRepositoryMock.createCandidateProfile.mockResolvedValueOnce({ id: 'profile-1' })
    candidateProfileDataRepositoryMock.createCandidateTraining.mockResolvedValueOnce({ id: 'training-1' })
    const { createTrainingForUser } = await import('./candidateProfileDataService.js')
    const data = { title: 'Formation web', isCertification: true }
    await expect(createTrainingForUser('user-1', data)).resolves.toEqual({ id: 'training-1' })
    expect(candidateProfileDataRepositoryMock.createCandidateTraining).toHaveBeenCalledWith('profile-1', data)
  })

  it('updates and deletes only a training owned by the profile', async () => {
    candidateCvRepositoryMock.findCandidateProfileByUserId.mockResolvedValue({ id: 'profile-1' })
    candidateProfileDataRepositoryMock.findCandidateTrainingByIdForProfile.mockResolvedValueOnce({ id: 'training-1' })
    candidateProfileDataRepositoryMock.updateCandidateTrainingByIdForProfile.mockResolvedValueOnce({ id: 'training-1', title: 'Master' })
    candidateProfileDataRepositoryMock.deleteCandidateTrainingByIdForProfile.mockResolvedValueOnce(true)
    const { updateTrainingForUser, deleteTrainingForUser } = await import('./candidateProfileDataService.js')
    await expect(updateTrainingForUser('user-1', 'training-1', { title: 'Master' })).resolves.toEqual({ id: 'training-1', title: 'Master' })
    await expect(deleteTrainingForUser('user-1', 'training-1')).resolves.toBe(true)
    expect(candidateProfileDataRepositoryMock.updateCandidateTrainingByIdForProfile).toHaveBeenCalledWith('training-1', 'profile-1', { title: 'Master', source: 'MANUAL' })
    expect(candidateProfileDataRepositoryMock.deleteCandidateTrainingByIdForProfile).toHaveBeenCalledWith('training-1', 'profile-1')
  })

  it('returns 404 when the profile or training is missing', async () => {
    candidateCvRepositoryMock.findCandidateProfileByUserId.mockResolvedValueOnce(null)
    const service = await import('./candidateProfileDataService.js')
    await expect(service.updateTrainingForUser('user-1', 'training-1', { title: 'Autre' })).rejects.toMatchObject({ statusCode: 404 })
    candidateCvRepositoryMock.findCandidateProfileByUserId.mockResolvedValueOnce({ id: 'profile-1' })
    candidateProfileDataRepositoryMock.findCandidateTrainingByIdForProfile.mockResolvedValueOnce(null)
    await expect(service.updateTrainingForUser('user-1', 'training-1', { title: 'Autre' })).rejects.toMatchObject({ statusCode: 404 })
  })

  it('creates a manual skill for the authenticated profile', async () => {
    candidateCvRepositoryMock.findCandidateProfileByUserId.mockResolvedValueOnce({ id: 'profile-1' })
    candidateProfileDataRepositoryMock.createCandidateSkill.mockResolvedValueOnce({ id: 'skill-1', dataSource: 'MANUAL' })
    const { createSkillForUser } = await import('./candidateProfileDataService.js')
    await expect(createSkillForUser('user-1', { name: 'TypeScript', category: 'LANGUAGES' })).resolves.toMatchObject({ dataSource: 'MANUAL' })
    expect(candidateProfileDataRepositoryMock.createCandidateSkill).toHaveBeenCalledWith('profile-1', { name: 'TypeScript', category: 'LANGUAGES' })
  })

  it('deletes a skill only within the authenticated profile scope', async () => {
    candidateCvRepositoryMock.findCandidateProfileByUserId.mockResolvedValueOnce({ id: 'profile-1' })
    candidateProfileDataRepositoryMock.deleteCandidateSkillByIdForProfile.mockResolvedValueOnce(true)
    const { deleteSkillForUser } = await import('./candidateProfileDataService.js')
    await expect(deleteSkillForUser('user-1', 'skill-1')).resolves.toBe(true)
    expect(candidateProfileDataRepositoryMock.deleteCandidateSkillByIdForProfile).toHaveBeenCalledWith('skill-1', 'profile-1')
  })
})
