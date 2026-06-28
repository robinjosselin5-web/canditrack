import { useId, useState } from 'react'
import {
  CalendarDays,
  Heart,
  HeartOff,
  Mail,
  MapPin,
  MoreHorizontal,
  Globe,
  UserRound,
} from 'lucide-react'
import { Card } from '@/components/ui'
import type { ICompanyListItem } from '../types/company.types'

interface CompanyCardProps {
  company: ICompanyListItem
  isFavorite?: boolean
  onClick?: () => void
  onFavorite?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

const statusLabels: Record<ICompanyListItem['status'], string> = {
  accepted: 'Acceptée',
  draft: 'Brouillon',
  follow_up: 'À relancer',
  interview: 'Entretien',
  no_response: 'Sans réponse',
  pending: 'En attente',
  rejected: 'Refusée',
}

const statusStyles: Record<ICompanyListItem['status'], string> = {
  accepted: 'bg-status-accepted text-text-primary',
  draft: 'bg-status-draft text-text-primary',
  follow_up: 'bg-status-follow-up text-text-primary',
  interview: 'bg-status-interview text-text-primary',
  no_response: 'bg-status-no-response text-text-primary',
  pending: 'bg-status-pending text-text-primary',
  rejected: 'bg-status-rejected text-text-primary',
}

export function CompanyCard({
  company,
  isFavorite = false,
  onClick,
  onFavorite,
  onEdit,
  onDelete,
}: CompanyCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuId = useId()
  const location = [company.city, company.country].filter(Boolean).join(', ')
  const addedAt = new Date(company.createdAt).toLocaleDateString('fr-FR')

  return (
    <Card
      className="relative h-full cursor-pointer p-5 sm:p-6"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      onKeyDown={(event) => {
        if (!onClick) {
          return
        }

        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onClick()
        }
      }}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-text-primary">
            {company.name}
          </h2>
          <span
            className={[
              'mt-2 inline-flex min-h-8 items-center rounded-full px-3 text-sm font-semibold',
              statusStyles[company.status],
            ].join(' ')}
          >
            {statusLabels[company.status]}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            aria-label={
              isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'
            }
            className="inline-flex size-10 items-center justify-center rounded-full text-text-secondary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            onClick={(event) => {
              event.stopPropagation()
              onFavorite?.()
            }}
            type="button"
          >
            {isFavorite ? (
              <Heart className="size-5 fill-current text-error" aria-hidden="true" />
            ) : (
              <HeartOff className="size-5" aria-hidden="true" />
            )}
          </button>

          <div className="relative">
            <button
              aria-controls={menuId}
              aria-expanded={isMenuOpen}
              aria-label="Ouvrir le menu d'actions"
              className="inline-flex size-10 items-center justify-center rounded-full text-text-secondary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              title="Ouvrir le menu d'actions"
              onClick={(event) => {
                event.stopPropagation()
                setIsMenuOpen((value) => !value)
              }}
              type="button"
            >
              <MoreHorizontal className="size-5" aria-hidden="true" />
            </button>

            {isMenuOpen ? (
              <div
                id={menuId}
                className="absolute right-0 top-12 z-20 w-52 rounded-card border border-border bg-surface p-2 shadow-large"
                role="menu"
              >
                <button
                  className="flex w-full items-center rounded-button px-3 py-2 text-left text-sm font-medium text-text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  onClick={(event) => {
                    event.stopPropagation()
                    setIsMenuOpen(false)
                    onEdit?.()
                  }}
                  role="menuitem"
                  type="button"
                >
                  Modifier l&apos;entreprise
                </button>
                <button
                  className="flex w-full items-center rounded-button px-3 py-2 text-left text-sm font-medium text-text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  onClick={(event) => {
                    event.stopPropagation()
                    setIsMenuOpen(false)
                    onDelete?.()
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
      </div>

      <div className="space-y-3 text-sm text-text-secondary">
        <p className="flex items-center gap-2 text-text-primary">
          <Globe className="size-4 shrink-0 text-primary" aria-hidden="true" />
          <span className="truncate">{company.website ?? '—'}</span>
        </p>
        <p className="flex items-center gap-2">
          <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
          <span className="truncate">{company.email ?? '—'}</span>
        </p>
        {location ? (
          <p className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="truncate">{location}</span>
          </p>
        ) : null}
        {company.recruiterName ? (
          <p className="flex items-center gap-2">
            <UserRound className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="truncate">{company.recruiterName}</span>
          </p>
        ) : null}
        <p className="flex items-center gap-2">
          <CalendarDays className="size-4 shrink-0 text-primary" aria-hidden="true" />
          <span>Ajoutée le {addedAt}</span>
        </p>
      </div>
    </Card>
  )
}
