import { Router } from 'express'
import {
  deleteCompanyController,
  createCompanyController,
  getCompanyController,
  getCompaniesController,
  updateCompanyFavoriteController,
  updateCompanyController,
} from '../controllers/companyController.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import { authenticateRequest } from '../middlewares/authenticateRequest.js'
import { validateBody } from '../middlewares/validateBody.js'
import {
  createCompanyBodySchema,
  updateCompanyFavoriteBodySchema,
} from '../validators/companyValidators.js'
import { updateCompanyBodySchema } from '../validators/companyUpdateValidators.js'

export const companyRoutes = Router()

companyRoutes.get('/companies', authenticateRequest, asyncHandler(getCompaniesController))

companyRoutes.get(
  '/companies/:id',
  authenticateRequest,
  asyncHandler(getCompanyController),
)

companyRoutes.post(
  '/companies',
  authenticateRequest,
  validateBody(createCompanyBodySchema),
  asyncHandler(createCompanyController),
)

companyRoutes.patch(
  '/companies/:id',
  authenticateRequest,
  validateBody(updateCompanyBodySchema),
  asyncHandler(updateCompanyController),
)

companyRoutes.patch(
  '/companies/:id/favorite',
  authenticateRequest,
  validateBody(updateCompanyFavoriteBodySchema),
  asyncHandler(updateCompanyFavoriteController),
)

companyRoutes.delete(
  '/companies/:id',
  authenticateRequest,
  asyncHandler(deleteCompanyController),
)

