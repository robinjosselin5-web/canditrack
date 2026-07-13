import { Router } from 'express'
import {
  createCandidateExperienceController,
  deleteCandidateExperienceController,
  updateCandidateExperienceController,
} from '../controllers/candidateProfileDataController.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import { authenticateRequest } from '../middlewares/authenticateRequest.js'
import { validateBody } from '../middlewares/validateBody.js'
import {
  createCandidateExperienceBodySchema,
  updateCandidateExperienceBodySchema,
} from '../validators/candidateExperienceValidators.js'

export const candidateProfileDataRoutes = Router()

candidateProfileDataRoutes.post(
  '/profile/experiences',
  authenticateRequest,
  validateBody(createCandidateExperienceBodySchema),
  asyncHandler(createCandidateExperienceController),
)

candidateProfileDataRoutes.patch(
  '/profile/experiences/:experienceId',
  authenticateRequest,
  validateBody(updateCandidateExperienceBodySchema),
  asyncHandler(updateCandidateExperienceController),
)

candidateProfileDataRoutes.delete(
  '/profile/experiences/:experienceId',
  authenticateRequest,
  asyncHandler(deleteCandidateExperienceController),
)
