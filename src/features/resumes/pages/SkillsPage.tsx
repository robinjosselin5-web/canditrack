import { useMemo } from 'react'
import { ArrowLeft, ChevronRight, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button } from '@/components/ui'
import { ROUTES } from '@/routes/paths'
import { useProfileExtractedData } from '../hooks/useProfileExtractedData'
import {
  formatCvSkillCategory,
  getCandidateCvErrorMessage,
} from '../utils/candidateCvHelpers'

export function SkillsPage() {
  const navigate = useNavigate()
  const { data, isLoading, error } = useProfileExtractedData()
  const skills = data?.skills

  const groupedSkills = useMemo(() => {
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
        skills: (skills ?? []).filter((skill) => skill.category === category),
      }))
      .filter((group) => group.skills.length > 0)
  }, [skills])

  const goBackToExtractedData = () => {
    navigate(ROUTES.EXTRACTED_DATA)
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
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Competences
        </h1>
        <Button className="px-6 sm:w-auto" disabled variant="secondary">
          Modifier
        </Button>
      </header>

      {isLoading ? (
        <div className="rounded-card border border-border bg-surface px-6 py-12 text-center shadow-soft">
          <p className="text-sm text-text-secondary">Chargement des competences...</p>
        </div>
      ) : null}

      {error ? (
        <Alert variant="error">
          {getCandidateCvErrorMessage(
            error,
            'Impossible de charger les competences pour le moment.',
          )}
        </Alert>
      ) : null}

      {!isLoading && !error && (skills?.length ?? 0) === 0 ? (
        <div className="rounded-card border border-dashed border-border bg-surface px-6 py-14 text-center shadow-soft">
          <p className="text-base font-semibold text-text-primary">
            Aucune competence extraite
          </p>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Aucun CV analyse ne contient encore de competence exploitable.
          </p>
        </div>
      ) : null}

      {!isLoading && !error && (skills?.length ?? 0) > 0 ? (
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

      <Button className="min-h-14 gap-3 border-dashed" disabled variant="secondary">
        <Plus aria-hidden="true" className="size-5" />
        Ajouter une competence
      </Button>
    </section>
  )
}
