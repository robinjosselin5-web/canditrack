import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { BriefcaseBusiness, CalendarDays, MapPin } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Button, Input } from '@/components/ui'
import type { IApiResponse } from '@/types/api'
import {
  experienceSchema,
  type ExperienceFormInput,
  type ExperienceFormValues,
} from '../validation/experienceSchema'

interface ExperienceFormProps {
  initialValues?: ExperienceFormInput
  isSubmitting?: boolean
  mode: 'create' | 'update'
  onCancel: () => void
  onSubmit: (values: ExperienceFormValues) => void | Promise<void>
  serverError?: unknown
}

const DEFAULT_VALUES: ExperienceFormInput = {
  companyName: '',
  endDate: '',
  jobTitle: '',
  location: '',
  startDate: '',
}

export function ExperienceForm({
  initialValues,
  isSubmitting = false,
  mode,
  onCancel,
  onSubmit,
  serverError,
}: ExperienceFormProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<ExperienceFormInput, unknown, ExperienceFormValues>({
    defaultValues: initialValues ?? DEFAULT_VALUES,
    resolver: zodResolver(experienceSchema),
  })

  useEffect(() => {
    reset(initialValues ?? DEFAULT_VALUES)
  }, [initialValues, reset])

  useEffect(() => {
    applyBackendErrors(serverError, setError)
    // react-hook-form keeps setError stable between renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverError])

  const globalError = getGlobalErrorMessage(serverError)

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      {globalError ? <Alert variant="error">{globalError}</Alert> : null}

      <Input
        aria-label="Poste"
        autoFocus
        error={errors.jobTitle?.message}
        iconLeft={<BriefcaseBusiness className="size-5" />}
        label={
          <>
            Poste <span className="text-red-600">*</span>
          </>
        }
        placeholder="Developpeur web"
        {...register('jobTitle')}
      />

      <Input
        aria-label="Nom entreprise"
        error={errors.companyName?.message}
        iconLeft={<BriefcaseBusiness className="size-5" />}
        label="Nom entreprise"
        placeholder="Nom de l'entreprise"
        {...register('companyName')}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          aria-label="Date debut"
          error={errors.startDate?.message}
          iconLeft={<CalendarDays className="size-5" />}
          label="Date debut"
          placeholder="YYYY ou YYYY-MM"
          {...register('startDate')}
        />
        <Input
          aria-label="Date fin"
          error={errors.endDate?.message}
          iconLeft={<CalendarDays className="size-5" />}
          label="Date fin"
          placeholder="YYYY ou YYYY-MM"
          {...register('endDate')}
        />
      </div>

      <Input
        aria-label="Ville"
        error={errors.location?.message}
        iconLeft={<MapPin className="size-5" />}
        label="Ville"
        placeholder="Paris"
        {...register('location')}
      />

      <div className="flex gap-3">
        <Button
          className="w-auto flex-1"
          disabled={isSubmitting}
          onClick={onCancel}
          type="button"
          variant="secondary"
        >
          Annuler
        </Button>
        <Button
          className="w-auto flex-1"
          disabled={isSubmitting}
          loading={isSubmitting}
          type="submit"
        >
          {isSubmitting
            ? mode === 'create'
              ? 'Ajout en cours...'
              : 'Enregistrement...'
            : mode === 'create'
              ? 'Ajouter'
              : 'Enregistrer les modifications'}
        </Button>
      </div>
    </form>
  )
}

const EXPERIENCE_FIELDS = new Set([
  'jobTitle',
  'companyName',
  'startDate',
  'endDate',
  'location',
])

function applyBackendErrors(
  error: unknown,
  setError: ReturnType<typeof useForm<ExperienceFormInput>>['setError'],
): void {
  if (!(error instanceof AxiosError)) {
    return
  }

  const response = error.response?.data as IApiResponse<unknown> | undefined

  for (const fieldError of response?.errors ?? []) {
    if (fieldError.field && EXPERIENCE_FIELDS.has(fieldError.field)) {
      setError(fieldError.field as keyof ExperienceFormInput, {
        type: 'server',
        message: fieldError.message,
      })
    }
  }
}

function getGlobalErrorMessage(error: unknown): string | null {
  if (!(error instanceof AxiosError)) {
    return error ? 'Impossible de sauvegarder cette experience.' : null
  }

  const response = error.response?.data as IApiResponse<unknown> | undefined
  const fieldErrors = response?.errors ?? []

  if (fieldErrors.length === 0) {
    return response?.message ?? 'Impossible de sauvegarder cette experience.'
  }

  const hasGlobalError = fieldErrors.some(
    (fieldError) =>
      !fieldError.field || !EXPERIENCE_FIELDS.has(fieldError.field),
  )

  if (!hasGlobalError) {
    return null
  }

  return response?.message ?? 'Impossible de sauvegarder cette experience.'
}
