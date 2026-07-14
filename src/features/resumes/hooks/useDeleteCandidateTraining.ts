import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCandidateTraining } from '../services/candidateResumeService'
import { resumesQueryKeys } from './resumesQueryKeys'

export function useDeleteCandidateTraining() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (trainingId: string) => deleteCandidateTraining(trainingId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: resumesQueryKeys.profileExtractedData() })
    },
  })
}
