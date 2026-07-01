import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { LockKeyhole, LogIn, Mail, RotateCw, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BrandLogoLink } from "@/components/BrandLogoLink";
import { Alert, Button, Card, Checkbox, Input } from "@/components/ui";
import type { IApiResponse } from "@/types/api";
import { useLogin } from "../hooks/useLogin";
import { useResendEmailVerificationCode } from "../hooks/useResendEmailVerificationCode";
import type { ILoginFormValues } from "../types/login.types";
import { loginSchema } from "../utils/loginSchema";

export function LoginPage() {
  const loginMutation = useLogin();
  const resendCodeMutation = useResendEmailVerificationCode();
  const navigate = useNavigate();
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
  } = useForm<ILoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: ILoginFormValues) => {
    loginMutation.mutate(values);
  };

  const onResendCode = () => {
    const email = getValues("email");

    if (email) {
      resendCodeMutation.mutate(email, {
        onSuccess: (pendingVerification) => {
          navigate(
            `/verify-email?email=${encodeURIComponent(pendingVerification.email)}`,
          );
        },
      });
    }
  };

  const errorMessage = getLoginErrorMessage(loginMutation.error);
  const resendErrorMessage = getResendCodeErrorMessage(
    resendCodeMutation.error,
  );
  const shouldShowResendCode = isEmailNotVerifiedError(loginMutation.error);

  return (
    <Card className="mx-auto w-full max-w-140 border-border/80 px-6 py-6 shadow-large sm:px-10 sm:py-8">
      <div className="mb-6 text-center">
        <BrandLogoLink variant="stacked" />
        <h1 className="mt-6 text-4xl font-bold tracking-normal text-text-primary">
          Connexion
        </h1>
        <p className="mt-3 text-base leading-7 text-text-secondary">
          Bienvenue ! Connectez-vous a votre compte.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {errorMessage ? <Alert variant="error">{errorMessage}</Alert> : null}
        {resendErrorMessage ? (
          <Alert variant="error">{resendErrorMessage}</Alert>
        ) : null}

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

        <Input
          aria-label="Mot de passe"
          autoComplete="current-password"
          error={errors.password?.message}
          iconLeft={<LockKeyhole className="size-5" />}
          label="Mot de passe"
          placeholder="Votre mot de passe"
          type="password"
          {...register("password")}
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Checkbox
            aria-label="Se souvenir de moi"
            label="Se souvenir de moi"
            {...register("rememberMe")}
          />
          <Link
            to="/forgot-password"
            className="cursor-pointer text-sm font-semibold text-primary transition hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Mot de passe oublie ?
          </Link>
        </div>

        <Button
          className="min-h-16 text-lg shadow-large"
          loading={loginMutation.isPending}
          type="submit"
        >
          <LogIn className="size-4" aria-hidden="true" />
          Se connecter
        </Button>

        {shouldShowResendCode ? (
          <Button
            className="min-h-12"
            loading={resendCodeMutation.isPending}
            onClick={onResendCode}
            type="button"
            variant="secondary"
          >
            <RotateCw className="size-4" aria-hidden="true" />
            Renvoyer un code
          </Button>
        ) : null}
      </form>

      <div className="mt-6 flex items-center gap-4 text-text-secondary">
        <span className="h-px flex-1 bg-divider" />
        <span className="text-sm">ou</span>
        <span className="h-px flex-1 bg-divider" />
      </div>

      <div className="mt-5">
        <Link
          to="/register"
          className="inline-flex min-h-16 w-full cursor-pointer items-center justify-center gap-3 rounded-button border border-accent/40 bg-surface px-4 text-lg font-semibold text-text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <UserPlus className="size-5 text-primary" aria-hidden="true" />
          Creer un compte
        </Link>
      </div>

      <p className="mt-5 text-center text-sm text-text-secondary">
        Pas encore de compte ?{" "}
        <Link
          to="/register"
          className="cursor-pointer font-semibold text-primary transition hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          S'inscrire
        </Link>
      </p>
    </Card>
  );
}

function getLoginErrorMessage(error: unknown): string | null {
  if (!error) {
    return null;
  }

  if (error instanceof AxiosError) {
    const response = error.response?.data as IApiResponse<unknown> | undefined;

    if (!error.response) {
      return "L'API est indisponible. Verifiez que le backend est demarre.";
    }

    if (error.response.status === 404) {
      return "La route de connexion est introuvable. Verifiez que l'API /api/v1/auth/login existe.";
    }

    if (error.response.status === 401) {
      return "Adresse e-mail ou mot de passe incorrect.";
    }

    if (error.response.status === 403 && isEmailNotVerifiedError(error)) {
      return "Votre adresse e-mail doit etre validee avant de vous connecter.";
    }

    return (
      response?.message ?? "Connexion impossible. Verifiez vos identifiants."
    );
  }

  return "Connexion impossible. Reessayez dans quelques instants.";
}

function getResendCodeErrorMessage(error: unknown): string | null {
  if (!error) {
    return null;
  }

  if (error instanceof AxiosError) {
    const response = error.response?.data as IApiResponse<unknown> | undefined;

    return response?.message ?? "Impossible de renvoyer un code.";
  }

  return "Impossible de renvoyer un code.";
}

function isEmailNotVerifiedError(error: unknown): boolean {
  if (!(error instanceof AxiosError)) {
    return false;
  }

  const response = error.response?.data as IApiResponse<unknown> | undefined;

  return Boolean(
    error.response?.status === 403 &&
      response?.errors?.some(
        (apiError) =>
          apiError.field === "emailVerification" &&
          apiError.message === "EMAIL_NOT_VERIFIED",
      ),
  );
}
