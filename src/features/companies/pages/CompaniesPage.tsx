import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Alert, Button, Card, Input, Modal } from '@/components/ui'
import { PageHeader } from '@/components/PageHeader'
import { CompanyCard } from '../components/CompanyCard'
import { ConfirmationModal } from '../components/ConfirmationModal'
import { CompanyForm } from '../components/CompanyForm'
import { useCompanies } from '../hooks/useCompanies'
import { useDeleteCompany } from '../hooks/useDeleteCompany'
import { useToggleCompanyFavorite } from '../hooks/useToggleCompanyFavorite'
import type { ICompanyListItem } from '../types/company.types'

export function CompaniesPage() {
  const navigate = useNavigate()
  const { data, isError, isLoading } = useCompanies()
  const deleteCompanyMutation = useDeleteCompany()
  const toggleCompanyFavoriteMutation = useToggleCompanyFavorite()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [favoriteFilter, setFavoriteFilter] = useState<'all' | 'favorites'>(
    'all',
  )
  const [selectedCompany, setSelectedCompany] = useState<ICompanyListItem | null>(
    null,
  )
  const [companyToDelete, setCompanyToDelete] =
    useState<ICompanyListItem | null>(null)

  const filteredCompanies = useMemo(() => {
    if (!data) {
      return []
    }

    const normalizedQuery = searchQuery.trim().toLowerCase()

    const searchFilteredCompanies = normalizedQuery
      ? data.filter((company) => {
          const searchText = [
            company.name,
            company.email,
            company.recruiterName,
            company.phone,
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()

          return searchText.includes(normalizedQuery)
        })
      : data

    const favoriteFilteredCompanies =
      favoriteFilter === 'favorites'
        ? searchFilteredCompanies.filter((company) => company.isFavorite)
        : searchFilteredCompanies

    return [...favoriteFilteredCompanies].sort((firstCompany, secondCompany) => {
      const firstDate = new Date(firstCompany.createdAt).getTime()
      const secondDate = new Date(secondCompany.createdAt).getTime()

      return sortOrder === 'newest'
        ? secondDate - firstDate
        : firstDate - secondDate
    })
  }, [data, favoriteFilter, searchQuery, sortOrder])

  return (
    <section>
      <PageHeader
        title="Entreprises"
        description="Centralise les entreprises, contacts et opportunites associees."
      />

      <div className="mb-6">
        <Link
          to="/companies/new"
          className="inline-flex rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Ajouter une entreprise
        </Link>
      </div>

      <div className="mb-6 flex max-w-5xl flex-col gap-4">
        <Input
          aria-label="Rechercher une entreprise"
          iconLeft={<Search className="size-5" />}
          label="Rechercher"
          placeholder="Nom, email, contact ou téléphone"
          className="max-w-md"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value)
          }}
        />

        <div className="flex w-full flex-col gap-3 rounded-card border border-border bg-surface p-4 lg:flex-row lg:items-center">
          <div className="flex flex-1 flex-wrap gap-2">
            <Button
              className="w-auto min-w-0 text-xs"
              onClick={() => {
                setSortOrder('newest')
              }}
              variant={sortOrder === 'newest' ? 'primary' : 'secondary'}
            >
              Plus récent
            </Button>
            <Button
              className="w-auto min-w-0 text-xs"
              onClick={() => {
                setSortOrder('oldest')
              }}
              variant={sortOrder === 'oldest' ? 'primary' : 'secondary'}
            >
              Plus ancien
            </Button>
          </div>

          <div className="flex flex-1 flex-wrap gap-2 lg:justify-end">
            <Button
              className="w-auto min-w-0 text-xs"
              onClick={() => {
                setFavoriteFilter('all')
              }}
              variant={favoriteFilter === 'all' ? 'primary' : 'secondary'}
            >
              Toutes les entreprises
            </Button>
            <Button
              className="w-auto min-w-0 text-xs"
              onClick={() => {
                setFavoriteFilter('favorites')
              }}
              variant={favoriteFilter === 'favorites' ? 'primary' : 'secondary'}
            >
              Favoris uniquement
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? <CompaniesSkeleton /> : null}
      {isError ? <CompaniesErrorState /> : null}

      {!isLoading && !isError && data ? (
        filteredCompanies.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {filteredCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                isFavorite={company.isFavorite}
                onClick={() => {
                  navigate(`/companies/${company.id}`)
                }}
                onFavorite={() => {
                  toggleCompanyFavoriteMutation.mutate({
                    companyId: company.id,
                    isFavorite: !company.isFavorite,
                  })
                }}
                onEdit={() => {
                  setSelectedCompany(company)
                }}
                onDelete={() => {
                  setCompanyToDelete(company)
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyCompaniesState />
        )
      ) : null}

      <Modal
        isOpen={selectedCompany !== null}
        onClose={() => setSelectedCompany(null)}
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
            onSuccess={() => {
              setSelectedCompany(null)
            }}
            onCancel={() => setSelectedCompany(null)}
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
        <Alert variant="error">
          Impossible de supprimer l&apos;entreprise. Veuillez réessayer.
        </Alert>
      ) : null}
    </section>
  )
}

function CompaniesSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card className="space-y-4" key={index}>
          <div className="h-5 w-40 animate-pulse rounded-full bg-divider" />
          <div className="h-8 w-24 animate-pulse rounded-full bg-divider" />
          <div className="space-y-3 pt-2">
            <div className="h-4 w-full animate-pulse rounded-full bg-divider" />
            <div className="h-4 w-4/5 animate-pulse rounded-full bg-divider" />
            <div className="h-4 w-3/4 animate-pulse rounded-full bg-divider" />
          </div>
        </Card>
      ))}
    </div>
  )
}

function EmptyCompaniesState() {
  return (
    <Card className="text-center">
      <p className="text-lg font-semibold text-text-primary">
        Aucune entreprise ajoutée.
      </p>
      <p className="mt-2 text-sm text-text-secondary">
        Commencez par ajouter votre première entreprise.
      </p>
      <div className="mt-6">
        <Link
          to="/companies/new"
          className="inline-flex min-h-12 items-center justify-center rounded-button bg-linear-to-r from-primary to-accent px-4 text-sm font-semibold text-white shadow-small transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
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
