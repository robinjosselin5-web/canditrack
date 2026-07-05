import { z } from "zod";
import { strongPasswordSchema } from "./passwordSchema";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "L'adresse email est obligatoire.")
    .email("L'adresse e-mail doit etre valide."),
});

export const resetPasswordSchema = z
  .object({
    password: strongPasswordSchema,
    confirmPassword: z.string().min(1, "La confirmation est obligatoire."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Les deux mots de passe doivent correspondre.",
    path: ["confirmPassword"],
  });
