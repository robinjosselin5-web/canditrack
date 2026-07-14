import type { Request, Response } from 'express'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const authMock = vi.hoisted(() => ({
  getAuthenticatedUserId: vi.fn(),
}))

const serviceMock = vi.hoisted(() => ({
  getUserAvatar: vi.fn(),
  getUserProfile: vi.fn(),
  resolveAvatarPath: vi.fn(),
  updateUserAvatar: vi.fn(),
  updateUserProfile: vi.fn(),
}))

vi.mock('../utils/auth.js', () => authMock)
vi.mock('../services/userService.js', () => serviceMock)

function createResponse() {
  const response = {
    json: vi.fn(),
    sendFile: vi.fn(),
    status: vi.fn(),
    type: vi.fn(),
  } as unknown as Response & {
    json: ReturnType<typeof vi.fn>
    sendFile: ReturnType<typeof vi.fn>
    status: ReturnType<typeof vi.fn>
    type: ReturnType<typeof vi.fn>
  }

  response.status.mockReturnValue(response)
  response.type.mockReturnValue(response)
  return response
}

describe('userController', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    authMock.getAuthenticatedUserId.mockReturnValue('user-1')
  })

  it('returns the authenticated user profile', async () => {
    const { getUserProfileController } = await import('./userController.js')
    const response = createResponse()
    const request = {} as Request
    serviceMock.getUserProfile.mockResolvedValueOnce({ id: 'user-1', firstname: 'Ada' })

    await getUserProfileController(request, response)

    expect(serviceMock.getUserProfile).toHaveBeenCalledWith('user-1')
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).toHaveBeenCalledWith({
      success: true,
      data: { id: 'user-1', firstname: 'Ada' },
    })
  })

  it('updates the profile with the validated body, including the new fields', async () => {
    const { updateUserProfileController } = await import('./userController.js')
    const response = createResponse()
    const body = {
      firstname: 'Ada',
      lastname: 'Lovelace',
      email: 'ada@example.com',
      age: 32,
      phone: '0600000000',
      address: '12 rue des Lilas',
      linkedin: 'https://www.linkedin.com/in/ada',
      github: 'https://github.com/ada',
    }
    const request = { body } as Request
    serviceMock.updateUserProfile.mockResolvedValueOnce({ id: 'user-1', ...body })

    await updateUserProfileController(request, response)

    expect(serviceMock.updateUserProfile).toHaveBeenCalledWith('user-1', body)
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).toHaveBeenCalledWith({
      success: true,
      data: { id: 'user-1', ...body },
    })
  })

  it('uploads an avatar for the authenticated user', async () => {
    const { uploadUserAvatarController } = await import('./userController.js')
    const response = createResponse()
    const file = { originalname: 'avatar.png' } as Express.Multer.File
    const request = { file } as Request
    serviceMock.updateUserAvatar.mockResolvedValueOnce({ id: 'user-1', hasAvatar: true })

    await uploadUserAvatarController(request, response)

    expect(serviceMock.updateUserAvatar).toHaveBeenCalledWith('user-1', file)
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).toHaveBeenCalledWith({
      success: true,
      data: { id: 'user-1', hasAvatar: true },
    })
  })

  it('streams the stored avatar file with its mime type', async () => {
    const { getUserAvatarController } = await import('./userController.js')
    const response = createResponse()
    const request = {} as Request
    serviceMock.getUserAvatar.mockResolvedValueOnce({
      storageKey: 'users/user-1/avatar/avatar-uuid.png',
      mimeType: 'image/png',
    })
    serviceMock.resolveAvatarPath.mockReturnValueOnce('/abs/uploads/users/user-1/avatar/avatar-uuid.png')

    await getUserAvatarController(request, response)

    expect(serviceMock.getUserAvatar).toHaveBeenCalledWith('user-1')
    expect(serviceMock.resolveAvatarPath).toHaveBeenCalledWith('users/user-1/avatar/avatar-uuid.png')
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.type).toHaveBeenCalledWith('image/png')
    expect(response.sendFile).toHaveBeenCalledWith('/abs/uploads/users/user-1/avatar/avatar-uuid.png')
  })
})
