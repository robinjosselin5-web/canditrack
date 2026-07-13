import { useMutation, useQueryClient } from '@tanstack/react-query'
import { analyzeCandidateCv } from '../services/candidateResumeService'
import { resumesQueryKeys } from './resumesQueryKeys'

export function useAnalyzeCandidateCv() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (cvId: string) => analyzeCandidateCv(cvId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: resumesQueryKeys.all })
    },
  })
}
