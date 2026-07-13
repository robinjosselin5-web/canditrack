import { z } from "zod";

export const strongPasswordSchema = z
  .string()
  .min(8, "Le mot de passe doit contenir au moins 8 caracteres.")
  .regex(/[A-Z]/, "Le mot de passe doit contenir une majuscule.")
  .regex(/[a-z]/, "Le mot de passe doit contenir une minuscule.")
  .regex(/[0-9]/, "Le mot de passe doit contenir un chiffre.")
  .regex(/[^A-Za-z0-9]/, "Le mot de passe doit contenir un caractere special.");
