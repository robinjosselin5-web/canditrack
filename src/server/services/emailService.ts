import nodemailer from "nodemailer";
import { env } from "../config/env.js";

export interface IPasswordResetEmailPayload {
  email: string;
  resetUrl: string;
}

export interface IEmailVerificationPayload {
  code: string;
  email: string;
}

export async function sendPasswordResetEmail(
  payload: IPasswordResetEmailPayload,
): Promise<void> {
  const transporter = createMailTransporter();

  await transporter.sendMail({
    from: env.MAIL_FROM,
    html: `
      <p>Bonjour,</p>
      <p>Vous avez demande la reinitialisation de votre mot de passe CandiTrack.</p>
      <p><a href="${payload.resetUrl}">Reinitialiser mon mot de passe</a></p>
      <p>Si vous n'etes pas a l'origine de cette demande, vous pouvez ignorer cet e-mail.</p>
    `,
    subject: "Reinitialisation de votre mot de passe CandiTrack",
    text: [
      "Bonjour,",
      "",
      "Vous avez demande la reinitialisation de votre mot de passe CandiTrack.",
      `Lien de reinitialisation : ${payload.resetUrl}`,
      "",
      "Si vous n'etes pas a l'origine de cette demande, vous pouvez ignorer cet e-mail.",
    ].join("\n"),
    to: payload.email,
  });

  if (env.NODE_ENV === "development") {
    console.info(
      `Password reset link for ${payload.email}: ${payload.resetUrl}`,
    );
  }
}

export async function sendEmailVerificationCode(
  payload: IEmailVerificationPayload,
): Promise<void> {
  const transporter = createMailTransporter();

  await transporter.sendMail({
    from: env.MAIL_FROM,
    html: `
      <p>Bonjour,</p>
      <p>Votre code de validation CandiTrack est :</p>
      <p><strong>${payload.code}</strong></p>
      <p>Ce code est valable pendant ${env.EMAIL_VERIFICATION_EXPIRES_MINUTES} minutes.</p>
    `,
    subject: "Code de validation de votre compte CandiTrack",
    text: [
      "Bonjour,",
      "",
      `Votre code de validation CandiTrack est : ${payload.code}`,
      `Ce code est valable pendant ${env.EMAIL_VERIFICATION_EXPIRES_MINUTES} minutes.`,
    ].join("\n"),
    to: payload.email,
  });

  if (env.NODE_ENV === "development") {
    console.info(`Email verification code for ${payload.email}: ${payload.code}`);
  }
}

function createMailTransporter() {
  return nodemailer.createTransport({
    auth:
      env.SMTP_USER && env.SMTP_PASSWORD
        ? {
            pass: env.SMTP_PASSWORD,
            user: env.SMTP_USER,
          }
        : undefined,
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
  });
}
