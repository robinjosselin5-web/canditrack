import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCandidateExperience } from '../services/candidateResumeService'
import type { ICreateCandidateExperiencePayload } from '../types/candidateResume.types'
import { resumesQueryKeys } from './resumesQueryKeys'

export function useCreateCandidateExperience() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: ICreateCandidateExperiencePayload) =>
      createCandidateExperience(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: resumesQueryKeys.profileExtractedData(),
      })
    },
  })
}
