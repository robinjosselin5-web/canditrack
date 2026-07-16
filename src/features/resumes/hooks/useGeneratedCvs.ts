import { useQuery } from '@tanstack/react-query'
import { getGeneratedCvs } from '../services/generatedCvService'
import { resumesQueryKeys } from './resumesQueryKeys'

export function useGeneratedCvs() {
  return useQuery({
    queryKey: resumesQueryKeys.generatedCvs(),
    queryFn: getGeneratedCvs,
  })
}
