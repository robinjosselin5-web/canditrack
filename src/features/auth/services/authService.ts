import { httpClient } from '@/services/httpClient'
import type { IApiResponse } from '@/types/api'
import type {
  IAuthSession,
  IForgotPasswordPayload,
  ILoginPayload,
  IRegisterPayload,
  IResetPasswordPayload,
} from '@/types/auth'
import type { IUser } from '@/types/user'

export async function registerUser(
  payload: IRegisterPayload,
): Promise<IAuthSession> {
  const response = await httpClient.post<IApiResponse<IAuthSession>>(
    '/auth/register',
    payload,
  )

  return response.data.data
}

export async function loginUser(
  payload: ILoginPayload,
): Promise<IAuthSession> {
  const response = await httpClient.post<IApiResponse<IAuthSession>>(
    '/auth/login',
    payload,
  )

  return response.data.data
}

export async function logoutUser(): Promise<void> {
  await httpClient.post<IApiResponse<null>>('/auth/logout')
}

export async function getCurrentUser(): Promise<IUser> {
  const response = await httpClient.get<IApiResponse<IUser>>('/auth/me')

  return response.data.data
}

export async function requestPasswordReset(
  payload: IForgotPasswordPayload,
): Promise<void> {
  await httpClient.post<IApiResponse<null>>('/auth/forgot-password', payload)
}

export async function resetPassword(
  payload: IResetPasswordPayload,
): Promise<void> {
  await httpClient.post<IApiResponse<null>>('/auth/reset-password', payload)
}
