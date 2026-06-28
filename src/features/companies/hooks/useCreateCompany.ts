import { useMutation } from '@tanstack/react-query'
import { createCompany } from '../services'
import type { ICreateCompanyFormValues } from '../types/company.types'

export function useCreateCompany() {
  return useMutation({
    mutationFn: (values: ICreateCompanyFormValues) =>
      createCompany({
        categoryId: values.categoryId || undefined,
        city: values.city || undefined,
        country: values.country || undefined,
        email: values.email || undefined,
        name: values.name,
        phone: values.phone || undefined,
        recruiterName: values.recruiterName || undefined,
        website: values.website || undefined,
      }),
  })
}

