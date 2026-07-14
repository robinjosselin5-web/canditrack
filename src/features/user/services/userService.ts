import { httpClient } from '@/services/httpClient'
import type { IApiResponse } from '@/types/api'
import type { IUser } from '@/types/user'

export interface IUpdateProfilePayload {
  firstname: string
  lastname: string
  email: string
  age: number | null
  phone: string | null
  address: string | null
  linkedin: string | null
  github: string | null
}

export async function getUserProfile(): Promise<IUser> {
  const response = await httpClient.get<IApiResponse<IUser>>('/users/me')

  return response.data.data
}

export async function updateUserProfile(
  payload: IUpdateProfilePayload,
): Promise<IUser> {
  const response = await httpClient.patch<IApiResponse<IUser>>(
    '/users/me',
    payload,
  )

  return response.data.data
}

export async function uploadUserAvatar(file: File): Promise<IUser> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await httpClient.post<IApiResponse<IUser>>(
    '/users/me/avatar',
    formData,
    { headers: { 'Content-Type': undefined } },
  )

  return response.data.data
}

export async function fetchUserAvatarBlob(): Promise<Blob> {
  const response = await httpClient.get<Blob>('/users/me/avatar', {
    responseType: 'blob',
  })

  return response.data
}
