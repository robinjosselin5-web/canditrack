import { useMutation } from '@tanstack/react-query'
import { createCompany } from '../services'
import type { ICreateCompanyPayload } from '../types/company.types'

export function useCreateCompany() {
  return useMutation({
    mutationFn: (values: ICreateCompanyPayload) => createCompany(values),
  })
}

