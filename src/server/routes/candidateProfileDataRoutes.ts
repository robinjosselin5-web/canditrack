import { Router } from 'express'
import {
  createCandidateExperienceController,
  deleteCandidateExperienceController,
  updateCandidateExperienceController,
  createCandidateTrainingController,
  deleteCandidateTrainingController,
  updateCandidateTrainingController,
  createCandidateSkillController,
  deleteCandidateSkillController,
} from '../controllers/candidateProfileDataController.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import { authenticateRequest } from '../middlewares/authenticateRequest.js'
import { candidateProfileDataCreateRateLimit } from '../middlewares/rateLimiters.js'
import { validateBody } from '../middlewares/validateBody.js'
import {
  createCandidateExperienceBodySchema,
  updateCandidateExperienceBodySchema,
} from '../validators/candidateExperienceValidators.js'
import { createCandidateTrainingBodySchema, updateCandidateTrainingBodySchema } from '../validators/candidateTrainingValidators.js'
import { createCandidateSkillBodySchema } from '../validators/candidateSkillValidators.js'

export const candidateProfileDataRoutes = Router()

candidateProfileDataRoutes.post(
  '/profile/experiences',
  authenticateRequest,
  candidateProfileDataCreateRateLimit,
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

candidateProfileDataRoutes.post(
  '/profile/trainings',
  authenticateRequest,
  candidateProfileDataCreateRateLimit,
  validateBody(createCandidateTrainingBodySchema),
  asyncHandler(createCandidateTrainingController),
)
candidateProfileDataRoutes.patch('/profile/trainings/:trainingId', authenticateRequest, validateBody(updateCandidateTrainingBodySchema), asyncHandler(updateCandidateTrainingController))
candidateProfileDataRoutes.delete('/profile/trainings/:trainingId', authenticateRequest, asyncHandler(deleteCandidateTrainingController))
candidateProfileDataRoutes.post(
  '/profile/skills',
  authenticateRequest,
  candidateProfileDataCreateRateLimit,
  validateBody(createCandidateSkillBodySchema),
  asyncHandler(createCandidateSkillController),
)
candidateProfileDataRoutes.delete('/profile/skills/:skillId', authenticateRequest, asyncHandler(deleteCandidateSkillController))
