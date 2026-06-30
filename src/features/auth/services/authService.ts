import { httpClient } from '@/services/httpClient'
import type { IApiResponse } from '@/types/api'
import type {
  IAuthSession,
  IEmailVerificationPending,
  IForgotPasswordPayload,
  ILoginPayload,
  IRegisterPayload,
  IResendEmailVerificationPayload,
  IResetPasswordPayload,
  IVerifyEmailPayload,
} from '@/types/auth'

export async function registerUser(
  payload: IRegisterPayload,
): Promise<IEmailVerificationPending> {
  const response = await httpClient.post<
    IApiResponse<IEmailVerificationPending>
  >('/auth/register', payload)

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

export async function verifyEmail(
  payload: IVerifyEmailPayload,
): Promise<IAuthSession> {
  const response = await httpClient.post<IApiResponse<IAuthSession>>(
    '/auth/email-verification/verify',
    payload,
  )

  return response.data.data
}

export async function resendEmailVerificationCode(
  payload: IResendEmailVerificationPayload,
): Promise<IEmailVerificationPending> {
  const response = await httpClient.post<
    IApiResponse<IEmailVerificationPending>
  >('/auth/email-verification/resend', payload)

  return response.data.data
}
