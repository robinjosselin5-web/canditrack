import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert, Button, Card, Checkbox, Input, Modal } from "@/components/ui";
import { AuthPageHeader } from "../components/AuthPageHeader";
import { useRegister } from "../hooks/useRegister";
import type { IRegisterFormValues } from "../types/register.types";
import { getRegisterErrorMessage } from "../utils/authErrorMessages";
import { registerSchema } from "../utils/registerSchema";

export function RegisterPage() {
  const registerMutation = useRegister();
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<IRegisterFormValues>({
    defaultValues: {
      acceptTerms: false,
      confirmPassword: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (values: IRegisterFormValues) => {
    registerMutation.mutate(values);
  };

  const errorMessage = getRegisterErrorMessage(registerMutation.error);

  return (
    <>
      <Card className="mx-auto w-full max-w-160 border-border/80 px-6 py-5 shadow-large sm:px-8 sm:py-6">
        <AuthPageHeader
          description="Sauvegardez vos candidatures et accedez a votre espace personnel."
          title="Creer un compte"
        />

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {errorMessage ? <Alert variant="error">{errorMessage}</Alert> : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              aria-label="Prenom"
              autoComplete="given-name"
              error={errors.firstname?.message}
              iconLeft={<UserRound className="size-5" />}
              label="Prenom"
              placeholder="Votre prenom"
              {...register("firstname")}
            />
            <Input
              aria-label="Nom"
              autoComplete="family-name"
              error={errors.lastname?.message}
              iconLeft={<UserRound className="size-5" />}
              label="Nom"
              placeholder="Votre nom"
              {...register("lastname")}
            />
          </div>

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

          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              aria-label="Mot de passe"
              autoComplete="new-password"
              error={errors.password?.message}
              iconLeft={<LockKeyhole className="size-5" />}
              label="Mot de passe"
              placeholder="Votre mot de passe"
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
          </div>

          <div>
            <Checkbox
              aria-label="Accepter les conditions d'utilisation"
              label="J'accepte les conditions d'utilisation de CandiTrack."
              {...register("acceptTerms")}
            />
            <button
              className="mt-2 cursor-pointer text-sm font-semibold text-primary transition hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onClick={() => setIsTermsModalOpen(true)}
              type="button"
            >
              Lire les conditions d'utilisation de CandiTrack
            </button>
            {errors.acceptTerms?.message ? (
              <p className="mt-2 text-sm text-red-600">
                {errors.acceptTerms.message}
              </p>
            ) : null}
          </div>

          <Button
            className="min-h-12 text-base shadow-large"
            loading={registerMutation.isPending}
            type="submit"
          >
            Creer mon compte
          </Button>
        </form>

        <div className="mt-4 flex items-center gap-4 text-text-secondary">
          <span className="h-px flex-1 bg-divider" />
          <span className="text-sm">ou</span>
          <span className="h-px flex-1 bg-divider" />
        </div>

        <p className="mt-4 text-center text-sm text-text-secondary">
          Deja un compte ?{" "}
          <Link
            to="/login"
            className="cursor-pointer font-semibold text-primary transition hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Se connecter
          </Link>
        </p>
      </Card>

      <Modal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        title="Conditions d'utilisation de CandiTrack"
      >
        <p>
          Un contenu de conditions d'utilisation sera ajoute prochainement.
          Cette section expliquera les regles applicables a la creation du
          compte, a l'utilisation du service et a la gestion des donnees de
          candidature.
        </p>
      </Modal>
    </>
  );
}
