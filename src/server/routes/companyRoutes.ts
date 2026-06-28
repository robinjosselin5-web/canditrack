import { Router } from 'express'
import { createCompanyController } from '../controllers/companyController.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import { authJwt } from '../middlewares/authJwt.js'
import { validateBody } from '../middlewares/validateBody.js'
import { createCompanyBodySchema } from '../validators/companyValidators.js'

export const companyRoutes = Router()

companyRoutes.post(
  '/companies',
  authJwt,
  validateBody(createCompanyBodySchema),
  asyncHandler(createCompanyController),
)

