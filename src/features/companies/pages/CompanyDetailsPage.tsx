import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, BriefcaseBusiness, CalendarDays, Clock3, Globe, MapPin, Phone, UserRound } from 'lucide-react'
import { Alert, Modal } from '@/components/ui'
import { CompanyForm } from '../components/CompanyForm'
import { ConfirmationModal } from '../components/ConfirmationModal'
import {
  CompanyDetailsSkeleton,
  DetailsTabContent,
  HeroSection,
} from '../components/CompanyDetailsSections'
import { detailsTabs, type DetailsTab } from '../config/companyDetailsTabs'
import { useDeleteCompany } from '../hooks/useDeleteCompany'
import { useCompany } from '../hooks/useCompany'
import { getDisplayValue } from '../utils/companyDisplay'

export function CompanyDetailsPage() {
  const navigate = useNavigate()
  const { companyId } = useParams()
  const { data, isError, isLoading, refetch } = useCompany(companyId)
  const deleteCompanyMutation = useDeleteCompany()
  const [activeTab, setActiveTab] = useState<DetailsTab>('summary')
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const createdAt = data ? new Date(data.createdAt).toLocaleDateString('fr-FR') : null
  const updatedAt = data ? new Date(data.updatedAt).toLocaleDateString('fr-FR') : null

  const infoRows = useMemo(
    () => [
      { icon: BriefcaseBusiness, label: 'Secteur', value: 'Non renseigne' },
      { icon: UserRound, label: 'Recruteur', value: getDisplayValue(data?.recruiterName) },
      { icon: Phone, label: 'Telephone', value: getDisplayValue(data?.phone) },
      { icon: MapPin, label: 'Ville', value: getDisplayValue(data?.city) },
      { icon: Globe, label: 'Pays', value: getDisplayValue(data?.country) },
      { icon: CalendarDays, label: 'Creation', value: createdAt ?? '—' },
      { icon: Clock3, label: 'Derniere mise a jour', value: updatedAt ?? '—' },
    ],
    [createdAt, data?.city, data?.country, data?.phone, data?.recruiterName, updatedAt],
  )

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
    <section className="mx-auto w-full max-w-330">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link
          to="/companies"
          className="inline-flex cursor-pointer items-center gap-2 rounded-button px-1 py-2 text-sm font-semibold text-text-secondary transition hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Retour
        </Link>

        <div />
      </div>

      {isLoading ? <CompanyDetailsSkeleton /> : null}
      {isError ? (
        <Alert variant="error">
          Impossible de charger les informations de l&apos;entreprise.
        </Alert>
      ) : null}

      {!isLoading && !isError && data ? (
        <div className="space-y-6">
          <HeroSection
            companyName={data.name}
            onDelete={() => {
              setIsDeleteOpen(true)
            }}
            onEdit={() => {
              setIsEditOpen(true)
            }}
            status={data.status}
            website={data.website}
          />

          <div className="overflow-x-auto border-b border-border">
            <div className="flex min-w-max gap-2">
              {detailsTabs.map((tab) => (
                <button
                  key={tab.key}
                  className={[
                    'inline-flex min-h-12 cursor-pointer items-center gap-2 border-b-2 px-4 text-sm font-semibold transition',
                    activeTab === tab.key
                      ? 'border-primary text-primary'
                      : 'border-transparent text-text-secondary hover:text-text-primary',
                  ].join(' ')}
                  onClick={() => {
                    setActiveTab(tab.key)
                  }}
                  type="button"
                >
                  <tab.icon className="size-4" aria-hidden="true" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <DetailsTabContent
            activeTab={activeTab}
            infoRows={infoRows}
            summaryText="Le resume genere par l'IA n'est pas encore disponible dans cette US. Cette section sert de placeholder visuel en attendant l'integration fonctionnelle."
            website={data.website}
          />
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
        message="Cette suppression est definitive. L'entreprise sera retiree de la liste et ne pourra pas etre restauree."
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
              setToastMessage('Entreprise supprimee avec succes.')
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
