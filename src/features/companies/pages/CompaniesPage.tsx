import { useMemo, useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import {
  ChevronDown,
  Heart,
  Menu,
  MoreVertical,
  Plus,
  Search,
} from 'lucide-react'
import { Alert, Card, Modal } from '@/components/ui'
import {
  CompanyCard,
  CompanyLogo,
  CompanyStatusBadge,
} from '../components/CompanyCard'
import { CompanyForm } from '../components/CompanyForm'
import { ConfirmationModal } from '../components/ConfirmationModal'
import { useCompanies } from '../hooks/useCompanies'
import { useDeleteCompany } from '../hooks/useDeleteCompany'
import { useToggleCompanyFavorite } from '../hooks/useToggleCompanyFavorite'
import type { ICompanyListItem } from '../types/company.types'
import type { IAppLayoutOutletContext } from '@/layouts/AppLayout'

type StatusFilter = 'all' | ICompanyListItem['status']
type SortOrder = 'desc' | 'asc'

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

export function CompaniesPage() {
  const { openMobileMenu } = useOutletContext<IAppLayoutOutletContext>()
  const navigate = useNavigate()
  const { data, isError, isLoading } = useCompanies()
  const deleteCompanyMutation = useDeleteCompany()
  const toggleFavoriteMutation = useToggleCompanyFavorite()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<ICompanyListItem | null>(
    null,
  )
  const [companyToDelete, setCompanyToDelete] = useState<ICompanyListItem | null>(
    null,
  )

  const filteredCompanies = useMemo(() => {
    if (!data) {
      return []
    }

    const normalizedQuery = searchQuery.trim().toLowerCase()

    return [...data]
      .filter((company) => {
        if (!showFavoritesOnly) {
          return true
        }

        return company.isFavorite
      })
      .filter((company) => {
        if (statusFilter === 'all') {
          return true
        }

        return company.status === statusFilter
      })
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

        return sortOrder === 'asc'
          ? firstDate - secondDate
          : secondDate - firstDate
      })
  }, [data, searchQuery, showFavoritesOnly, sortOrder, statusFilter])

  return (
    <section className="mx-auto w-full max-w-[1200px]">
      <div className="mb-8 flex items-center justify-between gap-4 lg:hidden">
        <button
          aria-label="Ouvrir le menu"
          className="inline-flex size-11 cursor-pointer items-center justify-center rounded-button text-text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={openMobileMenu}
          type="button"
        >
          <Menu className="size-7" aria-hidden="true" />
        </button>

        <h1 className="mr-auto text-3xl font-bold text-slate-950">
          Entreprises
        </h1>

        <Link
          aria-label="Ajouter une entreprise"
          className="inline-flex size-14 cursor-pointer items-center justify-center rounded-button bg-gradient-to-br from-primary to-violet-700 text-white shadow-medium transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          to="/companies/new"
        >
          <Plus className="size-7" aria-hidden="true" />
        </Link>
      </div>

      <div className="mb-6 hidden items-center justify-between lg:flex">
        <h1 className="text-3xl font-bold text-slate-950">Entreprises</h1>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-center">
        <SearchField
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <button
          className="hidden min-h-14 min-w-60 cursor-pointer items-center justify-between rounded-input border border-border bg-surface px-5 text-sm font-semibold text-text-primary shadow-small lg:inline-flex"
          type="button"
        >
          Catégorie : Toutes
          <ChevronDown className="size-5 text-text-secondary" aria-hidden="true" />
        </button>

        <StatusSelect
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <SortOrderSelect
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        <div className="hidden lg:block">
          <FavoriteFilterButton
            isActive={showFavoritesOnly}
            onClick={() => {
              setShowFavoritesOnly((value) => !value)
            }}
          />
        </div>

        <Link
          className="hidden min-h-14 cursor-pointer items-center justify-center gap-3 rounded-button bg-gradient-to-r from-primary to-violet-700 px-6 text-sm font-semibold text-white shadow-medium transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:ml-auto lg:inline-flex"
          to="/companies/new"
        >
          <Plus className="size-5" aria-hidden="true" />
          Ajouter une entreprise
        </Link>
      </div>

      <div className="mb-6 flex items-center justify-between gap-4 lg:hidden">
        <button
          className="inline-flex min-h-12 flex-1 cursor-pointer items-center justify-between rounded-input border border-border bg-surface px-4 text-base font-semibold text-text-primary shadow-small"
          type="button"
        >
          Catégorie
          <ChevronDown className="size-5 text-text-secondary" aria-hidden="true" />
        </button>

        <StatusSelect
          compact
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <SortOrderSelect
          compact
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        <FavoriteFilterButton
          compact
          isActive={showFavoritesOnly}
          onClick={() => {
            setShowFavoritesOnly((value) => !value)
          }}
        />
      </div>

      {isLoading ? <CompaniesSkeleton /> : null}
      {isError ? <CompaniesErrorState /> : null}

      {!isLoading && !isError && data ? (
        filteredCompanies.length > 0 ? (
          <>
            <CompaniesTable
              companies={filteredCompanies}
              onDeleteCompany={(company) => {
                setCompanyToDelete(company)
              }}
              onEditCompany={(company) => {
                setSelectedCompany(company)
              }}
              onOpenCompany={(companyId) => {
                navigate(`/companies/${companyId}`)
              }}
              onToggleFavorite={(company) => {
                toggleFavoriteMutation.mutate({
                  companyId: company.id,
                  isFavorite: !company.isFavorite,
                })
              }}
            />
            <div className="grid gap-4 lg:hidden">
              {filteredCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  categoryLabel={getCompanyCategoryLabel()}
                  company={company}
                  onClick={() => {
                    navigate(`/companies/${company.id}`)
                  }}
                  onDeleteCompany={(selectedCompany) => {
                    setCompanyToDelete(selectedCompany)
                  }}
                  onEditCompany={(selectedCompany) => {
                    setSelectedCompany(selectedCompany)
                  }}
                  onToggleFavorite={(selectedCompany) => {
                    toggleFavoriteMutation.mutate({
                      companyId: selectedCompany.id,
                      isFavorite: !selectedCompany.isFavorite,
                    })
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyCompaniesState />
        )
      ) : null}

      <Modal
        isOpen={selectedCompany !== null}
        onClose={() => {
          setSelectedCompany(null)
        }}
        title="Modifier une entreprise"
      >
        {selectedCompany ? (
          <CompanyForm
            companyId={selectedCompany.id}
            initialValues={{
              city: selectedCompany.city ?? '',
              country: selectedCompany.country ?? '',
              email: selectedCompany.email ?? '',
              name: selectedCompany.name,
              phone: selectedCompany.phone ?? '',
              recruiterName: selectedCompany.recruiterName ?? '',
              website: selectedCompany.website ?? '',
            }}
            mode="update"
            onCancel={() => {
              setSelectedCompany(null)
            }}
            onSuccess={() => {
              setSelectedCompany(null)
            }}
          />
        ) : null}
      </Modal>

      <ConfirmationModal
        confirmLabel="Supprimer"
        isLoading={deleteCompanyMutation.isPending}
        isOpen={companyToDelete !== null}
        message="Cette suppression est définitive. L'entreprise sera retirée de la liste et ne pourra pas être restaurée."
        onClose={() => {
          if (!deleteCompanyMutation.isPending) {
            setCompanyToDelete(null)
          }
        }}
        onConfirm={() => {
          if (!companyToDelete) {
            return
          }

          deleteCompanyMutation.mutate(companyToDelete.id, {
            onSuccess: () => {
              setCompanyToDelete(null)
            },
          })
        }}
        title="Supprimer une entreprise"
      />

      {deleteCompanyMutation.isError ? (
        <div className="mt-6">
          <Alert variant="error">
            Impossible de supprimer l&apos;entreprise. Veuillez réessayer.
          </Alert>
        </div>
      ) : null}
    </section>
  )
}

function SearchField({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string
  setSearchQuery: (value: string) => void
}) {
  return (
    <label className="relative block lg:w-[380px]">
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

function StatusSelect({
  compact = false,
  statusFilter,
  setStatusFilter,
}: {
  compact?: boolean
  statusFilter: StatusFilter
  setStatusFilter: (status: StatusFilter) => void
}) {
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

function FavoriteFilterButton({
  compact = false,
  isActive,
  onClick,
}: {
  compact?: boolean
  isActive: boolean
  onClick: () => void
}) {
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

function SortOrderSelect({
  compact = false,
  sortOrder,
  setSortOrder,
}: {
  compact?: boolean
  sortOrder: SortOrder
  setSortOrder: (value: SortOrder) => void
}) {
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

function CompaniesTable({
  companies,
  onDeleteCompany,
  onEditCompany,
  onOpenCompany,
  onToggleFavorite,
}: {
  companies: ICompanyListItem[]
  onDeleteCompany: (company: ICompanyListItem) => void
  onEditCompany: (company: ICompanyListItem) => void
  onOpenCompany: (companyId: string) => void
  onToggleFavorite: (company: ICompanyListItem) => void
}) {
  return (
    <div className="hidden overflow-visible rounded-card border border-border bg-surface shadow-small lg:block">
      <div className="grid grid-cols-[2fr_1.4fr_1.6fr_1.2fr_48px] border-b border-border px-7 py-5 text-sm font-bold text-text-secondary">
        <span>Entreprise</span>
        <span>Catégorie</span>
        <span>Statut</span>
        <span>Date ajoutée</span>
        <span aria-hidden="true" />
      </div>

      {companies.map((company) => (
        <div
          key={company.id}
          className="grid min-h-28 w-full cursor-pointer grid-cols-[2fr_1.4fr_1.6fr_1.2fr_48px] items-center border-b border-border px-7 text-left transition last:border-b-0 hover:bg-divider/60 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-primary"
          onClick={() => {
            onOpenCompany(company.id)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onOpenCompany(company.id)
            }
          }}
          role="button"
          tabIndex={0}
        >
          <span className="flex min-w-0 items-center gap-5">
            <CompanyLogo name={company.name} />
            <span className="truncate text-base font-bold text-slate-950">
              {company.name}
            </span>
          </span>
          <span className="truncate text-sm font-medium text-text-secondary">
            {getCompanyCategoryLabel()}
          </span>
          <span>
            <CompanyStatusBadge status={company.status} />
          </span>
          <span className="text-sm font-semibold text-slate-950">
            {formatDate(company.createdAt)}
          </span>
          <span className="flex justify-end">
            <RowActionsMenu
              company={company}
              onDeleteCompany={onDeleteCompany}
              onEditCompany={onEditCompany}
              onToggleFavorite={onToggleFavorite}
            />
          </span>
        </div>
      ))}
    </div>
  )
}

function RowActionsMenu({
  company,
  onDeleteCompany,
  onEditCompany,
  onToggleFavorite,
}: {
  company: ICompanyListItem
  onDeleteCompany: (company: ICompanyListItem) => void
  onEditCompany: (company: ICompanyListItem) => void
  onToggleFavorite: (company: ICompanyListItem) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center gap-1">
      <button
        aria-label={
          company.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'
        }
        className={[
          'inline-flex size-9 cursor-pointer items-center justify-center rounded-full transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
          company.isFavorite ? 'text-red-500' : 'text-text-secondary',
        ].join(' ')}
        onClick={(event) => {
          event.stopPropagation()
          onToggleFavorite(company)
        }}
        type="button"
      >
        <Heart
          className={[
            'size-5',
            company.isFavorite ? 'fill-current' : '',
          ].join(' ')}
          aria-hidden="true"
        />
      </button>

      <div className="relative">
      <button
        aria-expanded={isOpen}
        aria-label="Menu d'actions"
        className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-slate-950 transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        onClick={(event) => {
          event.stopPropagation()
          setIsOpen((value) => !value)
        }}
        type="button"
      >
        <MoreVertical className="size-5" aria-hidden="true" />
      </button>

      {isOpen ? (
        <div
          className="absolute right-0 top-11 z-20 w-44 rounded-card border border-border bg-surface p-2 shadow-large"
          role="menu"
        >
          <button
            className="flex w-full cursor-pointer items-center rounded-button px-3 py-2 text-left text-sm font-medium text-text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={(event) => {
              event.stopPropagation()
              setIsOpen(false)
              onEditCompany(company)
            }}
            role="menuitem"
            type="button"
          >
            Modifier
          </button>
          <button
            className="flex w-full cursor-pointer items-center rounded-button px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
            onClick={(event) => {
              event.stopPropagation()
              setIsOpen(false)
              onDeleteCompany(company)
            }}
            role="menuitem"
            type="button"
          >
            Supprimer
          </button>
        </div>
      ) : null}
      </div>
    </div>
  )
}

function CompaniesSkeleton() {
  return (
    <>
      <div className="hidden overflow-hidden rounded-card border border-border bg-surface shadow-small lg:block">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            className="grid min-h-28 grid-cols-[2fr_1.4fr_1.6fr_1.2fr_48px] items-center border-b border-border px-7 last:border-b-0"
            key={index}
          >
            <div className="flex items-center gap-5">
              <div className="size-16 animate-pulse rounded-input bg-divider" />
              <div className="h-5 w-32 animate-pulse rounded-full bg-divider" />
            </div>
            <div className="h-4 w-28 animate-pulse rounded-full bg-divider" />
            <div className="h-8 w-32 animate-pulse rounded-button bg-divider" />
            <div className="h-4 w-24 animate-pulse rounded-full bg-divider" />
            <div className="h-4 w-4 animate-pulse rounded-full bg-divider" />
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card
            className="grid min-h-28 grid-cols-[88px_1fr_32px] items-center gap-4 p-4 shadow-small"
            key={index}
          >
            <div className="size-16 animate-pulse rounded-input bg-divider" />
            <div className="space-y-3">
              <div className="h-5 w-32 animate-pulse rounded-full bg-divider" />
              <div className="h-4 w-24 animate-pulse rounded-full bg-divider" />
              <div className="h-7 w-28 animate-pulse rounded-button bg-divider" />
            </div>
            <div className="h-5 w-1 animate-pulse rounded-full bg-divider" />
          </Card>
        ))}
      </div>
    </>
  )
}

function EmptyCompaniesState() {
  return (
    <Card className="mx-auto max-w-xl text-center">
      <p className="text-lg font-semibold text-text-primary">
        Aucune entreprise ajoutée.
      </p>
      <p className="mt-2 text-sm text-text-secondary">
        Commencez par ajouter votre première entreprise.
      </p>
      <div className="mt-6">
        <Link
          to="/companies/new"
          className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-button bg-gradient-to-r from-primary to-violet-700 px-4 text-sm font-semibold text-white shadow-small transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Plus className="size-5" aria-hidden="true" />
          Ajouter une entreprise
        </Link>
      </div>
    </Card>
  )
}

function CompaniesErrorState() {
  return (
    <Alert variant="error">
      Impossible de charger les entreprises. Veuillez réessayer.
    </Alert>
  )
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('fr-FR')
}

function getCompanyCategoryLabel() {
  return 'Non classée'
}
