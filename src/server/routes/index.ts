import { Router } from 'express'
import { authRoutes } from './authRoutes.js'
import { healthRoutes } from './healthRoutes.js'
<<<<<<< HEAD
import { companyRoutes } from './companyRoutes.js'
=======
import { userRoutes } from './userRoutes.js'
>>>>>>> 2ca2a38b6d0d6a47edb7c60cbc71841305ff6423

export const apiRoutes = Router()

apiRoutes.use(authRoutes)
apiRoutes.use(healthRoutes)
<<<<<<< HEAD
apiRoutes.use(companyRoutes)
=======
apiRoutes.use(userRoutes)
>>>>>>> 2ca2a38b6d0d6a47edb7c60cbc71841305ff6423
