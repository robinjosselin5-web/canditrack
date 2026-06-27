import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authStore } from '@/store/auth.store'
import type { IRegisterFormValues } from '../types/register.types'
import { registerUser } from '../services'

export function useRegister() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (values: IRegisterFormValues) =>
      registerUser({
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
      }),
    onSuccess: (session) => {
      authStore.setSession(session)
      navigate('/dashboard', { replace: true })
    },
  })
}
