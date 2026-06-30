import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { LockKeyhole } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BrandLogoLink } from "@/components/BrandLogoLink";
import { Alert, Button, Card, Input } from "@/components/ui";
import type { IApiResponse } from "@/types/api";
import { useResetPassword } from "../hooks/useResetPassword";
import type { IResetPasswordFormValues } from "../types/passwordReset.types";
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
    <Card className="mx-auto w-full max-w-[560px] border-border/80 px-6 py-6 shadow-large sm:px-10 sm:py-8">
      <div className="mb-6 text-center">
        <BrandLogoLink variant="stacked" />
        <h1 className="mt-6 text-4xl font-bold tracking-normal text-text-primary">
          Nouveau mot de passe
        </h1>
        <p className="mt-3 text-base leading-7 text-text-secondary">
          Choisissez un mot de passe fort pour proteger votre compte.
        </p>
      </div>

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

function getResetPasswordErrorMessage(error: unknown): string | null {
  if (!error) {
    return null;
  }

  if (error instanceof AxiosError) {
    const response = error.response?.data as IApiResponse<unknown> | undefined;

    if (!error.response) {
      return "L'API est indisponible. Verifiez que le backend est demarre.";
    }

    if (error.response.status === 400 || error.response.status === 422) {
      return response?.message ?? "Le lien de reinitialisation est invalide.";
    }

    return (
      response?.message ??
      "Impossible de reinitialiser le mot de passe. Reessayez."
    );
  }

  return "Impossible de reinitialiser le mot de passe. Reessayez.";
}
