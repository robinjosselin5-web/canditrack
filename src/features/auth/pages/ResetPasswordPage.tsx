import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert, Button, Card, Input } from "@/components/ui";
import { AuthPageHeader } from "../components/AuthPageHeader";
import { useResetPassword } from "../hooks/useResetPassword";
import type { IResetPasswordFormValues } from "../types/passwordReset.types";
import { getResetPasswordErrorMessage } from "../utils/authErrorMessages";
import { resetPasswordSchema } from "../utils/passwordResetSchema";

export function ResetPasswordPage() {
  const { token } = useParams();
  const resetPasswordMutation = useResetPassword(token ?? "");
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<IResetPasswordFormValues>({
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (values: IResetPasswordFormValues) => {
    if (!token) {
      return;
    }

    resetPasswordMutation.mutate(values);
  };

  const errorMessage = !token
    ? "Le lien de reinitialisation est invalide."
    : getResetPasswordErrorMessage(resetPasswordMutation.error);

  return (
    <Card className="mx-auto w-full max-w-140 border-border/80 px-6 py-6 shadow-large sm:px-10 sm:py-8">
      <AuthPageHeader
        description="Choisissez un mot de passe fort pour proteger votre compte."
        title="Nouveau mot de passe"
      />

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {errorMessage ? <Alert variant="error">{errorMessage}</Alert> : null}

        <Input
          aria-label="Nouveau mot de passe"
          autoComplete="new-password"
          error={errors.password?.message}
          iconLeft={<LockKeyhole className="size-5" />}
          label="Nouveau mot de passe"
          placeholder="Votre nouveau mot de passe"
          type="password"
          {...register("password")}
        />

        <Input
          aria-label="Confirmation du mot de passe"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          iconLeft={<LockKeyhole className="size-5" />}
          label="Confirmation"
          placeholder="Confirmez votre mot de passe"
          type="password"
          {...register("confirmPassword")}
        />

        <Button
          className="min-h-16 text-lg shadow-large"
          disabled={!token}
          loading={resetPasswordMutation.isPending}
          type="submit"
        >
          Reinitialiser le mot de passe
        </Button>
      </form>

      <p className="mt-6 text-center">
        <Link
          to="/login"
          className="cursor-pointer text-sm font-semibold text-primary transition hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Retour a la connexion
        </Link>
      </p>
    </Card>
  );
}
