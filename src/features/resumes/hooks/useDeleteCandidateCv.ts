import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCandidateCv } from '../services/candidateResumeService'
import { resumesQueryKeys } from './resumesQueryKeys'

export function useDeleteCandidateCv() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (cvId: string) => deleteCandidateCv(cvId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: resumesQueryKeys.all })
    },
  })
}
