import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCandidateExperience } from '../services/candidateResumeService'
import { resumesQueryKeys } from './resumesQueryKeys'

export function useDeleteCandidateExperience() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (experienceId: string) => deleteCandidateExperience(experienceId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: resumesQueryKeys.profileExtractedData(),
      })
    },
  })
}
