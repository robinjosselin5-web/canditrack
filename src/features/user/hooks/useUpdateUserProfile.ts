import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authStore } from '@/store/auth.store'
import { updateUserProfile } from '../services'
import type { IProfileFormValues } from '../types/profile.types'
import { userProfileQueryKey } from './useUserProfile'

export function useUpdateUserProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (values: IProfileFormValues) => updateUserProfile(values),
    onSuccess: (user) => {
      authStore.updateUser(user)
      queryClient.setQueryData(userProfileQueryKey, user)
    },
  })
}
