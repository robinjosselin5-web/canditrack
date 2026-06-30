import {
  Clock3,
  Heart,
  Mail,
  MoreVertical,
  Send,
  UserRound,
  XCircle,
} from 'lucide-react'
import { useState } from 'react'
import { Card } from '@/components/ui'
import type { ICompanyListItem } from '../types/company.types'

interface CompanyCardProps {
  categoryLabel: string
  company: ICompanyListItem
  onClick?: () => void
  onDeleteCompany?: (company: ICompanyListItem) => void
  onEditCompany?: (company: ICompanyListItem) => void
  onToggleFavorite?: (company: ICompanyListItem) => void
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
  accepted: 'bg-status-accepted/45 text-emerald-700',
  draft: 'bg-status-draft/45 text-slate-700',
  follow_up: 'bg-status-follow-up/45 text-violet-700',
  interview: 'bg-status-interview/45 text-emerald-700',
  no_response: 'bg-status-no-response/45 text-amber-700',
  pending: 'bg-status-pending/20 text-blue-700',
  rejected: 'bg-status-rejected/45 text-red-700',
}

const statusIcons = {
  accepted: Send,
  draft: Clock3,
  follow_up: Clock3,
  interview: UserRound,
  no_response: Clock3,
  pending: Mail,
  rejected: XCircle,
} satisfies Record<ICompanyListItem['status'], typeof Clock3>

export function CompanyCard({
  categoryLabel,
  company,
  onClick,
  onDeleteCompany,
  onEditCompany,
  onToggleFavorite,
}: CompanyCardProps) {
  const StatusIcon = statusIcons[company.status]
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const hasActions = Boolean(onDeleteCompany && onEditCompany)

  return (
    <Card
      className="relative grid min-h-28 cursor-pointer grid-cols-[88px_1fr_32px] items-center gap-4 p-4 shadow-small transition hover:-translate-y-0.5 hover:shadow-medium"
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
      <CompanyLogo name={company.name} />

      <div className="min-w-0">
        <h2 className="truncate text-lg font-bold text-slate-950">
          {company.name}
        </h2>
        <p className="mt-1 truncate text-sm text-text-secondary">
          {categoryLabel}
        </p>
        <span
          className={[
            'mt-2 inline-flex min-h-7 items-center gap-2 rounded-button px-3 text-xs font-bold',
            statusStyles[company.status],
          ].join(' ')}
        >
          <StatusIcon className="size-4" aria-hidden="true" />
          {statusLabels[company.status]}
        </span>
      </div>

      <div className="flex items-center gap-1 self-start">
        <button
          aria-label={
            company.isFavorite
              ? 'Retirer des favoris'
              : 'Ajouter aux favoris'
          }
          className={[
            'inline-flex size-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
            company.isFavorite ? 'text-red-500' : 'text-text-secondary',
          ].join(' ')}
          onClick={(event) => {
            event.stopPropagation()
            onToggleFavorite?.(company)
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
          aria-expanded={hasActions ? isMenuOpen : undefined}
          aria-label="Ouvrir le menu d'actions"
          className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-slate-950 transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={(event) => {
            event.stopPropagation()

            if (!hasActions) {
              return
            }

            setIsMenuOpen((value) => !value)
          }}
          type="button"
        >
          <MoreVertical className="size-5" aria-hidden="true" />
        </button>

        {hasActions && isMenuOpen ? (
          <div
            className="absolute right-0 top-10 z-20 w-44 rounded-card border border-border bg-surface p-2 shadow-large"
            role="menu"
          >
            <button
              className="flex w-full cursor-pointer items-center rounded-button px-3 py-2 text-left text-sm font-medium text-text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onClick={(event) => {
                event.stopPropagation()
                setIsMenuOpen(false)
                onEditCompany?.(company)
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
                setIsMenuOpen(false)
                onDeleteCompany?.(company)
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
    </Card>
  )
}

export function CompanyLogo({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

  return (
    <div className="flex size-16 shrink-0 items-center justify-center rounded-input border border-border bg-surface text-base font-bold text-primary shadow-small">
      {initials || name[0]?.toUpperCase() || '?'}
    </div>
  )
}

export function CompanyStatusBadge({
  status,
}: {
  status: ICompanyListItem['status']
}) {
  const StatusIcon = statusIcons[status]

  return (
    <span
      className={[
        'inline-flex min-h-8 items-center gap-2 rounded-button px-3 text-xs font-bold',
        statusStyles[status],
      ].join(' ')}
    >
      <StatusIcon className="size-4" aria-hidden="true" />
      {statusLabels[status]}
    </span>
  )
}
