import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, RotateCw, ShieldCheck } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { Alert, Button, Card, Input } from '@/components/ui'
import { AuthPageHeader } from '../components/AuthPageHeader'
import { useResendEmailVerificationCode } from '../hooks/useResendEmailVerificationCode'
import { useVerifyEmail } from '../hooks/useVerifyEmail'
import type { IEmailVerificationFormValues } from '../types/emailVerification.types'
import { getEmailVerificationErrorMessage } from '../utils/authErrorMessages'
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
    <Card className="mx-auto w-full max-w-140 border-border/80 px-6 py-6 shadow-large sm:px-10 sm:py-8">
      <AuthPageHeader
        description="Saisissez le code recu par e-mail pour activer votre acces."
        title="Valider votre compte"
      />

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
          className="cursor-pointer font-semibold text-primary transition hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Se connecter
        </Link>
      </p>
    </Card>
  )
}
