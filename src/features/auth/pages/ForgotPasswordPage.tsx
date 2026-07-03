import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert, Button, Card, Input } from "@/components/ui";
import { AuthPageHeader } from "../components/AuthPageHeader";
import { useForgotPassword } from "../hooks/useForgotPassword";
import type { IForgotPasswordFormValues } from "../types/passwordReset.types";
import { getForgotPasswordErrorMessage } from "../utils/authErrorMessages";
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
      <AuthPageHeader
        description="Saisissez votre adresse e-mail pour recevoir un lien securise."
        title="Mot de passe oublie"
      />

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
