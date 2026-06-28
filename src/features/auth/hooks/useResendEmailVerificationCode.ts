import { useMutation } from '@tanstack/react-query'
import { resendEmailVerificationCode } from '../services'

export function useResendEmailVerificationCode() {
  return useMutation({
    mutationFn: (email: string) =>
      resendEmailVerificationCode({
        email,
      }),
  })
}
