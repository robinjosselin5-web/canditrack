import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Input } from '@/components/ui'
import type { ICreateCandidateSkillPayload, CvSkillCategory } from '../types/candidateResume.types'
import { formatCvSkillCategory } from '../utils/candidateCvHelpers'
import { applySkillFormBackendErrors, getSkillFormGlobalErrorMessage } from '../utils/skillHelpers'
import { skillSchema, type SkillFormInput, type SkillFormValues } from '../validation/skillSchema'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface SkillFormProps {
  category: CvSkillCategory
  onSubmit: (values: ICreateCandidateSkillPayload) => void | Promise<void>
  onCancel: () => void
  isSubmitting?: boolean
  serverError?: unknown
}

export function SkillForm({ category, onSubmit, onCancel, isSubmitting = false, serverError }: SkillFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<SkillFormInput, unknown, SkillFormValues>({
    defaultValues: { name: '', category },
    resolver: zodResolver(skillSchema),
  })

  useEffect(() => {
    reset({ name: '', category })
  }, [category, reset])

  useEffect(() => {
    applySkillFormBackendErrors(serverError, setError)
    // react-hook-form keeps setError stable between renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverError])

  const submitForm = (values: SkillFormValues) => onSubmit(values)

  const globalError = getSkillFormGlobalErrorMessage(serverError)

  return (
    <form className="space-y-5" onSubmit={handleSubmit(submitForm)}>
      {globalError ? <Alert variant="error">{globalError}</Alert> : null}
      <Input aria-label="Nom de la competence" autoFocus error={errors.name?.message} label="Competence" placeholder="TypeScript" {...register('name')} />
      <input type="hidden" {...register('category')} value={category} readOnly />
      <div className="rounded-input border border-border bg-divider px-4 py-3 text-sm text-text-secondary">
        <span className="font-semibold text-text-primary">Categorie :</span> {formatCvSkillCategory(category)}
      </div>
      <div className="flex gap-3">
        <Button className="w-auto flex-1" disabled={isSubmitting} onClick={onCancel} type="button" variant="secondary">Annuler</Button>
        <Button className="w-auto flex-1" disabled={isSubmitting} loading={isSubmitting} type="submit">{isSubmitting ? 'Ajout en cours...' : 'Ajouter'}</Button>
      </div>
    </form>
  )
}
