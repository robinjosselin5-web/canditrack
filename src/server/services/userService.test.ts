import path from 'node:path'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const userRepositoryMock = vi.hoisted(() => ({
  findUserAvatarByUserId: vi.fn(),
  findUserByEmail: vi.fn(),
  findUserById: vi.fn(),
  updateUserAvatar: vi.fn(),
  updateUserProfile: vi.fn(),
}))

const cryptoMock = vi.hoisted(() => ({
  randomUUID: vi.fn(),
}))

const fsMock = vi.hoisted(() => ({
  mkdir: vi.fn(),
  unlink: vi.fn(),
  writeFile: vi.fn(),
}))

vi.mock('../repositories/index.js', () => userRepositoryMock)
vi.mock('node:crypto', () => cryptoMock)
vi.mock('node:fs/promises', () => fsMock)

function getAvatarStoragePath(userId: string, filename: string) {
  return path.join(process.cwd(), 'uploads', 'users', userId, 'avatar', filename)
}

function buildImageFile(overrides: Partial<Express.Multer.File> = {}): Express.Multer.File {
  return {
    fieldname: 'file',
    originalname: 'avatar.png',
    encoding: '7bit',
    mimetype: 'image/png',
    size: 1024,
    buffer: Buffer.from('fake-image-bytes'),
    destination: '',
    filename: 'avatar.png',
    path: '',
    stream: undefined as never,
    ...overrides,
  }
}

async function importUserService() {
  vi.resetModules()
  return import('./userService.js')
}

const basicUser = {
  id: 'user-1',
  firstname: 'Ada',
  lastname: 'Lovelace',
  email: 'ada@example.com',
  age: null,
  phone: null,
  address: null,
  linkedin: null,
  github: null,
  hasAvatar: false,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
}

describe('userService', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    cryptoMock.randomUUID.mockReturnValue('avatar-uuid-1')
    userRepositoryMock.findUserById.mockResolvedValue(basicUser)
    userRepositoryMock.findUserAvatarByUserId.mockResolvedValue(null)
  })

  describe('getUserProfile', () => {
    it('returns the user when found', async () => {
      const { getUserProfile } = await importUserService()

      await expect(getUserProfile('user-1')).resolves.toEqual(basicUser)
    })

    it('throws a 404 when the user does not exist', async () => {
      userRepositoryMock.findUserById.mockResolvedValueOnce(null)

      const { getUserProfile } = await importUserService()

      await expect(getUserProfile('user-1')).rejects.toMatchObject({
        message: 'Utilisateur introuvable.',
        statusCode: 404,
      })
    })
  })

  describe('updateUserProfile', () => {
    const payload = {
      firstname: 'Ada',
      lastname: 'Lovelace',
      email: 'ada@example.com',
      age: 32,
      phone: '0600000000',
      address: '12 rue des Lilas',
      linkedin: 'https://www.linkedin.com/in/ada',
      github: 'https://github.com/ada',
    }

    it('rejects when the email already belongs to another user', async () => {
      userRepositoryMock.findUserByEmail.mockResolvedValueOnce({ ...basicUser, id: 'user-2' })

      const { updateUserProfile } = await importUserService()

      await expect(updateUserProfile('user-1', payload)).rejects.toMatchObject({
        message: "L'adresse e-mail est déjà utilisée.",
        statusCode: 409,
        errors: [{ field: 'email', message: "L'adresse e-mail est déjà utilisée." }],
      })
      expect(userRepositoryMock.updateUserProfile).not.toHaveBeenCalled()
    })

    it('allows keeping the same email and forwards all fields to the repository', async () => {
      userRepositoryMock.findUserByEmail.mockResolvedValueOnce(basicUser)
      userRepositoryMock.updateUserProfile.mockResolvedValueOnce({ ...basicUser, ...payload })

      const { updateUserProfile } = await importUserService()

      const result = await updateUserProfile('user-1', payload)

      expect(userRepositoryMock.updateUserProfile).toHaveBeenCalledWith('user-1', payload)
      expect(result).toMatchObject(payload)
    })

    it('allows a fresh, unused email', async () => {
      userRepositoryMock.findUserByEmail.mockResolvedValueOnce(null)
      userRepositoryMock.updateUserProfile.mockResolvedValueOnce({ ...basicUser, ...payload })

      const { updateUserProfile } = await importUserService()

      await updateUserProfile('user-1', payload)

      expect(userRepositoryMock.updateUserProfile).toHaveBeenCalledWith('user-1', payload)
    })
  })

  describe('updateUserAvatar', () => {
    it('rejects an undefined file', async () => {
      const { updateUserAvatar } = await importUserService()

      await expect(updateUserAvatar('user-1', undefined)).rejects.toMatchObject({
        message: 'Une image est requise.',
        statusCode: 400,
      })
    })

    it('rejects an empty file', async () => {
      const { updateUserAvatar } = await importUserService()

      await expect(
        updateUserAvatar('user-1', buildImageFile({ size: 0 })),
      ).rejects.toMatchObject({
        message: 'Le fichier importé est vide.',
        statusCode: 400,
      })
    })

    it('rejects a file larger than 5 MB', async () => {
      const { updateUserAvatar } = await importUserService()

      await expect(
        updateUserAvatar('user-1', buildImageFile({ size: 5 * 1024 * 1024 + 1 })),
      ).rejects.toMatchObject({
        message: 'Le fichier dépasse la limite de 5 Mo.',
        statusCode: 413,
      })
    })

    it('rejects a disallowed mime type', async () => {
      const { updateUserAvatar } = await importUserService()

      await expect(
        updateUserAvatar('user-1', buildImageFile({ mimetype: 'application/pdf' })),
      ).rejects.toMatchObject({
        message: 'Seuls les formats JPG, PNG et GIF sont autorisés.',
        statusCode: 400,
      })
    })

    it('stores the file under users/{userId}/avatar/{uuid}.{ext} and updates the repository', async () => {
      userRepositoryMock.updateUserAvatar.mockResolvedValueOnce({ ...basicUser, hasAvatar: true })

      const { updateUserAvatar } = await importUserService()

      const result = await updateUserAvatar('user-1', buildImageFile())

      const expectedPath = getAvatarStoragePath('user-1', 'avatar-uuid-1.png')
      expect(fsMock.mkdir).toHaveBeenCalledWith(path.dirname(expectedPath), { recursive: true })
      expect(fsMock.writeFile).toHaveBeenCalledWith(expectedPath, expect.any(Buffer))
      expect(userRepositoryMock.updateUserAvatar).toHaveBeenCalledWith(
        'user-1',
        'users/user-1/avatar/avatar-uuid-1.png',
        'image/png',
      )
      expect(result).toMatchObject({ hasAvatar: true })
    })

    it('rolls back the newly written file when the database update fails', async () => {
      const dbError = new Error('database unavailable')
      userRepositoryMock.updateUserAvatar.mockRejectedValueOnce(dbError)

      const { updateUserAvatar } = await importUserService()

      await expect(updateUserAvatar('user-1', buildImageFile())).rejects.toBe(dbError)

      expect(fsMock.unlink).toHaveBeenCalledTimes(1)
      expect(fsMock.unlink).toHaveBeenCalledWith(getAvatarStoragePath('user-1', 'avatar-uuid-1.png'))
    })

    it('removes the previous avatar file after a successful replacement', async () => {
      userRepositoryMock.findUserAvatarByUserId.mockResolvedValueOnce({
        storageKey: 'users/user-1/avatar/old-uuid.jpg',
        mimeType: 'image/jpeg',
      })
      userRepositoryMock.updateUserAvatar.mockResolvedValueOnce({ ...basicUser, hasAvatar: true })

      const { updateUserAvatar } = await importUserService()

      await updateUserAvatar('user-1', buildImageFile())

      expect(fsMock.unlink).toHaveBeenCalledWith(getAvatarStoragePath('user-1', 'old-uuid.jpg'))
    })

    it('does not fail when removing the previous avatar file that is already missing', async () => {
      userRepositoryMock.findUserAvatarByUserId.mockResolvedValueOnce({
        storageKey: 'users/user-1/avatar/old-uuid.jpg',
        mimeType: 'image/jpeg',
      })
      userRepositoryMock.updateUserAvatar.mockResolvedValueOnce({ ...basicUser, hasAvatar: true })
      fsMock.unlink.mockRejectedValueOnce(Object.assign(new Error('missing'), { code: 'ENOENT' }))

      const { updateUserAvatar } = await importUserService()

      await expect(updateUserAvatar('user-1', buildImageFile())).resolves.toMatchObject({
        hasAvatar: true,
      })
    })
  })

  describe('getUserAvatar', () => {
    it('returns the stored avatar reference', async () => {
      userRepositoryMock.findUserAvatarByUserId.mockResolvedValueOnce({
        storageKey: 'users/user-1/avatar/avatar-uuid.png',
        mimeType: 'image/png',
      })

      const { getUserAvatar } = await importUserService()

      await expect(getUserAvatar('user-1')).resolves.toEqual({
        storageKey: 'users/user-1/avatar/avatar-uuid.png',
        mimeType: 'image/png',
      })
    })

    it('throws a 404 when the user has no avatar', async () => {
      const { getUserAvatar } = await importUserService()

      await expect(getUserAvatar('user-1')).rejects.toMatchObject({
        message: 'Aucune photo de profil.',
        statusCode: 404,
      })
    })
  })
})
