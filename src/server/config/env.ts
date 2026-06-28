import "dotenv/config";
import { z } from "zod";
import type { IServerEnv } from "../types/env.types.js";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  CORS_ORIGIN: z.string().url().default("http://localhost:5173"),
  FRONTEND_URL: z.string().url().default("http://localhost:5173"),
  DATABASE_URL: z
    .string()
    .min(1)
    .default("postgresql://postgres:postgres@localhost:5432/canditrack"),
  JWT_SECRET: z
    .string()
    .min(32)
    .default("development-secret-change-me-32-chars"),
  EMAIL_VERIFICATION_EXPIRES_MINUTES: z.coerce
    .number()
    .int()
    .positive()
    .default(30),
  PASSWORD_RESET_EXPIRES_MINUTES: z.coerce
    .number()
    .int()
    .positive()
    .default(30),
  SMTP_HOST: z.string().min(1).default("localhost"),
  SMTP_PORT: z.coerce.number().int().positive().default(1025),
  SMTP_SECURE: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  MAIL_FROM: z.string().min(1).default("CandiTrack <noreply@canditrack.local>"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "Invalid server environment variables",
    parsedEnv.error.format(),
  );
  process.exit(1);
}

export const env: IServerEnv = parsedEnv.data;
