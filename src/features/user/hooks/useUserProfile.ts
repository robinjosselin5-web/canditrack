import { useQuery } from '@tanstack/react-query'
import { getUserProfile } from '../services'

export const userProfileQueryKey = ['user', 'profile'] as const

export function useUserProfile() {
  return useQuery({
    queryKey: userProfileQueryKey,
    queryFn: getUserProfile,
  })
}
