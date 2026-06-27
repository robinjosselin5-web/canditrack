export interface IServerEnv {
  NODE_ENV: 'development' | 'test' | 'production'
  PORT: number
  CORS_ORIGIN: string
  FRONTEND_URL: string
  DATABASE_URL: string
  JWT_SECRET: string
  PASSWORD_RESET_EXPIRES_MINUTES: number
}
