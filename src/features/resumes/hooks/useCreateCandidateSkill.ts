import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCandidateSkill } from '../services/candidateResumeService'
import type { ICreateCandidateSkillPayload } from '../types/candidateResume.types'
import { resumesQueryKeys } from './resumesQueryKeys'

export function useCreateCandidateSkill() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: ICreateCandidateSkillPayload) => createCandidateSkill(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: resumesQueryKeys.profileExtractedData() })
    },
  })
}
