import {
  BriefcaseBusiness,
  ChevronRight,
  GraduationCap,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button } from '@/components/ui'
import { ROUTES } from '@/routes/paths'
import { useProfileExtractedData } from '../hooks/useProfileExtractedData'
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
  const { data: extractedData, isLoading, error } = useProfileExtractedData()
  const hasNoExtractedData = extractedData
    ? extractedData.experiences.length === 0 &&
      extractedData.skills.length === 0 &&
      extractedData.trainings.length === 0
    : false

  const extractedDataCards: IExtractedDataCard[] = extractedData
    ? [
        {
          id: 'experiences',
          title: 'Experiences',
          count: extractedData.experiences.length,
          icon: BriefcaseBusiness,
          route: ROUTES.EXTRACTED_DATA_EXPERIENCES,
        },
        {
          id: 'skills',
          title: 'Competences',
          count: extractedData.skills.length,
          icon: Sparkles,
          route: ROUTES.EXTRACTED_DATA_SKILLS,
        },
        {
          id: 'training',
          title: 'Formation',
          count: extractedData.trainings.length,
          icon: GraduationCap,
          route: ROUTES.EXTRACTED_DATA_TRAINING,
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
          Visualisez les informations extraites de l'ensemble des CV analyses de votre profil.
        </p>
      </header>

      {isLoading ? (
        <div className="rounded-card border border-border bg-surface px-6 py-12 text-center shadow-soft">
          <p className="text-sm text-text-secondary">Chargement des donnees extraites...</p>
        </div>
      ) : null}

      {error ? (
        <Alert variant="error">
          {getCandidateCvErrorMessage(
            error,
            'Impossible de charger les donnees extraites pour le moment.',
          )}
        </Alert>
      ) : null}

      {!isLoading && !error && hasNoExtractedData ? (
        <div className="rounded-card border border-dashed border-border bg-surface px-6 py-14 text-center shadow-soft">
          <p className="text-base font-semibold text-text-primary">
            Aucune donnee extraite disponible
          </p>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Importez puis analysez au moins un CV depuis la page Mes CV pour afficher les donnees de votre profil.
          </p>
          <Button
            className="mt-5 sm:w-auto"
            onClick={() => navigate(ROUTES.PROFILE_CV)}
            type="button"
          >
            Gerer mes CV
          </Button>
        </div>
      ) : null}

      {!isLoading && !error && extractedData && !hasNoExtractedData ? (
        <div className="grid gap-4">
          {extractedDataCards.map((card) => (
            <button
              className="group flex w-full cursor-pointer items-center gap-4 rounded-card border border-border bg-surface p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-6"
              key={card.id}
              onClick={() => navigate(card.route)}
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
    </section>
  )
}
