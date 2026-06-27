import { env } from '../config/env.js'

export interface IPasswordResetEmailPayload {
  email: string
  resetUrl: string
}

export async function sendPasswordResetEmail(
  payload: IPasswordResetEmailPayload,
): Promise<void> {
  if (env.NODE_ENV === 'development') {
    console.info(
      `Password reset link for ${payload.email}: ${payload.resetUrl}`,
    )
  }
}
