import { httpClient } from '@/services/httpClient'
import type { IApiResponse } from '@/types/api'
import type { IUser } from '@/types/user'

export interface IUpdateProfilePayload {
  firstname: string
  lastname: string
  email: string
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
