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
import {
  emailVerificationRateLimit,
  forgotPasswordRateLimit,
  loginRateLimit,
} from '../middlewares/rateLimiters.js'
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
  loginRateLimit,
  validateBody(loginBodySchema),
  asyncHandler(loginController),
)
authRoutes.post(
  '/auth/email-verification/verify',
  emailVerificationRateLimit,
  validateBody(emailVerificationBodySchema),
  asyncHandler(verifyEmailController),
)
authRoutes.post(
  '/auth/email-verification/resend',
  emailVerificationRateLimit,
  validateBody(resendEmailVerificationBodySchema),
  asyncHandler(resendEmailVerificationController),
)
authRoutes.post(
  '/auth/forgot-password',
  forgotPasswordRateLimit,
  validateBody(forgotPasswordBodySchema),
  asyncHandler(forgotPasswordController),
)
authRoutes.post(
  '/auth/reset-password',
  validateBody(resetPasswordBodySchema),
  asyncHandler(resetPasswordController),
)
authRoutes.post('/auth/logout', logoutController)
