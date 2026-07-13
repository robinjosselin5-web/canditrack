import {
  ArrowLeft,
  ChevronRight,
  GraduationCap,
  MoreVertical,
  Plus,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button } from '@/components/ui'
import { ROUTES } from '@/routes/paths'
import { useProfileExtractedData } from '../hooks/useProfileExtractedData'
import { formatCvPeriod, getCandidateCvErrorMessage } from '../utils/candidateCvHelpers'

export function TrainingPage() {
  const navigate = useNavigate()
  const { data, isLoading, error } = useProfileExtractedData()
  const trainings = data?.trainings ?? []

  const goBackToExtractedData = () => {
    navigate(ROUTES.EXTRACTED_DATA)
  }

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-7">
      <nav className="flex items-center gap-3 text-sm font-semibold text-text-secondary">
        <button
          aria-label="Retour aux donnees extraites"
          className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={goBackToExtractedData}
          type="button"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
        </button>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            className="cursor-pointer transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={goBackToExtractedData}
            type="button"
          >
            Donnees extraites
          </button>
          <ChevronRight className="size-4" aria-hidden="true" />
          <span className="text-text-primary">Formation</span>
        </div>
      </nav>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Formation
        </h1>
        <Button className="px-6 sm:w-auto" disabled variant="secondary" type="button">
          Modifier
        </Button>
      </header>

      {isLoading ? (
        <div className="rounded-card border border-border bg-surface px-6 py-12 text-center shadow-soft">
          <p className="text-sm text-text-secondary">Chargement des formations...</p>
        </div>
      ) : null}

      {error ? (
        <Alert variant="error">
          {getCandidateCvErrorMessage(
            error,
            'Impossible de charger les formations pour le moment.',
          )}
        </Alert>
      ) : null}

      {!isLoading && !error && trainings.length === 0 ? (
        <div className="rounded-card border border-dashed border-border bg-surface px-6 py-14 text-center shadow-soft">
          <p className="text-base font-semibold text-text-primary">
            Aucune formation extraite
          </p>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Aucun CV analyse ne contient encore de formation exploitable.
          </p>
        </div>
      ) : null}

      {!isLoading && !error && trainings.length > 0 ? (
        <div className="grid gap-3">
          {trainings.map((training, index) => {
            const period = formatCvPeriod(training.startDate, training.endDate)

            return (
              <article
                className="flex items-center gap-4 rounded-card border border-border bg-surface p-4 shadow-soft sm:p-5"
                key={`${training.title}-${training.organizationName ?? 'unknown'}-${index}`}
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-input bg-divider text-text-primary sm:size-14">
                  <GraduationCap className="size-6" aria-hidden="true" />
                </span>

                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-bold text-text-primary sm:text-base">
                    {training.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-text-secondary">
                    {training.organizationName ?? 'Organisme non precise'}
                  </p>
                  {training.degree ? (
                    <p className="mt-1 text-sm text-text-secondary">{training.degree}</p>
                  ) : null}
                  {training.fieldOfStudy ? (
                    <p className="mt-1 text-sm text-text-secondary">{training.fieldOfStudy}</p>
                  ) : null}
                  {training.location ? (
                    <p className="mt-1 text-sm text-text-secondary">{training.location}</p>
                  ) : null}
                  {training.description ? (
                    <p className="mt-2 text-sm leading-6 text-text-secondary">
                      {training.description}
                    </p>
                  ) : null}
                  {training.isCertification ? (
                    <span className="mt-2 inline-flex min-h-8 items-center rounded-input border border-border bg-divider px-3 text-xs font-semibold uppercase tracking-wide text-text-primary">
                      Certification
                    </span>
                  ) : null}
                  <p className="mt-1 text-sm font-medium text-text-secondary sm:hidden">
                    {period}
                  </p>
                </div>

                <p className="hidden shrink-0 text-sm font-medium text-text-secondary sm:block">
                  {period}
                </p>

                <button
                  aria-label={`Options pour ${training.title}`}
                  disabled
                  className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-secondary transition hover:bg-divider hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  type="button"
                >
                  <MoreVertical className="size-5" aria-hidden="true" />
                </button>
              </article>
            )
          })}
        </div>
      ) : null}

      <Button className="min-h-14 gap-3 border-dashed" disabled variant="secondary" type="button">
        <Plus className="size-5" aria-hidden="true" />
        Ajouter un element
      </Button>
    </section>
  )
}
