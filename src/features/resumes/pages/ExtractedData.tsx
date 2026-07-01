import {
  BriefcaseBusiness,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface IExtractedDataCard {
  id: string
  title: string
  count: number
  icon: LucideIcon
  route?: string
}

const cvOptions = [
  {
    id: 'cv-dev-fullstack',
    filename: 'CV_Dev_FullStack.pdf',
  },
]

const extractedDataCards: IExtractedDataCard[] = [
  {
    id: 'education',
    title: 'Formation',
    count: 5,
    icon: GraduationCap,
    route: '/profile/cv/extracted-data/training',
  },
  {
    id: 'skills',
    title: 'Compétences',
    count: 24,
    icon: Sparkles,
  },
  {
    id: 'experiences',
    title: 'Expériences',
    count: 7,
    icon: BriefcaseBusiness,
  },
]

export function ExtractedData() {
  const navigate = useNavigate()

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Données extraites
        </h1>
        <p className="max-w-xl text-base leading-7 text-text-secondary">
          Visualisez les informations extraites de vos CV.
        </p>
      </header>

      <div className="space-y-3">
        <label
          className="block text-sm font-semibold text-text-primary"
          htmlFor="extracted-data-cv"
        >
          CV sélectionné
        </label>
        <div className="relative">
          <select
            className="min-h-12 w-full cursor-pointer appearance-none rounded-input border border-border bg-surface px-4 pr-12 text-sm font-semibold text-text-primary shadow-soft transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent/30"
            defaultValue={cvOptions[0].id}
            id="extracted-data-cv"
          >
            {cvOptions.map((cv) => (
              <option key={cv.id} value={cv.id}>
                {cv.filename}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-text-secondary"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {extractedDataCards.map((card) => (
          <button
            className="group flex w-full cursor-pointer items-center gap-4 rounded-card border border-border bg-surface p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-6"
            key={card.id}
            onClick={() => {
              if (card.route) {
                navigate(card.route)
              }
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
                {card.count} éléments extraits
              </span>
            </span>
            <ChevronRight
              className="size-5 shrink-0 text-text-secondary transition group-hover:translate-x-1 group-hover:text-primary"
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </section>
  )
}
