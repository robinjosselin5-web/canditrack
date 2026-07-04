import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ChevronRight, Plus } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert, Button } from '@/components/ui'
import { getCandidateCvExtractedData } from '../services/candidateResumeService'
import type { ICandidateCvExtractedDataResponse } from '../types/candidateResume.types'
import {
  formatCvSkillCategory,
  getCandidateCvErrorMessage,
} from '../utils/candidateCvHelpers'

export function SkillsPage() {
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

    const loadSkills = async () => {
      setStatus('loading')
      setErrorMessage(null)

      try {
        const response = await getCandidateCvExtractedData(cvId)

        if (cancelled) {
          return
        }

        setExtractedData(response)
        setStatus(response.skills.length > 0 ? 'success' : 'empty')
      } catch (error) {
        if (!cancelled) {
          setStatus('error')
          setErrorMessage(getCandidateCvErrorMessage(error))
        }
      }
    }

    void loadSkills()

    return () => {
      cancelled = true
    }
  }, [cvId])

  const groupedSkills = useMemo(() => {
    if (!extractedData) {
      return []
    }

    const orderedCategories = [
      'LANGUAGES',
      'FRAMEWORKS_LIBRARIES',
      'TOOLS_TECHNOLOGIES',
      'METHODOLOGIES',
      'SOFT_SKILLS',
      'OTHER',
    ] as const

    return orderedCategories
      .map((category) => ({
        category,
        title: formatCvSkillCategory(category),
        skills: extractedData.skills.filter((skill) => skill.category === category),
      }))
      .filter((group) => group.skills.length > 0)
  }, [extractedData])

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
          <span className="text-text-primary">Competences</span>
        </div>
      </nav>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Competences
          </h1>
          {extractedData ? (
            <p className="text-sm text-text-secondary">
              {extractedData.cv.label || extractedData.cv.originalFilename}
            </p>
          ) : null}
        </div>

        <Button className="px-6 sm:w-auto" variant="secondary">
          Modifier
        </Button>
      </header>

      {status === 'loading' ? (
        <div className="rounded-card border border-border bg-surface px-6 py-12 text-center shadow-soft">
          <p className="text-sm text-text-secondary">Chargement des competences...</p>
        </div>
      ) : null}

      {status === 'error' ? (
        <Alert variant="error">
          {hasMissingCvId
            ? 'Identifiant de CV manquant.'
            : errorMessage ?? 'Impossible de charger les competences pour le moment.'}
        </Alert>
      ) : null}

      {status === 'empty' ? (
        <div className="rounded-card border border-dashed border-border bg-surface px-6 py-14 text-center shadow-soft">
          <p className="text-base font-semibold text-text-primary">
            Aucune competence extraite
          </p>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Ce CV ne contient pas encore de competence exploitable.
          </p>
        </div>
      ) : null}

      {status === 'success' ? (
        <div className="space-y-6">
          {groupedSkills.map((category) => (
            <section className="space-y-3" key={category.category}>
              <h2 className="text-base font-bold text-text-primary">
                {category.title}
              </h2>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, index) => (
                  <span
                    className="inline-flex min-h-10 items-center rounded-input border border-border bg-surface px-4 text-sm font-medium text-text-primary shadow-soft"
                    key={`${skill.name}-${index}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : null}

      <Button className="min-h-14 gap-3 border-dashed" variant="secondary">
        <Plus aria-hidden="true" className="size-5" />
        Ajouter une competence
      </Button>
    </section>
  )
}
