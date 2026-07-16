import { useQuery } from '@tanstack/react-query'
import { getGeneratedCv } from '../services/generatedCvService'
import { resumesQueryKeys } from './resumesQueryKeys'

export function useGeneratedCv(generatedCvId: string) {
  return useQuery({
    queryKey: resumesQueryKeys.generatedCv(generatedCvId),
    queryFn: () => getGeneratedCv(generatedCvId),
    enabled: Boolean(generatedCvId),
  })
}
