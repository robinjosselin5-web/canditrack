import { type ReactNode } from 'react'
import {
  BriefcaseBusiness,
  Clock3,
  ExternalLink,
  FolderOpen,
  Globe,
  Info,
  Pencil,
  Sparkles,
  StickyNote,
  Tag,
  Trash2,
} from 'lucide-react'
import { Button, Card } from '@/components/ui'
import type { CompanyStatus } from '../types/company.types'
import type { DetailsTab } from '../config/companyDetailsTabs'

interface HeroSectionProps {
  companyName: string
  onDelete: () => void
  onEdit: () => void
  status: CompanyStatus
  website: string | null
}

interface DetailsTabContentProps {
  activeTab: DetailsTab
  infoRows: Array<{
    icon: typeof BriefcaseBusiness
    label: string
    value: string
  }>
  summaryText: string
  website: string | null
}

interface InfoCardProps {
  children: ReactNode
  icon: typeof Info
  title: string
}

interface InfoRowProps {
  icon: typeof Globe
  isLink?: boolean
  label: string
  value: string
}

interface PlaceholderBlockProps {
  description: string
  title: string
}

const statusLabels: Record<CompanyStatus, string> = {
  accepted: 'Acceptee',
  draft: 'Brouillon',
  follow_up: 'A relancer',
  interview: 'Entretien',
  no_response: 'Sans reponse',
  pending: 'En attente',
  rejected: 'Refusee',
}

const statusStyles: Record<CompanyStatus, string> = {
  accepted: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  draft: 'border-slate-200 bg-slate-100 text-slate-700',
  follow_up: 'border-violet-200 bg-violet-50 text-violet-700',
  interview: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  no_response: 'border-amber-200 bg-amber-50 text-amber-700',
  pending: 'border-amber-200 bg-amber-50 text-amber-700',
  rejected: 'border-red-200 bg-red-50 text-red-700',
}

const notesPlaceholder =
  "Les notes ne sont pas encore connectees dans le perimetre de cette US. L'emplacement est reserve pour refleter le design attendu."

const keywordsPlaceholder = ['IA', 'Recherche', 'Cloud']

export function HeroSection({
  companyName,
  onDelete,
  onEdit,
  status,
  website,
}: HeroSectionProps) {
  const initials = companyName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

  return (
    <div className="rounded-[28px] border border-border bg-surface p-6 shadow-medium sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[184px_minmax(0,1fr)] xl:grid-cols-[184px_minmax(0,1fr)_auto] xl:items-start">
        <div className="flex size-[184px] items-center justify-center rounded-[24px] border border-border bg-white shadow-small">
          <div className="text-[88px] font-bold leading-none text-slate-900">
            {initials || '?'}
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {companyName}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-base text-text-secondary">
              <span className="inline-flex items-center gap-2">
                <BriefcaseBusiness className="size-4" aria-hidden="true" />
                Technologie
              </span>

              <span className="hidden text-border sm:inline">•</span>

              {website ? (
                <a
                  className="inline-flex items-center gap-2 font-medium text-primary transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  href={website}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Globe className="size-4" aria-hidden="true" />
                  {website}
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <Globe className="size-4" aria-hidden="true" />
                  Site web non renseigne
                </span>
              )}
            </div>
          </div>

          <span
            className={[
              'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-small',
              statusStyles[status],
            ].join(' ')}
          >
            <Clock3 className="size-4" aria-hidden="true" />
            {statusLabels[status]}
          </span>
        </div>

        <div className="flex flex-wrap gap-3 xl:justify-end">
          <Button className="w-auto px-6" onClick={onEdit} type="button">
            <Pencil className="size-4" aria-hidden="true" />
            Modifier
          </Button>
          <Button
            className="w-auto px-6"
            onClick={onDelete}
            type="button"
            variant="secondary"
          >
            <Trash2 className="size-4 text-error" aria-hidden="true" />
            <span className="text-error">Supprimer</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export function DetailsTabContent({
  activeTab,
  infoRows,
  summaryText,
  website,
}: DetailsTabContentProps) {
  if (activeTab === 'information') {
    return (
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <InfoCard title="Informations cles" icon={Info}>
          <div className="space-y-4">
            {infoRows.map((row) => (
              <InfoRow
                key={row.label}
                icon={row.icon}
                label={row.label}
                value={row.value}
              />
            ))}
          </div>
        </InfoCard>

        <InfoCard title="Liens et contact" icon={Globe}>
          <div className="space-y-4">
            <InfoRow
              icon={Globe}
              label="Site web"
              value={website ?? '—'}
              isLink={Boolean(website)}
            />
          </div>
        </InfoCard>
      </div>
    )
  }

  if (activeTab === 'notes') {
    return (
      <InfoCard title="Notes" icon={StickyNote}>
        <p className="text-base leading-8 text-text-secondary">
          {notesPlaceholder}
        </p>
      </InfoCard>
    )
  }

  if (activeTab === 'applications') {
    return (
      <InfoCard title="Candidatures" icon={BriefcaseBusiness}>
        <PlaceholderBlock
          title="Section a connecter"
          description="La vue Candidatures n'est pas alimentee dans le perimetre actuel. Le bloc est present pour respecter le design du detail entreprise."
        />
      </InfoCard>
    )
  }

  if (activeTab === 'files') {
    return (
      <InfoCard title="Fichiers" icon={FolderOpen}>
        <PlaceholderBlock
          title="Section a connecter"
          description="Les fichiers ne sont pas encore exposes dans les donnees de cette US. Cette carte reste en placeholder visuel."
        />
      </InfoCard>
    )
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.95fr)]">
      <div className="space-y-6">
        <InfoCard title="Resume genere par l'IA" icon={Sparkles}>
          <p className="text-base leading-8 text-text-secondary">
            {summaryText}
          </p>
          <div className="mt-6 flex justify-end">
            <Button className="w-auto" type="button">
              <Sparkles className="size-4" aria-hidden="true" />
              Regenerer le resume
            </Button>
          </div>
        </InfoCard>

        <InfoCard title="Notes" icon={StickyNote}>
          <p className="text-base leading-8 text-text-secondary">
            {notesPlaceholder}
          </p>
          <p className="mt-5 text-sm text-text-secondary">Modifie le : —</p>
        </InfoCard>
      </div>

      <div className="space-y-6">
        <InfoCard title="Informations cles" icon={Info}>
          <div className="space-y-4">
            {infoRows.map((row) => (
              <InfoRow
                key={row.label}
                icon={row.icon}
                label={row.label}
                value={row.value}
              />
            ))}
          </div>
        </InfoCard>

        <InfoCard title="Mots-cles" icon={Tag}>
          <div className="flex flex-wrap gap-3">
            {keywordsPlaceholder.map((keyword) => (
              <span
                key={keyword}
                className="inline-flex min-h-10 items-center rounded-full bg-primary/10 px-4 text-sm font-semibold text-primary"
              >
                {keyword}
              </span>
            ))}
            <button
              className="inline-flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-full border border-border px-3 text-lg font-semibold text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              type="button"
            >
              +
            </button>
          </div>
        </InfoCard>
      </div>
    </div>
  )
}

export function CompanyDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="rounded-[28px] p-5 shadow-small sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[220px_minmax(0,1fr)]">
          <div className="h-56 animate-pulse rounded-[24px] bg-divider" />
          <div className="space-y-5">
            <div className="h-10 w-48 animate-pulse rounded-full bg-divider" />
            <div className="h-5 w-72 animate-pulse rounded-full bg-divider" />
          </div>
        </div>
      </Card>

      <div className="flex gap-3 overflow-hidden border-b border-border pb-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            className="h-10 w-24 animate-pulse rounded-full bg-divider"
            key={index}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.95fr)]">
        <Card className="h-72 animate-pulse rounded-[24px] bg-divider p-0 shadow-small">
          {null}
        </Card>
        <Card className="h-72 animate-pulse rounded-[24px] bg-divider p-0 shadow-small">
          {null}
        </Card>
      </div>
    </div>
  )
}

function InfoCard({ children, icon: Icon, title }: InfoCardProps) {
  return (
    <Card className="rounded-[24px] p-6 shadow-small sm:p-7">
      <div className="mb-5 flex items-center gap-3">
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          {title}
        </h2>
      </div>
      {children}
    </Card>
  )
}

function InfoRow({ icon: Icon, isLink = false, label, value }: InfoRowProps) {
  const content =
    isLink && value !== '—' ? (
      <a
        className="cursor-pointer break-all font-medium text-primary transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        href={value}
        rel="noreferrer"
        target="_blank"
      >
        {value}
      </a>
    ) : (
      <span className="font-medium text-slate-950">{value}</span>
    )

  return (
    <div className="grid gap-3 border-b border-border/70 pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-center">
      <div className="inline-flex items-center gap-3 text-text-secondary">
        <Icon className="size-4" aria-hidden="true" />
        <span>{label}</span>
      </div>
      <div>{content}</div>
    </div>
  )
}

function PlaceholderBlock({ description, title }: PlaceholderBlockProps) {
  return (
    <div className="rounded-[20px] border border-dashed border-border bg-background/60 p-6">
      <p className="text-lg font-semibold text-slate-950">{title}</p>
      <p className="mt-2 text-sm leading-7 text-text-secondary">{description}</p>
    </div>
  )
}
