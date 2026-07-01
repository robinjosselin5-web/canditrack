import { Heart, MoreVertical } from 'lucide-react'
import { useState } from 'react'
import { CompanyLogo, CompanyStatusBadge } from './CompanyCard'
import type { ICompanyListItem } from '../types/company.types'
import { formatDate, getCompanyCategoryLabel } from '../utils/companyDisplay'

interface CompaniesTableProps {
  companies: ICompanyListItem[]
  onDeleteCompany: (company: ICompanyListItem) => void
  onEditCompany: (company: ICompanyListItem) => void
  onOpenCompany: (companyId: string) => void
  onToggleFavorite: (company: ICompanyListItem) => void
}

export function CompaniesTable({
  companies,
  onDeleteCompany,
  onEditCompany,
  onOpenCompany,
  onToggleFavorite,
}: CompaniesTableProps) {
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
