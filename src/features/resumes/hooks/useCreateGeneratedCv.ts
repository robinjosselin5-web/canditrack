import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createGeneratedCv,
} from '../services/generatedCvService'
import type { ICreateGeneratedCvPayload } from '../types/generatedCv.types'
import { resumesQueryKeys } from './resumesQueryKeys'

export function useCreateGeneratedCv() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: ICreateGeneratedCvPayload) =>
      createGeneratedCv(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: resumesQueryKeys.generatedCvs(),
      })
    },
  })
}
