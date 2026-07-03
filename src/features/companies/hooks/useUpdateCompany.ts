import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCompany } from '../services/companyService'
import type { IUpdateCompanyPayload } from '../types/company.types'

interface IUpdateCompanyVariables {
  companyId: string
  payload: IUpdateCompanyPayload
}

export function useUpdateCompany() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ companyId, payload }: IUpdateCompanyVariables) =>
      updateCompany(companyId, payload),
    onSuccess: (_company, variables) => {
      void queryClient.invalidateQueries({ queryKey: ['companies'] })
      void queryClient.invalidateQueries({
        queryKey: ['company', variables.companyId],
      })
    },
  })
}
