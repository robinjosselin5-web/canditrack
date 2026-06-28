import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Mail, RotateCw, ShieldCheck } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { BrandLogoLink } from '@/components/BrandLogoLink'
import { Alert, Button, Card, Input } from '@/components/ui'
import type { IApiResponse } from '@/types/api'
import { useResendEmailVerificationCode } from '../hooks/useResendEmailVerificationCode'
import { useVerifyEmail } from '../hooks/useVerifyEmail'
import type { IEmailVerificationFormValues } from '../types/emailVerification.types'
import { emailVerificationSchema } from '../utils/emailVerificationSchema'

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const verifyEmailMutation = useVerifyEmail()
  const resendCodeMutation = useResendEmailVerificationCode()
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
  } = useForm<IEmailVerificationFormValues>({
    defaultValues: {
      code: '',
      email: searchParams.get('email') ?? '',
    },
    resolver: zodResolver(emailVerificationSchema),
  })

  const onSubmit = (values: IEmailVerificationFormValues) => {
    verifyEmailMutation.mutate(values)
  }

  const onResendCode = () => {
    const email = getValues('email')

    if (email) {
      resendCodeMutation.mutate(email)
    }
  }

  const errorMessage = getEmailVerificationErrorMessage(
    verifyEmailMutation.error ?? resendCodeMutation.error,
  )

  return (
    <Card className="mx-auto w-full max-w-[560px] border-border/80 px-6 py-6 shadow-large sm:px-10 sm:py-8">
      <div className="mb-6 text-center">
        <BrandLogoLink variant="stacked" />
        <h1 className="mt-6 text-3xl font-bold tracking-normal text-text-primary">
          Valider votre compte
        </h1>
        <p className="mt-3 text-base leading-7 text-text-secondary">
          Saisissez le code recu par e-mail pour activer votre acces.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {errorMessage ? <Alert variant="error">{errorMessage}</Alert> : null}
        {resendCodeMutation.isSuccess ? (
          <Alert variant="success">Un nouveau code vient d'etre envoye.</Alert>
        ) : null}

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
          aria-label="Code de validation"
          autoComplete="one-time-code"
          error={errors.code?.message}
          iconLeft={<ShieldCheck className="size-5" />}
          label="Code"
          maxLength={5}
          placeholder="A1B2C"
          {...register('code')}
        />

        <Button
          className="min-h-14 text-base shadow-large"
          loading={verifyEmailMutation.isPending}
          type="submit"
        >
          <ShieldCheck className="size-5" aria-hidden="true" />
          Valider mon compte
        </Button>

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
      </form>

      <p className="mt-5 text-center text-sm text-text-secondary">
        Compte deja valide ?{' '}
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

function getEmailVerificationErrorMessage(error: unknown): string | null {
  if (!error) {
    return null
  }

  if (error instanceof AxiosError) {
    const response = error.response?.data as IApiResponse<unknown> | undefined

    if (!error.response) {
      return "L'API est indisponible. Verifiez que le backend est demarre."
    }

    return (
      response?.message ??
      'Impossible de valider le compte. Verifiez le code saisi.'
    )
  }

  return 'Impossible de valider le compte. Reessayez dans quelques instants.'
}
