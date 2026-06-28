import { useQuery } from '@tanstack/react-query'
import { getCompany } from '../services/companyService'

export function useCompany(companyId: string | undefined) {
  return useQuery({
    queryKey: ['company', companyId],
    queryFn: () => {
      if (!companyId) {
        throw new Error('Company id is required.')
      }

      return getCompany(companyId)
    },
    enabled: Boolean(companyId),
  })
}
