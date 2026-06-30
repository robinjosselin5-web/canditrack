import {
  ArrowLeft,
  ChevronRight,
  GraduationCap,
  MoreVertical,
  Plus,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface ITrainingItem {
  id: string
  title: string
  organization: string
  period: string
}

const selectedCvFilename = 'CV_Dev_FullStack.pdf'

const trainingItems: ITrainingItem[] = [
  {
    id: 'master-informatique',
    title: 'Master Informatique',
    organization: 'Université de Technologie',
    period: '2021 - 2023',
  },
  {
    id: 'licence-informatique',
    title: 'Licence Informatique',
    organization: 'Université de Technologie',
    period: '2018 - 2021',
  },
  {
    id: 'dut-informatique',
    title: 'DUT Informatique',
    organization: 'IUT Informatique',
    period: '2016 - 2018',
  },
  {
    id: 'certification-aws',
    title: 'Certification AWS Solutions Architect',
    organization: 'AWS Training',
    period: '2023',
  },
  {
    id: 'certification-scrum',
    title: 'Certification Scrum Master',
    organization: 'Scrum.org',
    period: '2022',
  },
]

export function Training() {
  const navigate = useNavigate()

  const goBackToExtractedData = () => {
    navigate('/profile/cv/extracted-data')
  }

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-7">
      <nav className="flex items-center gap-3 text-sm font-semibold text-text-secondary">
        <button
          aria-label="Retour aux données extraites"
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
            Données extraites
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
          <p className="text-sm font-medium text-text-secondary sm:text-base">
            CV sélectionné : {selectedCvFilename}
          </p>
        </div>

        <button
          className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-button border border-border bg-surface px-6 text-sm font-semibold text-text-primary shadow-soft transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
          type="button"
        >
          Modifier
        </button>
      </header>

      <div className="grid gap-3">
        {trainingItems.map((item) => (
          <article
            className="flex items-center gap-4 rounded-card border border-border bg-surface p-4 shadow-soft sm:p-5"
            key={item.id}
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-input bg-divider text-text-primary sm:size-14">
              <GraduationCap className="size-6" aria-hidden="true" />
            </span>

            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-bold text-text-primary sm:text-base">
                {item.title}
              </h2>
              <p className="mt-1 text-sm font-medium text-text-secondary">
                {item.organization}
              </p>
              <p className="mt-1 text-sm font-medium text-text-secondary sm:hidden">
                {item.period}
              </p>
            </div>

            <p className="hidden shrink-0 text-sm font-medium text-text-secondary sm:block">
              {item.period}
            </p>

            <button
              aria-label={`Options pour ${item.title}`}
              className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-secondary transition hover:bg-divider hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              type="button"
            >
              <MoreVertical className="size-5" aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>

      <button
        className="inline-flex min-h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-input border border-dashed border-border bg-surface/70 px-4 text-sm font-semibold text-text-primary transition hover:border-primary hover:bg-accent/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        type="button"
      >
        <Plus className="size-5" aria-hidden="true" />
        Ajouter un élément
      </button>
    </section>
  )
}
