import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Building2, Globe, Mail, MapPin, Phone, UserRound } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Alert, Button, Input } from '@/components/ui'
import type { IApiResponse } from '@/types/api'
import { useCreateCompany } from '../hooks/useCreateCompany'
import { useUpdateCompany } from '../hooks/useUpdateCompany'
import type {
  ICreateCompanyPayload,
  IUpdateCompanyPayload,
} from '../types/company.types'
import { companySchema } from '../utils/companySchema'

type CompanyFormValues = z.input<typeof companySchema>

interface CompanyFormProps {
  companyId?: string
  initialValues?: CompanyFormValues
  mode?: 'create' | 'update'
  onCancel?: () => void
  onSuccess?: (companyId?: string) => void
}

const defaultValues: CompanyFormValues = {
  city: '',
  country: '',
  email: '',
  name: '',
  phone: '',
  recruiterName: '',
  website: '',
}

export function CompanyForm({
  companyId,
  initialValues,
  mode = 'create',
  onCancel,
  onSuccess,
}: CompanyFormProps) {
  const createCompanyMutation = useCreateCompany()
  const updateCompanyMutation = useUpdateCompany()
  const isUpdateMode = mode === 'update'
  const activeMutation = isUpdateMode ? updateCompanyMutation : createCompanyMutation

  const {
    formState: { errors },
    handleSubmit,
    reset,
    setError,
    register,
  } = useForm<CompanyFormValues, unknown, ICreateCompanyPayload>({
    defaultValues: initialValues ?? defaultValues,
    resolver: zodResolver(companySchema),
  })

  useEffect(() => {
    reset(initialValues ?? defaultValues)
  }, [initialValues, reset])

  const onSubmit = (values: ICreateCompanyPayload) => {
    if (isUpdateMode) {
      if (!companyId) {
        return
      }

      updateCompanyMutation.mutate(
        { companyId, payload: values as IUpdateCompanyPayload },
        {
          onError: (error) => {
            applyBackendErrors(error, setError)
          },
          onSuccess: () => {
            onSuccess?.()
          },
        },
      )
      return
    }

    createCompanyMutation.mutate(values, {
      onError: (error) => {
        applyBackendErrors(error, setError)
      },
      onSuccess: (company) => {
        onSuccess?.(company.id)
      },
    })
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      {activeMutation.isError ? (
        <Alert variant="error">
          Impossible de sauvegarder lentreprise. Verifiez les informations saisies.
        </Alert>
      ) : null}

      <Input
        aria-label="Nom de lentreprise"
        error={errors.name?.message}
        iconLeft={<Building2 className="size-5" />}
        label={
          <>
            Nom de l&apos;entreprise <span className="text-red-600">*</span>
          </>
        }
        placeholder="Nom de lentreprise"
        {...register('name')}
      />

      <Input
        aria-label="Site web"
        error={errors.website?.message}
        iconLeft={<Globe className="size-5" />}
        label={
          <>
            Site web <span className="text-red-600">*</span>
          </>
        }
        placeholder="https://..."
        {...register('website')}
      />

      <Input
        aria-label="Adresse e-mail"
        error={errors.email?.message}
        iconLeft={<Mail className="size-5" />}
        label={
          <>
            Adresse e-mail <span className="text-red-600">*</span>
          </>
        }
        placeholder="contact@entreprise.com"
        type="email"
        {...register('email')}
      />

      <Input
        aria-label="Telephone"
        error={errors.phone?.message}
        iconLeft={<Phone className="size-5" />}
        label="Telephone"
        placeholder="01 23 45 67 89"
        {...register('phone')}
      />

      <Input
        aria-label="Ville"
        error={errors.city?.message}
        iconLeft={<MapPin className="size-5" />}
        label="Ville"
        placeholder="Paris"
        {...register('city')}
      />

      <Input
        aria-label="Pays"
        error={errors.country?.message}
        iconLeft={<MapPin className="size-5" />}
        label="Pays"
        placeholder="France"
        {...register('country')}
      />

      <Input
        aria-label="Nom du recruteur"
        error={errors.recruiterName?.message}
        iconLeft={<UserRound className="size-5" />}
        label="Recruteur"
        placeholder="Nom du recruteur"
        {...register('recruiterName')}
      />

      <div className="flex gap-3">
        {onCancel ? (
          <Button className="w-auto flex-1" onClick={onCancel} type="button" variant="secondary">
            Annuler
          </Button>
        ) : null}
        <Button
          className="w-auto flex-1"
          loading={activeMutation.isPending}
          type="submit"
        >
          {isUpdateMode ? 'Enregistrer' : 'Créer'}
        </Button>
      </div>
    </form>
  )
}

function applyBackendErrors(
  error: unknown,
  setError: ReturnType<typeof useForm<CompanyFormValues>>['setError'],
): void {
  if (!(error instanceof AxiosError)) {
    return
  }

  const response = error.response?.data as IApiResponse<unknown> | undefined
  const fieldErrors = response?.errors ?? []

  for (const fieldError of fieldErrors) {
    if (
      fieldError.field === 'name' ||
      fieldError.field === 'website' ||
      fieldError.field === 'email' ||
      fieldError.field === 'phone' ||
      fieldError.field === 'city' ||
      fieldError.field === 'country' ||
      fieldError.field === 'recruiterName'
    ) {
      setError(fieldError.field, {
        type: 'server',
        message: fieldError.message,
      })
    }
  }
}
