import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { BarChart3, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Alert, Button, Card, Checkbox, Input } from '@/components/ui'
import type { IApiResponse } from '@/types/api'
import { useRegister } from '../hooks/useRegister'
import type { IRegisterFormValues } from '../types/register.types'
import { registerSchema } from '../utils/registerSchema'

export function RegisterPage() {
  const registerMutation = useRegister()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<IRegisterFormValues>({
    defaultValues: {
      acceptTerms: false,
      confirmPassword: '',
      email: '',
      firstname: '',
      lastname: '',
      password: '',
    },
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (values: IRegisterFormValues) => {
    registerMutation.mutate(values)
  }

  const errorMessage = getRegisterErrorMessage(registerMutation.error)

  return (
    <Card className="mx-auto w-full max-w-[450px]">
      <div className="mb-8 text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-card bg-accent/25 text-primary shadow-small">
          <BarChart3 className="size-9" aria-hidden="true" />
        </div>
        <p className="mt-4 text-2xl font-bold text-text-primary">
          CandiTrack
        </p>
        <h1 className="mt-8 text-3xl font-bold tracking-normal text-text-primary">
          Creer un compte
        </h1>
        <p className="mt-2 text-sm leading-6 text-text-secondary">
          Sauvegardez vos candidatures et accedez a votre espace personnel.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {errorMessage ? <Alert variant="error">{errorMessage}</Alert> : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            aria-label="Prenom"
            autoComplete="given-name"
            error={errors.firstname?.message}
            iconLeft={<UserRound className="size-5" />}
            label="Prenom"
            placeholder="Votre prenom"
            {...register('firstname')}
          />
          <Input
            aria-label="Nom"
            autoComplete="family-name"
            error={errors.lastname?.message}
            iconLeft={<UserRound className="size-5" />}
            label="Nom"
            placeholder="Votre nom"
            {...register('lastname')}
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
          {...register('email')}
        />

        <Input
          aria-label="Mot de passe"
          autoComplete="new-password"
          error={errors.password?.message}
          iconLeft={<LockKeyhole className="size-5" />}
          label="Mot de passe"
          placeholder="Votre mot de passe"
          type="password"
          {...register('password')}
        />

        <Input
          aria-label="Confirmation du mot de passe"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          iconLeft={<LockKeyhole className="size-5" />}
          label="Confirmation"
          placeholder="Confirmez votre mot de passe"
          type="password"
          {...register('confirmPassword')}
        />

        <div>
          <Checkbox
            aria-label="Accepter les conditions d'utilisation"
            label="J'accepte les conditions d'utilisation de CandiTrack."
            {...register('acceptTerms')}
          />
          {errors.acceptTerms?.message ? (
            <p className="mt-2 text-sm text-red-600">
              {errors.acceptTerms.message}
            </p>
          ) : null}
        </div>

        <Button loading={registerMutation.isPending} type="submit">
          Creer mon compte
        </Button>
      </form>

      <div className="mt-8 flex items-center gap-4 text-text-secondary">
        <span className="h-px flex-1 bg-divider" />
        <span className="text-sm">ou</span>
        <span className="h-px flex-1 bg-divider" />
      </div>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Deja un compte ?{' '}
        <Link
          to="/login"
          className="font-semibold text-primary transition hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Se connecter
        </Link>
      </p>
    </Card>
  )
}

function getRegisterErrorMessage(error: unknown): string | null {
  if (!error) {
    return null
  }

  if (error instanceof AxiosError) {
    const response = error.response?.data as IApiResponse<unknown> | undefined

    if (!error.response) {
      return "L'API est indisponible. Verifiez que le backend est demarre."
    }

    if (error.response.status === 404) {
      return "La route d'inscription est introuvable. Verifiez que l'API /api/v1/auth/register existe."
    }

    return (
      response?.message ??
      "Impossible de creer le compte. Verifiez les informations saisies."
    )
  }

  return "Impossible de creer le compte. Reessayez dans quelques instants."
}
