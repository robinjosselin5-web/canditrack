import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDown, Plus } from 'lucide-react'
import { Alert, Modal } from '@/components/ui'
import { CompanyCard } from '../components/CompanyCard'
import { CompanyForm } from '../components/CompanyForm'
import { ConfirmationModal } from '../components/ConfirmationModal'
import {
  CompaniesErrorState,
  CompaniesSkeleton,
  EmptyCompaniesState,
} from '../components/CompaniesStates'
import {
  FavoriteFilterButton,
  SearchField,
  SortOrderSelect,
  StatusSelect,
  type SortOrder,
  type StatusFilter,
} from '../components/CompaniesFilters'
import { CompaniesTable } from '../components/CompaniesTable'
import { useCompanies } from '../hooks/useCompanies'
import { useDeleteCompany } from '../hooks/useDeleteCompany'
import { useToggleCompanyFavorite } from '../hooks/useToggleCompanyFavorite'
import type { ICompanyListItem } from '../types/company.types'
import { getCompanyCategoryLabel } from '../utils/companyDisplay'
import { filterCompanies } from '../utils/companyFilters'

export function CompaniesPage() {
  const navigate = useNavigate()
  const { data, isError, isLoading } = useCompanies()
  const deleteCompanyMutation = useDeleteCompany()
  const toggleFavoriteMutation = useToggleCompanyFavorite()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<ICompanyListItem | null>(null)
  const [companyToDelete, setCompanyToDelete] = useState<ICompanyListItem | null>(null)

  const filteredCompanies = useMemo(() => {
    if (!data) {
      return []
    }

    return filterCompanies({
      companies: data,
      searchQuery,
      showFavoritesOnly,
      sortOrder,
      statusFilter,
    })
  }, [data, searchQuery, showFavoritesOnly, sortOrder, statusFilter])

  return (
    <section className="mx-auto w-full max-w-300">
      <div className="mb-8 flex items-center justify-between gap-4 lg:hidden">
        <h1 className="text-3xl font-bold text-slate-950">Entreprises</h1>

        <Link
          aria-label="Ajouter une entreprise"
          className="inline-flex size-14 cursor-pointer items-center justify-center rounded-button bg-linear-to-br from-primary to-violet-700 text-white shadow-medium transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          to="/companies/new"
        >
          <Plus className="size-7" aria-hidden="true" />
        </Link>
      </div>

      <div className="mb-6 hidden items-center justify-between lg:flex">
        <h1 className="text-3xl font-bold text-slate-950">Entreprises</h1>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-center">
        <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <button
          className="hidden min-h-14 min-w-60 cursor-pointer items-center justify-between rounded-input border border-border bg-surface px-5 text-sm font-semibold text-text-primary shadow-small lg:inline-flex"
          type="button"
        >
          Catégorie : Toutes
          <ChevronDown className="size-5 text-text-secondary" aria-hidden="true" />
        </button>

        <StatusSelect statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

        <SortOrderSelect sortOrder={sortOrder} setSortOrder={setSortOrder} />

        <div className="hidden lg:block">
          <FavoriteFilterButton
            isActive={showFavoritesOnly}
            onClick={() => {
              setShowFavoritesOnly((value) => !value)
            }}
          />
        </div>

        <Link
          className="hidden min-h-14 cursor-pointer items-center justify-center gap-3 rounded-button bg-linear-to-r from-primary to-violet-700 px-6 text-sm font-semibold text-white shadow-medium transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:ml-auto lg:inline-flex"
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

        <StatusSelect compact statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

        <SortOrderSelect compact sortOrder={sortOrder} setSortOrder={setSortOrder} />

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
