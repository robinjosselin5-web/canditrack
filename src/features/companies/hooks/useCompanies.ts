import { useQuery } from '@tanstack/react-query'
import { getCompanies } from '../services'

export function useCompanies() {
  return useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
  })
}
