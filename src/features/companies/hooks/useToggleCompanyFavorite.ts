import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCompanyFavorite } from '../services/companyService'
import type { ICompanyListItem } from '../types/company.types'

interface IToggleFavoriteVariables {
  companyId: string
  isFavorite: boolean
}

export function useToggleCompanyFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ companyId, isFavorite }: IToggleFavoriteVariables) =>
      updateCompanyFavorite(companyId, { isFavorite }),
    onMutate: async ({ companyId, isFavorite }) => {
      await queryClient.cancelQueries({ queryKey: ['companies'] })

      const previousCompanies = queryClient.getQueryData<ICompanyListItem[]>([
        'companies',
      ])

      queryClient.setQueryData<ICompanyListItem[]>(
        ['companies'],
        (currentCompanies) =>
          currentCompanies?.map((company) =>
            company.id === companyId
              ? {
                  ...company,
                  isFavorite,
                }
              : company,
          ) ?? currentCompanies,
      )

      return { previousCompanies }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousCompanies) {
        queryClient.setQueryData(['companies'], context.previousCompanies)
      }
    },
    onSuccess: (_data, variables) => {
      queryClient.setQueryData<ICompanyListItem[]>(
        ['companies'],
        (currentCompanies) =>
          currentCompanies?.map((company) =>
            company.id === variables.companyId
              ? {
                  ...company,
                  isFavorite: variables.isFavorite,
                }
              : company,
          ) ?? currentCompanies,
      )
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['companies'] })
    },
  })
}
