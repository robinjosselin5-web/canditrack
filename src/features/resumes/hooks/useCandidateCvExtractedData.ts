import { useQuery } from '@tanstack/react-query'
import { getCandidateCvExtractedData } from '../services/candidateResumeService'
import { resumesQueryKeys } from './resumesQueryKeys'

export function useCandidateCvExtractedData(cvId: string | undefined) {
  return useQuery({
    queryKey: resumesQueryKeys.extractedData(cvId),
    queryFn: () => {
      if (!cvId) {
        throw new Error('CV id is required.')
      }

      return getCandidateCvExtractedData(cvId)
    },
    enabled: Boolean(cvId),
  })
}
