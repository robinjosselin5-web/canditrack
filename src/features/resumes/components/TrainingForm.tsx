import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { CalendarDays, GraduationCap, MapPin } from 'lucide-react'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Alert, Button, Checkbox, Input } from '@/components/ui'
import type { IApiResponse } from '@/types/api'
import type { ICreateCandidateTrainingPayload } from '../types/candidateResume.types'
import {
  trainingSchema,
  type TrainingFormInput,
  type TrainingFormValues,
} from '../validation/trainingSchema'

interface TrainingFormProps {
  initialValues?: TrainingFormInput
  isSubmitting?: boolean
  mode: 'create' | 'update'
  onCancel: () => void
  onSubmit: (values: ICreateCandidateTrainingPayload) => void | Promise<void>
  serverError?: unknown
}

const DEFAULT_VALUES: TrainingFormInput = {
  certificationType: '',
  degree: '',
  description: '',
  endDate: '',
  fieldOfStudy: '',
  isCertification: false,
  location: '',
  organizationName: '',
  startDate: '',
  title: '',
}

export function TrainingForm({
  initialValues,
  isSubmitting = false,
  mode,
  onCancel,
  onSubmit,
  serverError,
}: TrainingFormProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<TrainingFormInput, unknown, TrainingFormValues>({
    defaultValues: initialValues ?? DEFAULT_VALUES,
    resolver: zodResolver(trainingSchema),
  })

  const isCertification = useWatch({ control, name: 'isCertification' })

  useEffect(() => {
    reset(initialValues ?? DEFAULT_VALUES)
  }, [initialValues, reset])

  useEffect(() => {
    applyBackendErrors(serverError, setError)
    // react-hook-form keeps setError stable between renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverError])

  const globalError = getGlobalErrorMessage(serverError)

  const submitForm = (values: TrainingFormValues) => {
    const payload: ICreateCandidateTrainingPayload = {
      ...values,
      certificationType: values.isCertification ? values.certificationType : null,
    }
    return onSubmit(payload)
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(submitForm)}>
      {globalError ? <Alert variant="error">{globalError}</Alert> : null}

      <Input
        aria-label="Titre de la formation"
        autoFocus
        error={errors.title?.message}
        iconLeft={<GraduationCap className="size-5" />}
        label={<>Formation <span className="text-red-600">*</span></>}
        placeholder="Developpement web"
        {...register('title')}
      />

      <Input
        aria-label="Organisme de formation"
        error={errors.organizationName?.message}
        iconLeft={<GraduationCap className="size-5" />}
        label="Organisme de formation"
        placeholder="Universite ou organisme"
        {...register('organizationName')}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input aria-label="Diplome" error={errors.degree?.message} label="Diplome" placeholder="Master" {...register('degree')} />
        <Input aria-label="Domaine d'etudes" error={errors.fieldOfStudy?.message} label="Domaine d'etudes" placeholder="Informatique" {...register('fieldOfStudy')} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input aria-label="Date debut" error={errors.startDate?.message} iconLeft={<CalendarDays className="size-5" />} label="Date debut" placeholder="YYYY ou YYYY-MM" {...register('startDate')} />
        <Input aria-label="Date fin" error={errors.endDate?.message} iconLeft={<CalendarDays className="size-5" />} label="Date fin" placeholder="YYYY ou YYYY-MM" {...register('endDate')} />
      </div>

      <Input aria-label="Description" error={errors.description?.message} label="Description" placeholder="Description de la formation" {...register('description')} />
      <Input aria-label="Ville" error={errors.location?.message} iconLeft={<MapPin className="size-5" />} label="Ville" placeholder="Paris" {...register('location')} />

      <Checkbox label="Cette formation est une certification" {...register('isCertification')} />
      <Input
        aria-label="Type de certification"
        disabled={!isCertification}
        error={errors.certificationType?.message}
        label="Type de certification"
        placeholder="RNCP, TOEIC..."
        {...register('certificationType')}
      />

      <div className="flex gap-3">
        <Button className="w-auto flex-1" disabled={isSubmitting} onClick={onCancel} type="button" variant="secondary">Annuler</Button>
        <Button className="w-auto flex-1" disabled={isSubmitting} loading={isSubmitting} type="submit">
          {isSubmitting ? mode === 'create' ? 'Ajout en cours...' : 'Enregistrement...' : mode === 'create' ? 'Ajouter' : 'Enregistrer les modifications'}
        </Button>
      </div>
    </form>
  )
}

const TRAINING_FIELDS = new Set([
  'title', 'organizationName', 'degree', 'fieldOfStudy', 'startDate',
  'endDate', 'description', 'location', 'isCertification', 'certificationType',
])

function applyBackendErrors(
  error: unknown,
  setError: ReturnType<typeof useForm<TrainingFormInput>>['setError'],
): void {
  if (!(error instanceof AxiosError)) return
  const response = error.response?.data as IApiResponse<unknown> | undefined
  for (const fieldError of response?.errors ?? []) {
    if (fieldError.field && TRAINING_FIELDS.has(fieldError.field)) {
      setError(fieldError.field as keyof TrainingFormInput, { type: 'server', message: fieldError.message })
    }
  }
}

function getGlobalErrorMessage(error: unknown): string | null {
  if (!(error instanceof AxiosError)) return error ? 'Impossible de sauvegarder cette formation.' : null
  const response = error.response?.data as IApiResponse<unknown> | undefined
  const fieldErrors = response?.errors ?? []
  if (fieldErrors.length === 0) return response?.message ?? 'Impossible de sauvegarder cette formation.'
  if (!fieldErrors.some((fieldError) => !fieldError.field || !TRAINING_FIELDS.has(fieldError.field))) return null
  return response?.message ?? 'Impossible de sauvegarder cette formation.'
}
