import type { ICompanyListItem } from '../types/company.types'
import type { StatusFilter } from '../components/CompaniesFilters'
import type { SortOrder } from '../components/CompaniesFilters'

interface IFilterCompaniesParams {
  companies: ICompanyListItem[]
  searchQuery: string
  showFavoritesOnly: boolean
  sortOrder: SortOrder
  statusFilter: StatusFilter
}

export function filterCompanies({
  companies,
  searchQuery,
  showFavoritesOnly,
  sortOrder,
  statusFilter,
}: IFilterCompaniesParams): ICompanyListItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase()

  return [...companies]
    .filter((company) => !showFavoritesOnly || company.isFavorite)
    .filter((company) => statusFilter === 'all' || company.status === statusFilter)
    .filter((company) => {
      if (!normalizedQuery) {
        return true
      }

      const searchText = [
        company.name,
        company.website,
        company.email,
        company.city,
        company.country,
        company.recruiterName,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return searchText.includes(normalizedQuery)
    })
    .sort((firstCompany, secondCompany) => {
      const firstDate = new Date(firstCompany.createdAt).getTime()
      const secondDate = new Date(secondCompany.createdAt).getTime()

      return sortOrder === 'asc' ? firstDate - secondDate : secondDate - firstDate
    })
}
