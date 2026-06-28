import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCompany } from '../services'
import type { ICreateCompanyPayload } from '../types/company.types'

export function useCreateCompany() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (values: ICreateCompanyPayload) => createCompany(values),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['companies'] })
    },
  })
}

