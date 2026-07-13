import { describe, expect, it, vi } from 'vitest'

const baseEnv = {
  CORS_ORIGIN: 'http://localhost:5173',
  DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/canditrack',
  EMAIL_VERIFICATION_EXPIRES_MINUTES: '30',
  FRONTEND_URL: 'http://localhost:5173',
  JWT_EXPIRES_IN: '24h',
  JWT_SECRET: 'development-secret-change-me-32-chars',
  MAIL_FROM: 'CandiTrack <noreply@canditrack.local>',
  NODE_ENV: 'development',
  OPENROUTER_API_KEY: '',
  OPENROUTER_BASE_URL: 'https://openrouter.ai/api/v1',
  OPENROUTER_MODEL: 'google/gemini-2.5-flash',
  PASSWORD_RESET_EXPIRES_MINUTES: '30',
  PORT: '3000',
  SMTP_HOST: 'localhost',
  SMTP_PORT: '1025',
  SMTP_SECURE: 'false',
}

function buildEnvOverrides(
  aiCvAnalysisEnabled: 'true' | 'false',
): Record<string, string> {
  return {
    ...baseEnv,
    AI_CV_ANALYSIS_ENABLED: aiCvAnalysisEnabled,
  }
}

async function importEnvWithOverride(
  overrides: Record<string, string | undefined>,
): Promise<boolean> {
  const originalEnv: Record<string, string | undefined> = {
    AI_CV_ANALYSIS_ENABLED: process.env.AI_CV_ANALYSIS_ENABLED,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    DATABASE_URL: process.env.DATABASE_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
    OPENROUTER_BASE_URL: process.env.OPENROUTER_BASE_URL,
    OPENROUTER_MODEL: process.env.OPENROUTER_MODEL,
    PASSWORD_RESET_EXPIRES_MINUTES:
      process.env.PASSWORD_RESET_EXPIRES_MINUTES,
    PORT: process.env.PORT,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SECURE: process.env.SMTP_SECURE,
    SMTP_USER: process.env.SMTP_USER,
    EMAIL_VERIFICATION_EXPIRES_MINUTES:
      process.env.EMAIL_VERIFICATION_EXPIRES_MINUTES,
    MAIL_FROM: process.env.MAIL_FROM,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  }

  try {
    Object.assign(process.env, overrides)
    vi.resetModules()
    const importedEnv = await import('./env.js')

    return importedEnv.env.AI_CV_ANALYSIS_ENABLED
  } finally {
    for (const [key, value] of Object.entries(originalEnv)) {
      if (value === undefined) {
        delete process.env[key]
        continue
      }

      process.env[key] = value
    }
  }
}

describe('env', () => {
  it('parses AI_CV_ANALYSIS_ENABLED false as false', async () => {
    const value = await importEnvWithOverride(buildEnvOverrides('false'))

    expect(value).toBe(false)
  })

  it('parses AI_CV_ANALYSIS_ENABLED true as true', async () => {
    const value = await importEnvWithOverride(buildEnvOverrides('true'))

    expect(value).toBe(true)
  })
})
