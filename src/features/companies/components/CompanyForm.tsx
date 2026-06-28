import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Building2, Globe, Mail, MapPin, Phone, UserRound } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Alert, Button, Input } from '@/components/ui'
import type { IApiResponse } from '@/types/api'
import { useCreateCompany } from '../hooks/useCreateCompany'
import type { ICreateCompanyPayload } from '../types/company.types'
import { companySchema } from '../utils/companySchema'

export function CompanyForm() {
  const createCompanyMutation = useCreateCompany()
  const {
    formState: { errors },
    handleSubmit,
    setError,
    register,
  } = useForm<z.input<typeof companySchema>, unknown, ICreateCompanyPayload>({
    defaultValues: {
      city: '',
      country: '',
      email: '',
      name: '',
      phone: '',
      recruiterName: '',
      website: '',
    },
    resolver: zodResolver(companySchema),
  })

  const onSubmit = (values: ICreateCompanyPayload) => {
    createCompanyMutation.mutate(values, {
      onError: (error) => {
        applyBackendErrors(error, setError)
      },
    })
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      {createCompanyMutation.isError ? (
        <Alert variant="error">
          Impossible de creer lentreprise. Verifiez les informations saisies.
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

      <Button loading={createCompanyMutation.isPending} type="submit">
        Créer
      </Button>
    </form>
  )
}

function applyBackendErrors(
  error: unknown,
  setError: ReturnType<typeof useForm<ICreateCompanyPayload>>['setError'],
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

