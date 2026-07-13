import { Router } from 'express'
import multer from 'multer'
import { MAX_CV_FILE_SIZE } from '../../config/candidateCvConstants.js'
import {
  analyzeCandidateCvController,
  deleteCandidateCvController,
  getCandidateCvsController,
  getProfileExtractedDataController,
  importCandidateCvController,
} from '../controllers/candidateCvController.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import { authenticateRequest } from '../middlewares/authenticateRequest.js'
import { candidateCvUploadRateLimit } from '../middlewares/rateLimiters.js'

const upload = multer({
  limits: {
    fileSize: MAX_CV_FILE_SIZE,
  },
  storage: multer.memoryStorage(),
})

export const candidateCvRoutes = Router()

candidateCvRoutes.get(
  '/profile/cv',
  authenticateRequest,
  asyncHandler(getCandidateCvsController),
)

candidateCvRoutes.get(
  '/profile/cv/extracted-data',
  authenticateRequest,
  asyncHandler(getProfileExtractedDataController),
)

candidateCvRoutes.post(
  '/profile/cv/:cvId/analyze',
  authenticateRequest,
  asyncHandler(analyzeCandidateCvController),
)

candidateCvRoutes.delete(
  '/profile/cv/:cvId',
  authenticateRequest,
  asyncHandler(deleteCandidateCvController),
)

candidateCvRoutes.post(
  '/profile/cv',
  authenticateRequest,
  candidateCvUploadRateLimit,
  upload.single('file'),
  asyncHandler(importCandidateCvController),
)
