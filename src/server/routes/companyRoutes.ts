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
import { authJwt } from '../middlewares/authJwt.js'
import { validateBody } from '../middlewares/validateBody.js'
import { createCompanyBodySchema } from '../validators/companyValidators.js'
import { updateCompanyBodySchema } from '../validators/companyUpdateValidators.js'

export const companyRoutes = Router()

companyRoutes.get('/companies', authJwt, asyncHandler(getCompaniesController))

companyRoutes.get(
  '/companies/:id',
  authJwt,
  asyncHandler(getCompanyController),
)

companyRoutes.post(
  '/companies',
  authJwt,
  validateBody(createCompanyBodySchema),
  asyncHandler(createCompanyController),
)

companyRoutes.patch(
  '/companies/:id',
  authJwt,
  validateBody(updateCompanyBodySchema),
  asyncHandler(updateCompanyController),
)

companyRoutes.patch(
  '/companies/:id/favorite',
  authJwt,
  asyncHandler(updateCompanyFavoriteController),
)

companyRoutes.delete(
  '/companies/:id',
  authJwt,
  asyncHandler(deleteCompanyController),
)

