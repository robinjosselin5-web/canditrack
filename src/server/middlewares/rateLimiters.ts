import { rateLimit } from 'express-rate-limit'
import type { Request, Response } from 'express'

export const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_request: Request, response: Response) => {
    response.status(429).json({
      success: false,
      message: 'Trop de tentatives de connexion. Reessayez dans 15 minutes.',
      errors: [],
    })
  },
})

export const emailVerificationRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_request: Request, response: Response) => {
    response.status(429).json({
      success: false,
      message:
        'Trop de tentatives de verification e-mail. Reessayez dans 15 minutes.',
      errors: [],
    })
  },
})

export const forgotPasswordRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 3,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_request: Request, response: Response) => {
    response.status(429).json({
      success: false,
      message: 'Trop de demandes de reinitialisation. Reessayez dans 15 minutes.',
      errors: [],
    })
  },
})

export const candidateCvUploadRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (request: Request) => request.userId ?? request.ip ?? 'anonymous',
  handler: (_request: Request, response: Response) => {
    response.status(429).json({
      success: false,
      message: "Trop d'envois de CV. Reessayez dans 1 heure.",
      errors: [],
    })
  },
})

export const candidateProfileDataCreateRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (request: Request) => request.userId ?? request.ip ?? 'anonymous',
  handler: (_request: Request, response: Response) => {
    response.status(429).json({
      success: false,
      message:
        "Trop de creations de donnees extraites. Reessayez dans 1 heure.",
      errors: [],
    })
  },
})
