import { useEffect, useMemo, useState } from 'react'
import { AxiosError } from 'axios'
import {
  BriefcaseBusiness,
  ChevronRight,
  GraduationCap,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '@/components/ui'
import type { IApiResponse } from '@/types/api'
import {
  getCandidateCvExtractedData,
  getCandidateCvs,
} from '../services/candidateResumeService'
import type {
  ICandidateCvExtractedDataResponse,
  ICandidateCvListItem,
} from '../types/candidateResume.types'
import { getCandidateCvErrorMessage } from '../utils/candidateCvHelpers'

interface IExtractedDataCard {
  id: string
  title: string
  count: number
  icon: LucideIcon
  route: string
}

export function ExtractedDataPage() {
  const navigate = useNavigate()
  const { cvId } = useParams<{ cvId?: string }>()
  const [candidateCvs, setCandidateCvs] = useState<ICandidateCvListItem[]>([])
  const [isLoadingCvs, setIsLoadingCvs] = useState(true)
  const [pageStatus, setPageStatus] = useState<'loading' | 'success' | 'empty' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [extractedData, setExtractedData] = useState<ICandidateCvExtractedDataResponse | null>(null)

  const analyzedCvs = useMemo(
    () => candidateCvs.filter((candidateCv) => candidateCv.analysisStatus === 'COMPLETED'),
    [candidateCvs],
  )

  const selectedCv = useMemo(
    () => analyzedCvs.find((candidateCv) => candidateCv.id === cvId) ?? null,
    [analyzedCvs, cvId],
  )
  const hasNoAnalyzedCvs = !isLoadingCvs && analyzedCvs.length === 0

  useEffect(() => {
    let cancelled = false

    const loadCandidateCvs = async () => {
      setIsLoadingCvs(true)
      setErrorMessage(null)

      try {
        const cvs = await getCandidateCvs()

        if (cancelled) {
          return
        }

        setCandidateCvs(cvs)
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(getCandidateCvErrorMessage(error))
          setPageStatus('error')
        }
      } finally {
        if (!cancelled) {
          setIsLoadingCvs(false)
        }
      }
    }

    void loadCandidateCvs()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (isLoadingCvs) {
      return
    }

    if (analyzedCvs.length === 0) {
      return
    }

    if (!cvId || !selectedCv) {
      navigate(`/profile/cv/${analyzedCvs[0].id}/extracted-data`, { replace: true })
      return
    }

    let cancelled = false

    const loadExtractedData = async () => {
      setPageStatus('loading')
      setErrorMessage(null)

      try {
        const response = await getCandidateCvExtractedData(selectedCv.id)

        if (cancelled) {
          return
        }

        setExtractedData(response)
        setPageStatus('success')
      } catch (error) {
        if (!cancelled) {
          setExtractedData(null)
          setErrorMessage(getExtractedDataErrorMessage(error))
          setPageStatus('error')
        }
      }
    }

    void loadExtractedData()

    return () => {
      cancelled = true
    }
  }, [analyzedCvs, cvId, isLoadingCvs, navigate, selectedCv])

  const extractedDataCards: IExtractedDataCard[] = extractedData
    ? [
        {
          id: 'experiences',
          title: 'Experiences',
          count: extractedData.experiences.length,
          icon: BriefcaseBusiness,
          route: `/profile/cv/${extractedData.cvId}/extracted-data/experiences`,
        },
        {
          id: 'skills',
          title: 'Competences',
          count: extractedData.skills.length,
          icon: Sparkles,
          route: `/profile/cv/${extractedData.cvId}/extracted-data/skills`,
        },
        {
          id: 'training',
          title: 'Formation',
          count: extractedData.trainings.length,
          icon: GraduationCap,
          route: `/profile/cv/${extractedData.cvId}/extracted-data/training`,
        },
      ]
    : []

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Donnees extraites
        </h1>
        <p className="max-w-xl text-base leading-7 text-text-secondary">
          Visualisez les informations extraites de vos CV.
        </p>
      </header>

      {errorMessage ? <Alert variant="error">{errorMessage}</Alert> : null}

      {isLoadingCvs ? (
        <div className="rounded-card border border-border bg-surface px-6 py-12 text-center shadow-soft">
          <p className="text-sm text-text-secondary">Chargement des CV...</p>
        </div>
      ) : null}

      {hasNoAnalyzedCvs ? (
        <div className="rounded-card border border-dashed border-border bg-surface px-6 py-14 text-center shadow-soft">
          <p className="text-base font-semibold text-text-primary">
            Aucun CV analyse disponible
          </p>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Analysez un CV depuis la page Mes CV pour afficher ses donnees extraites ici.
          </p>
        </div>
      ) : null}

      {!isLoadingCvs && analyzedCvs.length > 0 ? (
        <div className="space-y-4">
          <label className="block" htmlFor="candidate-cv-select">
            <span className="mb-2 block text-sm font-semibold text-text-primary">
              CV analyse
            </span>
            <select
              className="min-h-12 w-full cursor-pointer appearance-none rounded-input border border-border bg-surface px-4 pr-10 text-base font-semibold text-text-primary shadow-small outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              id="candidate-cv-select"
              onChange={(event) => {
                navigate(`/profile/cv/${event.target.value}/extracted-data`)
              }}
              value={selectedCv?.id ?? ''}
            >
              {analyzedCvs.map((candidateCv) => (
                <option key={candidateCv.id} value={candidateCv.id}>
                  {candidateCv.label}
                </option>
              ))}
            </select>
          </label>

          {selectedCv ? (
            <div className="rounded-card border border-border bg-surface px-5 py-4 shadow-soft">
              <p className="text-base font-semibold text-text-primary">
                {selectedCv.label}
              </p>
              <p className="mt-1 text-sm text-text-secondary">
                {selectedCv.originalFilename}
              </p>
            </div>
          ) : null}

          {pageStatus === 'loading' ? (
            <div className="rounded-card border border-border bg-surface px-6 py-12 text-center shadow-soft">
              <p className="text-sm text-text-secondary">
                Chargement des donnees extraites...
              </p>
            </div>
          ) : null}

          {pageStatus === 'error' ? (
            <Alert variant="error">
              {errorMessage ?? 'Impossible de charger les donnees extraites pour le moment.'}
            </Alert>
          ) : null}

          {pageStatus === 'success' ? (
            <div className="grid gap-4">
              {extractedDataCards.map((card) => (
                <button
                  className="group flex w-full cursor-pointer items-center gap-4 rounded-card border border-border bg-surface p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-6"
                  key={card.id}
                  onClick={() => {
                    navigate(card.route)
                  }}
                  type="button"
                >
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-input bg-divider text-primary transition group-hover:bg-accent/30">
                    <card.icon className="size-7" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-bold text-text-primary">
                      {card.title}
                    </span>
                    <span className="mt-1 block text-sm font-medium text-text-secondary">
                      {card.count} elements extraits
                    </span>
                  </span>
                  <ChevronRight
                    className="size-5 shrink-0 text-text-secondary transition group-hover:translate-x-1 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}

function getExtractedDataErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const response = error.response?.data as IApiResponse<unknown> | undefined

    if (!error.response) {
      return "L'API est indisponible. Verifiez que le backend est demarre."
    }

    return (
      response?.message ??
      'Impossible de charger les donnees extraites pour le moment.'
    )
  }

  return 'Impossible de charger les donnees extraites pour le moment.'
}
