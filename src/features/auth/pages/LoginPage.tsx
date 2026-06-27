import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { BarChart3, LockKeyhole, LogIn, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Alert, Button, Card, Checkbox, Input } from '@/components/ui'
import type { IApiResponse } from '@/types/api'
import { useLogin } from '../hooks/useLogin'
import type { ILoginFormValues } from '../types/login.types'
import { loginSchema } from '../utils/loginSchema'

export function LoginPage() {
  const loginMutation = useLogin()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ILoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (values: ILoginFormValues) => {
    loginMutation.mutate(values)
  }

  const errorMessage = getLoginErrorMessage(loginMutation.error)

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
          Connexion
        </h1>
        <p className="mt-2 text-sm leading-6 text-text-secondary">
          Bienvenue ! Connectez-vous a votre compte.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {errorMessage ? <Alert variant="error">{errorMessage}</Alert> : null}

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
          autoComplete="current-password"
          error={errors.password?.message}
          iconLeft={<LockKeyhole className="size-5" />}
          label="Mot de passe"
          placeholder="Votre mot de passe"
          type="password"
          {...register('password')}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Checkbox
            aria-label="Se souvenir de moi"
            label="Se souvenir de moi"
            {...register('rememberMe')}
          />
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-primary transition hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Mot de passe oublie ?
          </Link>
        </div>

        <Button loading={loginMutation.isPending} type="submit">
          <LogIn className="size-4" aria-hidden="true" />
          Se connecter
        </Button>
      </form>

      <div className="mt-8 flex items-center gap-4 text-text-secondary">
        <span className="h-px flex-1 bg-divider" />
        <span className="text-sm">ou</span>
        <span className="h-px flex-1 bg-divider" />
      </div>

      <div className="mt-6">
        <Link
          to="/register"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-button border border-border bg-surface px-4 text-sm font-semibold text-text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Creer un compte
        </Link>
      </div>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Pas encore de compte ?{' '}
        <Link
          to="/register"
          className="font-semibold text-primary transition hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          S'inscrire
        </Link>
      </p>
    </Card>
  )
}

function getLoginErrorMessage(error: unknown): string | null {
  if (!error) {
    return null
  }

  if (error instanceof AxiosError) {
    const response = error.response?.data as IApiResponse<unknown> | undefined

    if (!error.response) {
      return "L'API est indisponible. Verifiez que le backend est demarre."
    }

    if (error.response.status === 404) {
      return "La route de connexion est introuvable. Verifiez que l'API /api/v1/auth/login existe."
    }

    if (error.response.status === 401) {
      return 'Adresse e-mail ou mot de passe incorrect.'
    }

    return response?.message ?? 'Connexion impossible. Verifiez vos identifiants.'
  }

  return 'Connexion impossible. Reessayez dans quelques instants.'
}
