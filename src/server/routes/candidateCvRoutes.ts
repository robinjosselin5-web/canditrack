import { Router } from 'express'
import multer from 'multer'
import {
  analyzeCandidateCvController,
  deleteCandidateCvController,
  getCandidateCvsController,
  importCandidateCvController,
} from '../controllers/candidateCvController.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import { authenticateRequest } from '../middlewares/authenticateRequest.js'

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  storage: multer.memoryStorage(),
})

export const candidateCvRoutes = Router()

candidateCvRoutes.get(
  '/profile/cv',
  authenticateRequest,
  asyncHandler(getCandidateCvsController),
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
