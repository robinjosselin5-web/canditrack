import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCandidateSkill } from '../services/candidateResumeService'
import { resumesQueryKeys } from './resumesQueryKeys'

export function useDeleteCandidateSkill() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (skillId: string) => deleteCandidateSkill(skillId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: resumesQueryKeys.profileExtractedData() })
    },
  })
}
