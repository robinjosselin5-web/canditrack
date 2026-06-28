import { zodResolver } from '@hookform/resolvers/zod'
import { Building2, Globe, Mail, MapPin, Phone, UserRound } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Alert, Button, Input } from '@/components/ui'
import { useCreateCompany } from '../hooks/useCreateCompany'
import type { ICreateCompanyFormValues } from '../types/company.types'
import { companySchema } from '../utils/companySchema'

export function CompanyForm() {
  const createCompanyMutation = useCreateCompany()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ICreateCompanyFormValues>({
    defaultValues: {
      categoryId: '',
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

  const onSubmit = (values: ICreateCompanyFormValues) => {
    createCompanyMutation.mutate(values)
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
        label="Nom"
        placeholder="Nom de lentreprise"
        {...register('name')}
      />

      <Input
        aria-label="Site web"
        error={errors.website?.message}
        iconLeft={<Globe className="size-5" />}
        label="Site web"
        placeholder="https://..."
        {...register('website')}
      />

      <Input
        aria-label="Adresse e-mail"
        error={errors.email?.message}
        iconLeft={<Mail className="size-5" />}
        label="Email"
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
        aria-label="Categorie"
        error={errors.categoryId?.message}
        iconLeft={<Building2 className="size-5" />}
        label="Categorie"
        placeholder="UUID de la categorie"
        {...register('categoryId')}
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
        Ajouter lentreprise
      </Button>
    </form>
  )
}

