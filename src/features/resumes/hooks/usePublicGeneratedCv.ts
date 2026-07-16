import { useQuery } from '@tanstack/react-query'
import { getPublicGeneratedCv } from '../services/generatedCvService'
import { resumesQueryKeys } from './resumesQueryKeys'

export function usePublicGeneratedCv(publicId: string) {
  return useQuery({
    queryKey: resumesQueryKeys.publicGeneratedCv(publicId),
    queryFn: () => getPublicGeneratedCv(publicId),
    enabled: Boolean(publicId),
  })
}
