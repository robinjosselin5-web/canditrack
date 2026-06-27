import { useMutation } from '@tanstack/react-query'
import type { IForgotPasswordFormValues } from '../types/passwordReset.types'
import { requestPasswordReset } from '../services'

export function useForgotPassword() {
  return useMutation({
    mutationFn: (values: IForgotPasswordFormValues) =>
      requestPasswordReset({
        email: values.email,
      }),
  })
}
