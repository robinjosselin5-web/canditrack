import { ChevronDown, Heart, Search } from 'lucide-react'

export type StatusFilter = 'all' | 'accepted' | 'draft' | 'follow_up' | 'interview' | 'no_response' | 'pending' | 'rejected'
export type SortOrder = 'desc' | 'asc'

const statusFilterLabels: Record<StatusFilter, string> = {
  accepted: 'Acceptée',
  all: 'Tous',
  draft: 'Brouillon',
  follow_up: 'À relancer',
  interview: 'Entretien',
  no_response: 'Sans réponse',
  pending: 'En attente',
  rejected: 'Refusée',
}

const sortOrderLabels: Record<SortOrder, string> = {
  asc: 'Plus anciennes',
  desc: 'Plus recentes',
}

interface SearchFieldProps {
  searchQuery: string
  setSearchQuery: (value: string) => void
}

interface StatusSelectProps {
  compact?: boolean
  statusFilter: StatusFilter
  setStatusFilter: (status: StatusFilter) => void
}

interface FavoriteFilterButtonProps {
  compact?: boolean
  isActive: boolean
  onClick: () => void
}

interface SortOrderSelectProps {
  compact?: boolean
  sortOrder: SortOrder
  setSortOrder: (value: SortOrder) => void
}

export function SearchField({ searchQuery, setSearchQuery }: SearchFieldProps) {
  return (
    <label className="relative block lg:w-95">
      <span className="sr-only">Rechercher une entreprise</span>
      <Search
        className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-text-secondary"
        aria-hidden="true"
      />
      <input
        aria-label="Rechercher une entreprise"
        className="min-h-14 w-full rounded-input border border-border bg-surface py-3 pl-14 pr-4 text-base text-text-primary shadow-small outline-none transition placeholder:text-placeholder focus:border-primary focus:ring-2 focus:ring-primary/20 lg:text-sm"
        placeholder="Rechercher une entreprise..."
        value={searchQuery}
        onChange={(event) => {
          setSearchQuery(event.target.value)
        }}
      />
    </label>
  )
}

export function StatusSelect({
  compact = false,
  statusFilter,
  setStatusFilter,
}: StatusSelectProps) {
  return (
    <label className={compact ? 'relative flex-1' : 'relative lg:w-52'}>
      <span className="sr-only">Filtrer par statut</span>
      <select
        className="min-h-12 w-full cursor-pointer appearance-none rounded-input border border-border bg-surface px-4 pr-10 text-base font-semibold text-text-primary shadow-small outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 lg:min-h-14 lg:text-sm"
        value={statusFilter}
        onChange={(event) => {
          setStatusFilter(event.target.value as StatusFilter)
        }}
      >
        {Object.entries(statusFilterLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {compact && value === 'all' ? 'Statut' : `Statut : ${label}`}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-text-secondary"
        aria-hidden="true"
      />
    </label>
  )
}

export function FavoriteFilterButton({
  compact = false,
  isActive,
  onClick,
}: FavoriteFilterButtonProps) {
  return (
    <button
      aria-label="Filtrer les favoris"
      aria-pressed={isActive}
      className={[
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-input border shadow-small transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        compact
          ? 'size-12 shrink-0'
          : 'hidden min-h-14 px-5 text-sm font-semibold lg:inline-flex',
        isActive
          ? 'border-red-200 bg-red-50 text-red-600'
          : 'border-border bg-surface text-text-primary hover:bg-divider',
      ].join(' ')}
      onClick={onClick}
      type="button"
    >
      <Heart
        className={[
          compact ? 'size-5' : 'size-4',
          isActive ? 'fill-current' : '',
        ].join(' ')}
        aria-hidden="true"
      />
      {compact ? <span className="sr-only">Favoris</span> : 'Favoris'}
    </button>
  )
}

export function SortOrderSelect({
  compact = false,
  sortOrder,
  setSortOrder,
}: SortOrderSelectProps) {
  return (
    <label className={compact ? 'relative flex-1' : 'relative lg:w-52'}>
      <span className="sr-only">Trier les entreprises</span>
      <select
        className="min-h-12 w-full cursor-pointer appearance-none rounded-input border border-border bg-surface px-4 pr-10 text-base font-semibold text-text-primary shadow-small outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 lg:min-h-14 lg:text-sm"
        value={sortOrder}
        onChange={(event) => {
          setSortOrder(event.target.value as SortOrder)
        }}
      >
        {Object.entries(sortOrderLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {compact ? label : `Tri : ${label}`}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-text-secondary"
        aria-hidden="true"
      />
    </label>
  )
}
