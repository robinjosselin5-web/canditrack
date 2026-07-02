import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  BriefcaseBusiness,
  ChevronRight,
  MoreVertical,
  Plus,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button } from '@/components/ui'

interface IExperienceItem {
  id: string
  title: string
  company: string
  description: string
  period: string
}

const experienceItems: IExperienceItem[] = [
  {
    id: 'dev-full-stack',
    title: 'Développeur Full Stack',
    company: 'TechCorp',
    description:
      "Développement d'une application web avec React, Node.js et PostgreSQL.",
    period: "Janv. 2022 - Aujourd'hui",
  },
  {
    id: 'dev-frontend',
    title: 'Développeur Frontend',
    company: 'WebSolutions',
    description: "Création d'interfaces utilisateurs modernes et responsives.",
    period: 'Sept. 2020 - Déc. 2021',
  },
  {
    id: 'dev-web',
    title: 'Développeur Web',
    company: 'DigitalAgency',
    description: 'Intégration de maquettes et développement de sites vitrines.',
    period: 'Janv. 2019 - Août 2020',
  },
]

export function ExperiencesPage() {
  const navigate = useNavigate()
  const [experiences, setExperiences] = useState<IExperienceItem[]>([])
  const [status, setStatus] = useState<'loading' | 'success' | 'empty' | 'error'>(
    'loading',
  )

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        if (experienceItems.length === 0) {
          setExperiences([])
          setStatus('empty')
          return
        }

        setExperiences(experienceItems)
        setStatus('success')
      } catch {
        setStatus('error')
      }
    }, 150)

    return () => {
      window.clearTimeout(timer)
    }
  }, [])

  const goBackToExtractedData = () => {
    navigate('/profile/cv/extracted-data')
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-7">
      <nav className="flex items-center gap-3 text-sm font-semibold text-text-secondary">
        <button
          aria-label="Retour aux données extraites"
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
            Données extraites
          </button>
          <ChevronRight aria-hidden="true" className="size-4" />
          <span className="text-text-primary">Expériences</span>
        </div>
      </nav>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Expériences
          </h1>
        </div>

        <Button className="px-6 sm:w-auto" variant="secondary">
          Modifier
        </Button>
      </header>

      {status === 'loading' ? (
        <div className="rounded-card border border-border bg-surface px-6 py-12 text-center shadow-soft">
          <p className="text-sm text-text-secondary">
            Chargement des expériences...
          </p>
        </div>
      ) : null}

      {status === 'error' ? (
        <Alert variant="error">
          Impossible de charger les expériences pour le moment.
        </Alert>
      ) : null}

      {status === 'empty' ? (
        <div className="rounded-card border border-dashed border-border bg-surface px-6 py-14 text-center shadow-soft">
          <p className="text-base font-semibold text-text-primary">
            Aucune expérience enregistrée
          </p>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Ajoutez une expérience pour la retrouver ici.
          </p>
        </div>
      ) : null}

      {status === 'success' ? (
        <div className="space-y-4">
          {experiences.map((item) => (
            <article
              className="flex items-start gap-4 rounded-card border border-border bg-surface p-4 shadow-soft sm:p-5"
              key={item.id}
            >
              <span className="mt-0.5 hidden size-12 shrink-0 items-center justify-center rounded-input bg-divider text-text-primary sm:inline-flex">
                <BriefcaseBusiness aria-hidden="true" className="size-6" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="text-base font-bold text-text-primary">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-text-secondary">
                      {item.company}
                    </p>
                  </div>

                  <p className="pr-2 text-sm font-medium text-text-secondary sm:text-right">
                    {item.period}
                  </p>
                </div>

                <div className="mt-3 flex items-start justify-between gap-3">
                  <p className="text-sm leading-6 text-text-secondary">
                    {item.description}
                  </p>

                  <button
                    aria-label={`Options pour ${item.title}`}
                    className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-secondary transition hover:bg-divider hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    type="button"
                  >
                    <MoreVertical aria-hidden="true" className="size-5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      <Button className="min-h-14 gap-3 border-dashed" variant="secondary">
        <Plus aria-hidden="true" className="size-5" />
        Ajouter une expérience
      </Button>
    </section>
  )
}
