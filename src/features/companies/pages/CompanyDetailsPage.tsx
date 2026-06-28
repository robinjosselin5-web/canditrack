import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Alert, Button, Card, Modal } from '@/components/ui'
import { PageHeader } from '@/components/PageHeader'
import { CompanyForm } from '../components/CompanyForm'
import { ConfirmationModal } from '../components/ConfirmationModal'
import { useDeleteCompany } from '../hooks/useDeleteCompany'
import { useCompany } from '../hooks/useCompany'

const statusLabels: Record<
  'draft' | 'pending' | 'no_response' | 'follow_up' | 'interview' | 'rejected' | 'accepted',
  string
> = {
  accepted: 'Acceptée',
  draft: 'Brouillon',
  follow_up: 'À relancer',
  interview: 'Entretien',
  no_response: 'Sans réponse',
  pending: 'En attente',
  rejected: 'Refusée',
}

export function CompanyDetailsPage() {
  const navigate = useNavigate()
  const { companyId } = useParams()
  const { data, isError, isLoading, refetch } = useCompany(companyId)
  const deleteCompanyMutation = useDeleteCompany()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!toastMessage) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage(null)
    }, 2500)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [toastMessage])

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          title="Détail entreprise"
          description="Consultez les informations principales de l'entreprise."
        />

        {data ? (
          <div className="flex flex-wrap gap-3">
            <Button
              className="w-auto"
              onClick={() => {
                setIsEditOpen(true)
              }}
              variant="secondary"
            >
              Modifier
            </Button>
            <Button
              className="w-auto"
              onClick={() => {
                setIsDeleteOpen(true)
              }}
              variant="danger"
            >
              Supprimer
            </Button>
          </div>
        ) : null}
      </div>

      <div className="mb-6">
        <Link
          to="/companies"
          className="inline-flex rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Retour aux entreprises
        </Link>
      </div>

      {isLoading ? <CompanyDetailsSkeleton /> : null}
      {isError ? (
        <Alert variant="error">
          Impossible de charger les informations de l&apos;entreprise.
        </Alert>
      ) : null}

      {!isLoading && !isError && data ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="space-y-4">
            <div>
              <p className="text-sm text-text-secondary">Nom</p>
              <p className="mt-1 text-lg font-semibold text-text-primary">
                {data.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Statut</p>
              <p className="mt-1 text-text-primary">{statusLabels[data.status]}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Site web</p>
              <p className="mt-1 break-all text-text-primary">
                {data.website ?? '—'}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Email</p>
              <p className="mt-1 break-all text-text-primary">
                {data.email ?? '—'}
              </p>
            </div>
          </Card>

          <Card className="space-y-4">
            <div>
              <p className="text-sm text-text-secondary">Téléphone</p>
              <p className="mt-1 text-text-primary">{data.phone ?? '—'}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Ville</p>
              <p className="mt-1 text-text-primary">{data.city ?? '—'}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Pays</p>
              <p className="mt-1 text-text-primary">{data.country ?? '—'}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Recruteur</p>
              <p className="mt-1 text-text-primary">{data.recruiterName ?? '—'}</p>
            </div>
          </Card>
        </div>
      ) : null}

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Modifier une entreprise"
      >
        {data && companyId ? (
          <CompanyForm
            companyId={companyId}
            initialValues={{
              city: data.city ?? '',
              country: data.country ?? '',
              email: data.email ?? '',
              name: data.name,
              phone: data.phone ?? '',
              recruiterName: data.recruiterName ?? '',
              website: data.website ?? '',
            }}
            mode="update"
            onCancel={() => setIsEditOpen(false)}
            onSuccess={async () => {
              setIsEditOpen(false)
              await refetch()
            }}
          />
        ) : null}
      </Modal>

      <ConfirmationModal
        confirmLabel="Supprimer"
        isLoading={deleteCompanyMutation.isPending}
        isOpen={isDeleteOpen}
        message="Cette suppression est définitive. L'entreprise sera retirée de la liste et ne pourra pas être restaurée."
        onClose={() => {
          if (!deleteCompanyMutation.isPending) {
            setIsDeleteOpen(false)
          }
        }}
        onConfirm={() => {
          if (!companyId) {
            return
          }

          deleteCompanyMutation.mutate(companyId, {
            onSuccess: () => {
              setIsDeleteOpen(false)
              setToastMessage('Entreprise supprimée avec succès.')
              navigate('/companies')
            },
          })
        }}
        title="Supprimer une entreprise"
      />

      {toastMessage ? (
        <div
          aria-live="polite"
          className="fixed right-4 top-4 z-50 rounded-card border border-border bg-surface px-4 py-3 text-sm font-medium text-text-primary shadow-large"
          role="status"
        >
          {toastMessage}
        </div>
      ) : null}
    </section>
  )
}

function CompanyDetailsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="space-y-4">
        <div className="h-5 w-40 animate-pulse rounded-full bg-divider" />
        <div className="h-4 w-24 animate-pulse rounded-full bg-divider" />
        <div className="h-4 w-full animate-pulse rounded-full bg-divider" />
        <div className="h-4 w-3/4 animate-pulse rounded-full bg-divider" />
      </Card>
      <Card className="space-y-4">
        <div className="h-5 w-32 animate-pulse rounded-full bg-divider" />
        <div className="h-4 w-20 animate-pulse rounded-full bg-divider" />
        <div className="h-4 w-full animate-pulse rounded-full bg-divider" />
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-divider" />
      </Card>
    </div>
  )
}
