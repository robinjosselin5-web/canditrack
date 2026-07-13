import { useQuery } from '@tanstack/react-query'
import { getProfileExtractedData } from '../services/candidateResumeService'
import { resumesQueryKeys } from './resumesQueryKeys'

export function useProfileExtractedData() {
  return useQuery({
    queryKey: resumesQueryKeys.profileExtractedData(),
    queryFn: getProfileExtractedData,
  })
}
