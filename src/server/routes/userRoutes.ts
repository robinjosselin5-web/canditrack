import { Router } from 'express'
import {
  getUserProfileController,
  updateUserProfileController,
} from '../controllers/userController.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import { authenticateRequest } from '../middlewares/authenticateRequest.js'
import { validateBody } from '../middlewares/validateBody.js'
import { updateUserProfileBodySchema } from '../validators/index.js'

export const userRoutes = Router()

userRoutes.get(
  '/users/me',
  authenticateRequest,
  asyncHandler(getUserProfileController),
)

userRoutes.patch(
  '/users/me',
  authenticateRequest,
  validateBody(updateUserProfileBodySchema),
  asyncHandler(updateUserProfileController),
)
