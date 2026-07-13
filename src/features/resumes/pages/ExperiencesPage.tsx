import { useEffect, useState } from 'react'
import { ArrowLeft, BriefcaseBusiness, ChevronRight, MoreVertical, Plus } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert, Button } from '@/components/ui'
import { getCandidateCvExtractedData } from '../services/candidateResumeService'
import type { ICandidateCvExtractedDataResponse } from '../types/candidateResume.types'
import { formatCvPeriod, getCandidateCvErrorMessage } from '../utils/candidateCvHelpers'

export function ExperiencesPage() {
  const navigate = useNavigate()
  const { cvId } = useParams<{ cvId?: string }>()
  const [extractedData, setExtractedData] = useState<ICandidateCvExtractedDataResponse | null>(null)
  const [status, setStatus] = useState<'loading' | 'success' | 'empty' | 'error'>(() =>
    cvId ? 'loading' : 'error',
  )
  const [errorMessage, setErrorMessage] = useState<string | null>(() =>
    cvId ? null : 'Identifiant de CV manquant.',
  )
  const hasMissingCvId = !cvId

  useEffect(() => {
    if (!cvId) {
      return
    }

    let cancelled = false

    const loadExperiences = async () => {
      setStatus('loading')
      setErrorMessage(null)

      try {
        const response = await getCandidateCvExtractedData(cvId)

        if (cancelled) {
          return
        }

        setExtractedData(response)
        setStatus(response.experiences.length > 0 ? 'success' : 'empty')
      } catch (error) {
        if (!cancelled) {
          setStatus('error')
          setErrorMessage(getCandidateCvErrorMessage(error))
        }
      }
    }

    void loadExperiences()

    return () => {
      cancelled = true
    }
  }, [cvId])

  const goBackToExtractedData = () => {
    navigate(cvId ? `/profile/cv/${cvId}/extracted-data` : '/profile/cv/extracted-data')
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-7">
      <nav className="flex items-center gap-3 text-sm font-semibold text-text-secondary">
        <button
          aria-label="Retour aux donnees extraites"
          className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={goBackToExtractedData}
          type="button"
        >
          <ArrowLeft aria-hidden="true" className="size-5" />
        </button>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            className="cursor-pointer transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={goBackToExtractedData}
            type="button"
          >
            Donnees extraites
          </button>
          <ChevronRight aria-hidden="true" className="size-4" />
          <span className="text-text-primary">Experiences</span>
        </div>
      </nav>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Experiences
          </h1>
          {extractedData ? (
            <p className="text-sm text-text-secondary">
              {extractedData.cv.label || extractedData.cv.originalFilename}
            </p>
          ) : null}
        </div>

        <Button className="px-6 sm:w-auto" disabled variant="secondary">
          Modifier
        </Button>
      </header>

      {status === 'loading' ? (
        <div className="rounded-card border border-border bg-surface px-6 py-12 text-center shadow-soft">
          <p className="text-sm text-text-secondary">Chargement des experiences...</p>
        </div>
      ) : null}

      {status === 'error' ? (
        <Alert variant="error">
          {hasMissingCvId
            ? 'Identifiant de CV manquant.'
            : errorMessage ?? 'Impossible de charger les experiences pour le moment.'}
        </Alert>
      ) : null}

      {status === 'empty' ? (
        <div className="rounded-card border border-dashed border-border bg-surface px-6 py-14 text-center shadow-soft">
          <p className="text-base font-semibold text-text-primary">
            Aucune experience extraite
          </p>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Ce CV ne contient pas encore d'experience exploitable.
          </p>
        </div>
      ) : null}

      {status === 'success' && extractedData ? (
        <div className="space-y-4">
          {extractedData.experiences.map((experience, index) => (
            <article
              className="flex items-start gap-4 rounded-card border border-border bg-surface p-4 shadow-soft sm:p-5"
              key={`${experience.jobTitle}-${experience.companyName ?? 'unknown'}-${index}`}
            >
              <span className="mt-0.5 hidden size-12 shrink-0 items-center justify-center rounded-input bg-divider text-text-primary sm:inline-flex">
                <BriefcaseBusiness aria-hidden="true" className="size-6" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="text-base font-bold text-text-primary">
                      {experience.jobTitle}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-text-secondary">
                      {experience.companyName ?? 'Entreprise non precisee'}
                    </p>
                    {experience.location ? (
                      <p className="mt-1 text-sm text-text-secondary">
                        {experience.location}
                      </p>
                    ) : null}
                  </div>

                  <p className="pr-2 text-sm font-medium text-text-secondary sm:text-right">
                    {formatCvPeriod(
                      experience.startDate,
                      experience.endDate,
                      experience.isCurrent,
                    )}
                  </p>
                </div>

                {experience.description ? (
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <p className="text-sm leading-6 text-text-secondary">
                      {experience.description}
                    </p>

                    <button
                      aria-label={`Options pour ${experience.jobTitle}`}
                      disabled
                      className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-secondary transition hover:bg-divider hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      type="button"
                    >
                      <MoreVertical aria-hidden="true" className="size-5" />
                    </button>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      ) : null}

      <Button className="min-h-14 gap-3 border-dashed" disabled variant="secondary">
        <Plus aria-hidden="true" className="size-5" />
        Ajouter une experience
      </Button>
    </section>
  )
}
