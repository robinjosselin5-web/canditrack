import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authStore } from '@/store/auth.store'
import { uploadUserAvatar } from '../services'
import { userProfileQueryKey } from './useUserProfile'

export function useUploadUserAvatar() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File) => uploadUserAvatar(file),
    onSuccess: (user) => {
      authStore.updateUser(user)
      queryClient.setQueryData(userProfileQueryKey, user)
    },
  })
}
