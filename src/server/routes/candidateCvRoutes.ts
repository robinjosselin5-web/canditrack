import { Router } from 'express'
import multer from 'multer'
import { MAX_CV_FILE_SIZE } from '../../config/candidateCvConstants.js'
import {
  analyzeCandidateCvController,
  deleteCandidateCvController,
  getCandidateCvsController,
  getCandidateCvExtractedDataController,
  importCandidateCvController,
} from '../controllers/candidateCvController.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import { authenticateRequest } from '../middlewares/authenticateRequest.js'

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
  '/profile/cv/:cvId/extracted-data',
  authenticateRequest,
  asyncHandler(getCandidateCvExtractedDataController),
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
  upload.single('file'),
  asyncHandler(importCandidateCvController),
)
