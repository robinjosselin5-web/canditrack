import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCandidateTraining } from '../services/candidateResumeService'
import type { ICreateCandidateTrainingPayload } from '../types/candidateResume.types'
import { resumesQueryKeys } from './resumesQueryKeys'

export function useCreateCandidateTraining() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: ICreateCandidateTrainingPayload) => createCandidateTraining(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: resumesQueryKeys.profileExtractedData() })
    },
  })
}
