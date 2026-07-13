import { z } from "zod";
import { strongPasswordSchema } from "./passwordSchema";

export const registerSchema = z
  .object({
    firstname: z
      .string()
      .trim()
      .min(1, "Le prenom est obligatoire.")
      .max(100, "Le prenom ne peut pas depasser 100 caracteres."),
    lastname: z
      .string()
      .trim()
      .min(1, "Le nom est obligatoire.")
      .max(100, "Le nom ne peut pas depasser 100 caracteres."),
    email: z
      .string()
      .trim()
      .min(1, "L'adresse e-mail est obligatoire.")
      .email("L'adresse e-mail doit etre valide."),
    password: strongPasswordSchema,
    confirmPassword: z.string().min(1, "La confirmation est obligatoire."),
    acceptTerms: z
      .boolean()
      .refine(
        (acceptedTerms) => acceptedTerms,
        "Vous devez accepter les conditions pour creer un compte.",
      ),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Les deux mots de passe doivent correspondre.",
    path: ["confirmPassword"],
  });
