import { Router } from 'express'
import {
  forgotPasswordController,
  loginController,
  logoutController,
  registerController,
  resetPasswordController,
} from '../controllers/authController.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import { validateBody } from '../middlewares/validateBody.js'
import {
  forgotPasswordBodySchema,
  loginBodySchema,
  registerBodySchema,
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
