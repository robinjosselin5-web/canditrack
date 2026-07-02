import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Alert, Card } from '@/components/ui'

export function CompaniesSkeleton() {
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

export function EmptyCompaniesState() {
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
          className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-button bg-linear-to-r from-primary to-violet-700 px-4 text-sm font-semibold text-white shadow-small transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Plus className="size-5" aria-hidden="true" />
          Ajouter une entreprise
        </Link>
      </div>
    </Card>
  )
}

export function CompaniesErrorState() {
  return (
    <Alert variant="error">
      Impossible de charger les entreprises. Veuillez réessayer.
    </Alert>
  )
}
