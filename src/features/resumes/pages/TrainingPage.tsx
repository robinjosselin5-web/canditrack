import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ChevronRight,
  GraduationCap,
  MoreVertical,
  Plus,
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '@/components/ui'
import { getCandidateCvExtractedData } from '../services/candidateResumeService'
import type { ICandidateCvExtractedDataResponse } from '../types/candidateResume.types'
import { formatCvPeriod, getCandidateCvErrorMessage } from '../utils/candidateCvHelpers'

export function TrainingPage() {
  const navigate = useNavigate()
  const { cvId } = useParams<{ cvId?: string }>()
  const [extractedData, setExtractedData] = useState<ICandidateCvExtractedDataResponse | null>(null)
  const [status, setStatus] = useState<'loading' | 'success' | 'empty' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const hasMissingCvId = !cvId

  useEffect(() => {
    if (!cvId) {
      return
    }

    let cancelled = false

    const loadTrainings = async () => {
      setStatus('loading')
      setErrorMessage(null)

      try {
        const response = await getCandidateCvExtractedData(cvId)

        if (cancelled) {
          return
        }

        setExtractedData(response)
        setStatus(response.trainings.length > 0 ? 'success' : 'empty')
      } catch (error) {
        if (!cancelled) {
          setStatus('error')
          setErrorMessage(getCandidateCvErrorMessage(error))
        }
      }
    }

    void loadTrainings()

    return () => {
      cancelled = true
    }
  }, [cvId])

  const goBackToExtractedData = () => {
    navigate(cvId ? `/profile/cv/${cvId}/extracted-data` : '/profile/cv/extracted-data')
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
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Formation
          </h1>
          {extractedData ? (
            <p className="text-sm text-text-secondary">
              {extractedData.cv.label || extractedData.cv.originalFilename}
            </p>
          ) : null}
        </div>

        <button
          className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-button border border-border bg-surface px-6 text-sm font-semibold text-text-primary shadow-soft transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
          type="button"
        >
          Modifier
        </button>
      </header>

      {status === 'loading' ? (
        <div className="rounded-card border border-border bg-surface px-6 py-12 text-center shadow-soft">
          <p className="text-sm text-text-secondary">Chargement des formations...</p>
        </div>
      ) : null}

      {status === 'error' ? (
        <Alert variant="error">
          {hasMissingCvId
            ? 'Identifiant de CV manquant.'
            : errorMessage ?? 'Impossible de charger les formations pour le moment.'}
        </Alert>
      ) : null}

      {status === 'empty' ? (
        <div className="rounded-card border border-dashed border-border bg-surface px-6 py-14 text-center shadow-soft">
          <p className="text-base font-semibold text-text-primary">
            Aucune formation extraite
          </p>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Ce CV ne contient pas encore de formation exploitable.
          </p>
        </div>
      ) : null}

      {status === 'success' && extractedData ? (
        <div className="grid gap-3">
          {extractedData.trainings.map((training, index) => (
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
                  {formatCvPeriod(training.startDate, training.endDate)}
                </p>
              </div>

              <p className="hidden shrink-0 text-sm font-medium text-text-secondary sm:block">
                {formatCvPeriod(training.startDate, training.endDate)}
              </p>

              <button
                aria-label={`Options pour ${training.title}`}
                className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-secondary transition hover:bg-divider hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                type="button"
              >
                <MoreVertical className="size-5" aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      ) : null}

      <button
        className="inline-flex min-h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-input border border-dashed border-border bg-surface/70 px-4 text-sm font-semibold text-text-primary transition hover:border-primary hover:bg-accent/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        type="button"
      >
        <Plus className="size-5" aria-hidden="true" />
        Ajouter un element
      </button>
    </section>
  )
}
