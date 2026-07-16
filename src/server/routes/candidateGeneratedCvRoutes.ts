import { Router } from 'express'
import {
  createGeneratedCvController,
  getGeneratedCvAvatarController,
  getGeneratedCvController,
  getGeneratedCvsController,
  getPublicGeneratedCvController,
} from '../controllers/candidateGeneratedCvController.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import { authenticateRequest } from '../middlewares/authenticateRequest.js'
import { validateBody } from '../middlewares/validateBody.js'
import { createCandidateGeneratedCvBodySchema } from '../validators/candidateGeneratedCvValidators.js'

export const candidateGeneratedCvRoutes = Router()

candidateGeneratedCvRoutes.post(
  '/profile/generated-cvs',
  authenticateRequest,
  validateBody(createCandidateGeneratedCvBodySchema),
  asyncHandler(createGeneratedCvController),
)

candidateGeneratedCvRoutes.get(
  '/profile/generated-cvs',
  authenticateRequest,
  asyncHandler(getGeneratedCvsController),
)

candidateGeneratedCvRoutes.get(
  '/profile/generated-cvs/:generatedCvId',
  authenticateRequest,
  asyncHandler(getGeneratedCvController),
)

candidateGeneratedCvRoutes.get(
  '/public/generated-cvs/:publicId/avatar',
  asyncHandler(getGeneratedCvAvatarController),
)

candidateGeneratedCvRoutes.get(
  '/public/generated-cvs/:publicId',
  asyncHandler(getPublicGeneratedCvController),
)
