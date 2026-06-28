import { Router } from 'express'
import {
  forgotPasswordController,
  loginController,
  logoutController,
  registerController,
  resendEmailVerificationController,
  resetPasswordController,
  verifyEmailController,
} from '../controllers/authController.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import { validateBody } from '../middlewares/validateBody.js'
import {
  emailVerificationBodySchema,
  forgotPasswordBodySchema,
  loginBodySchema,
  registerBodySchema,
  resendEmailVerificationBodySchema,
  resetPasswordBodySchema,
} from '../validators/index.js'

export const authRoutes = Router()

authRoutes.post(
  '/auth/register',
  validateBody(registerBodySchema),
  asyncHandler(registerController),
)
authRoutes.post(
  '/auth/login',
  validateBody(loginBodySchema),
  asyncHandler(loginController),
)
authRoutes.post(
  '/auth/email-verification/verify',
  validateBody(emailVerificationBodySchema),
  asyncHandler(verifyEmailController),
)
authRoutes.post(
  '/auth/email-verification/resend',
  validateBody(resendEmailVerificationBodySchema),
  asyncHandler(resendEmailVerificationController),
)
authRoutes.post(
  '/auth/forgot-password',
  validateBody(forgotPasswordBodySchema),
  asyncHandler(forgotPasswordController),
)
authRoutes.post(
  '/auth/reset-password',
  validateBody(resetPasswordBodySchema),
  asyncHandler(resetPasswordController),
)
authRoutes.post('/auth/logout', logoutController)
