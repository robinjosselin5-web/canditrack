import { Router } from 'express'
import { authRoutes } from './authRoutes.js'
import { healthRoutes } from './healthRoutes.js'
import { companyRoutes } from './companyRoutes.js'
import { userRoutes } from './userRoutes.js'
import { candidateCvRoutes } from './candidateCvRoutes.js'

export const apiRoutes = Router()

apiRoutes.use(authRoutes)
apiRoutes.use(healthRoutes)
apiRoutes.use(companyRoutes)
apiRoutes.use(userRoutes)
apiRoutes.use(candidateCvRoutes)
