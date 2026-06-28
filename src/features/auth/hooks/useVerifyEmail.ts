import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authStore } from '@/store/auth.store'
import type { IEmailVerificationFormValues } from '../types/emailVerification.types'
import { verifyEmail } from '../services'

export function useVerifyEmail() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (values: IEmailVerificationFormValues) =>
      verifyEmail({
        code: values.code,
        email: values.email,
      }),
    onSuccess: (session) => {
      authStore.setSession(session)
      navigate('/dashboard', { replace: true })
    },
  })
}
