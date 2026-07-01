import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BrandLogoLink } from "@/components/BrandLogoLink";
import { Alert, Button, Card, Input } from "@/components/ui";
import type { IApiResponse } from "@/types/api";
import { useForgotPassword } from "../hooks/useForgotPassword";
import type { IForgotPasswordFormValues } from "../types/passwordReset.types";
import { forgotPasswordSchema } from "../utils/passwordResetSchema";

export function ForgotPasswordPage() {
  const forgotPasswordMutation = useForgotPassword();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<IForgotPasswordFormValues>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (values: IForgotPasswordFormValues) => {
    forgotPasswordMutation.mutate(values);
  };

  const errorMessage = getForgotPasswordErrorMessage(
    forgotPasswordMutation.error,
  );

  return (
    <Card className="mx-auto w-full max-w-140 border-border/80 px-6 py-6 shadow-large sm:px-10 sm:py-8">
      <div className="mb-6 text-center">
        <BrandLogoLink variant="stacked" />
        <h1 className="mt-6 text-4xl font-bold tracking-normal text-text-primary">
          Mot de passe oublie
        </h1>
        <p className="mt-3 text-base leading-7 text-text-secondary">
          Saisissez votre adresse e-mail pour recevoir un lien securise.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {forgotPasswordMutation.isSuccess ? (
          <Alert variant="success">
            Si un compte est associe a cette adresse e-mail, un lien de
            reinitialisation a ete envoye.
          </Alert>
        ) : null}

        {errorMessage ? <Alert variant="error">{errorMessage}</Alert> : null}

        <Input
          aria-label="Adresse e-mail"
          autoComplete="email"
          error={errors.email?.message}
          iconLeft={<Mail className="size-5" />}
          label="Email"
          placeholder="votre@email.com"
          type="email"
          {...register("email")}
        />

        <Button
          className="min-h-16 text-lg shadow-large"
          loading={forgotPasswordMutation.isPending}
          type="submit"
        >
          Envoyer le lien
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

function getForgotPasswordErrorMessage(error: unknown): string | null {
  if (!error) {
    return null;
  }

  if (error instanceof AxiosError) {
    const response = error.response?.data as IApiResponse<unknown> | undefined;

    if (!error.response) {
      return "L'API est indisponible. Verifiez que le backend est demarre.";
    }

    return (
      response?.message ??
      "Impossible d'envoyer le lien de reinitialisation. Reessayez."
    );
  }

  return "Impossible d'envoyer le lien de reinitialisation. Reessayez.";
}
