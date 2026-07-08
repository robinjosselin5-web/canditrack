import { useQuery } from '@tanstack/react-query'
import { getCandidateCvs } from '../services/candidateResumeService'
import { resumesQueryKeys } from './resumesQueryKeys'

export function useCandidateCvs() {
  return useQuery({
    queryKey: resumesQueryKeys.all,
    queryFn: getCandidateCvs,
  })
}
