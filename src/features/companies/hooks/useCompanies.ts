import { useQuery } from '@tanstack/react-query'
import { getCompanies } from '../services/companyService'

export function useCompanies() {
  return useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
  })
}
