import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCandidateExperience } from '../services/candidateResumeService'
import type { IUpdateCandidateExperiencePayload } from '../types/candidateResume.types'
import { resumesQueryKeys } from './resumesQueryKeys'

interface IUpdateCandidateExperienceVariables {
  experienceId: string
  payload: IUpdateCandidateExperiencePayload
}

export function useUpdateCandidateExperience() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ experienceId, payload }: IUpdateCandidateExperienceVariables) =>
      updateCandidateExperience(experienceId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: resumesQueryKeys.profileExtractedData(),
      })
    },
  })
}
