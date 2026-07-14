import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCandidateTraining } from '../services/candidateResumeService'
import type { IUpdateCandidateTrainingPayload } from '../types/candidateResume.types'
import { resumesQueryKeys } from './resumesQueryKeys'

interface IUpdateCandidateTrainingVariables {
  trainingId: string
  payload: IUpdateCandidateTrainingPayload
}

export function useUpdateCandidateTraining() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ trainingId, payload }: IUpdateCandidateTrainingVariables) => updateCandidateTraining(trainingId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: resumesQueryKeys.profileExtractedData() })
    },
  })
}
