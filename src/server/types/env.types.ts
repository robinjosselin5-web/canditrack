export interface IServerEnv {
  NODE_ENV: "development" | "test" | "production";
  PORT: number;
  CORS_ORIGIN: string;
  FRONTEND_URL: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  EMAIL_VERIFICATION_EXPIRES_MINUTES: number;
  PASSWORD_RESET_EXPIRES_MINUTES: number;
  AI_CV_ANALYSIS_ENABLED: boolean;
  OPENROUTER_API_KEY: string;
  OPENROUTER_MODEL: string;
  OPENROUTER_BASE_URL: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_SECURE: boolean;
  SMTP_USER?: string;
  SMTP_PASSWORD?: string;
  MAIL_FROM: string;
}
