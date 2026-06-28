import { Router } from 'express'
import { authRoutes } from './authRoutes.js'
import { healthRoutes } from './healthRoutes.js'
import { userRoutes } from './userRoutes.js'

export const apiRoutes = Router()

apiRoutes.use(authRoutes)
apiRoutes.use(healthRoutes)
apiRoutes.use(userRoutes)
