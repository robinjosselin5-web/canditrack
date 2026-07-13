import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCandidateCv } from '../services/candidateResumeService'
import { resumesQueryKeys } from './resumesQueryKeys'

export interface ICreateCandidateCvVariables {
  file: File
  label?: string
}

export function useCreateCandidateCv() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: ICreateCandidateCvVariables) =>
      createCandidateCv(variables),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: resumesQueryKeys.all })
    },
  })
}
