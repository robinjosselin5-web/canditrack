import type { Request, Response } from 'express'
import type {
  EmailVerificationBody,
  ForgotPasswordBody,
  LoginBody,
  RegisterBody,
  ResendEmailVerificationBody,
  ResetPasswordBody,
} from '../validators/index.js'
import {
  loginUser,
  logoutUser,
  registerUser,
  requestEmailVerificationCode,
  requestPasswordReset,
  resetPassword,
  verifyEmail,
} from '../services/authService.js'
import type { IApiSuccessResponse } from '../types/api.types.js'
import type {
  IAuthSession,
  IEmailVerificationPending,
} from '../types/user.types.js'

export async function registerController(
  request: Request<unknown, unknown, RegisterBody>,
  response: Response<IApiSuccessResponse<IEmailVerificationPending>>,
): Promise<void> {
  const pendingVerification = await registerUser(
    request.body.firstname,
    request.body.lastname,
    request.body.email,
    request.body.password,
  )

  response.status(201).json({
    success: true,
    data: pendingVerification,
  })
}

export async function loginController(
  request: Request<unknown, unknown, LoginBody>,
  response: Response<IApiSuccessResponse<IAuthSession>>,
): Promise<void> {
  const session = await loginUser(request.body.email, request.body.password)

  response.status(200).json({
    success: true,
    data: session,
  })
}

export function logoutController(
  _request: Request,
  response: Response<IApiSuccessResponse<null>>,
): void {
  response.status(200).json({
    success: true,
    data: logoutUser(),
  })
}

export async function verifyEmailController(
  request: Request<unknown, unknown, EmailVerificationBody>,
  response: Response<IApiSuccessResponse<IAuthSession>>,
): Promise<void> {
  const session = await verifyEmail(request.body.email, request.body.code)

  response.status(200).json({
    success: true,
    data: session,
  })
}

export async function resendEmailVerificationController(
  request: Request<unknown, unknown, ResendEmailVerificationBody>,
  response: Response<IApiSuccessResponse<IEmailVerificationPending>>,
): Promise<void> {
  const pendingVerification = await requestEmailVerificationCode(
    request.body.email,
  )

  response.status(200).json({
    success: true,
    data: pendingVerification,
  })
}

export async function forgotPasswordController(
  request: Request<unknown, unknown, ForgotPasswordBody>,
  response: Response<IApiSuccessResponse<null>>,
): Promise<void> {
  await requestPasswordReset(request.body.email)

  response.status(200).json({
    success: true,
    data: null,
  })
}

export async function resetPasswordController(
  request: Request<unknown, unknown, ResetPasswordBody>,
  response: Response<IApiSuccessResponse<null>>,
): Promise<void> {
  await resetPassword(request.body.token, request.body.password)

  response.status(200).json({
    success: true,
    data: null,
  })
}
