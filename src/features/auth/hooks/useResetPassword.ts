import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import type { IResetPasswordFormValues } from '../types/passwordReset.types'
import { resetPassword } from '../services'

export function useResetPassword(token: string) {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (values: IResetPasswordFormValues) =>
      resetPassword({
        token,
        password: values.password,
      }),
    onSuccess: () => {
      navigate('/login', { replace: true })
    },
  })
}
