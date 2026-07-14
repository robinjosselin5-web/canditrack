import { Router } from 'express'
import multer from 'multer'
import { MAX_AVATAR_FILE_SIZE } from '../../config/userAvatarConstants.js'
import {
  getUserAvatarController,
  getUserProfileController,
  updateUserProfileController,
  uploadUserAvatarController,
} from '../controllers/userController.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import { authenticateRequest } from '../middlewares/authenticateRequest.js'
import { userAvatarUploadRateLimit } from '../middlewares/rateLimiters.js'
import { validateBody } from '../middlewares/validateBody.js'
import { updateUserProfileBodySchema } from '../validators/index.js'

const avatarUpload = multer({
  limits: {
    fileSize: MAX_AVATAR_FILE_SIZE,
  },
  storage: multer.memoryStorage(),
})

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

userRoutes.get(
  '/users/me/avatar',
  authenticateRequest,
  asyncHandler(getUserAvatarController),
)

userRoutes.post(
  '/users/me/avatar',
  authenticateRequest,
  userAvatarUploadRateLimit,
  avatarUpload.single('file'),
  asyncHandler(uploadUserAvatarController),
)
