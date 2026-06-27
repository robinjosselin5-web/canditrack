import cors from 'cors'
import express from 'express'
import { env } from './config/env.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { notFoundHandler } from './middlewares/notFoundHandler.js'
import { requestLogger } from './middlewares/requestLogger.js'
import { apiRoutes } from './routes/index.js'

export const app = express()

app.use(
  cors({
    credentials: true,
    origin: env.CORS_ORIGIN,
  }),
)
app.use(express.json())
app.use(requestLogger)

app.use('/api/v1', apiRoutes)

app.use(notFoundHandler)
app.use(errorHandler)
