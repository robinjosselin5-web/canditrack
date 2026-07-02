import { useEffect, useState } from 'react'
import { ArrowLeft, ChevronRight, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button } from '@/components/ui'

interface ISkillCategory {
  id: string
  title: string
  skills: string[]
}

const skillCategories: ISkillCategory[] = [
  {
    id: 'languages',
    title: 'Langages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL', 'PHP'],
  },
  {
    id: 'frameworks',
    title: 'Frameworks & Bibliothèques',
    skills: ['React', 'Next.js', 'Node.js', 'Express.js', 'NestJS', 'Tailwind'],
  },
  {
    id: 'tools',
    title: 'Outils & Technologies',
    skills: ['Git', 'Docker', 'PostgreSQL', 'MongoDB', 'AWS', 'CI/CD'],
  },
  {
    id: 'methodologies',
    title: 'Méthodologies',
    skills: ['Agile', 'Scrum', 'Kanban', 'TDD', 'Clean Code'],
  },
  {
    id: 'soft-skills',
    title: 'Soft Skills',
    skills: ["Travail d'équipe", 'Autonomie', 'Rigueur', 'Communication'],
  },
]

export function SkillsPage() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<ISkillCategory[]>([])
  const [status, setStatus] = useState<'loading' | 'success' | 'empty' | 'error'>(
    'loading',
  )

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        if (skillCategories.length === 0) {
          setCategories([])
          setStatus('empty')
          return
        }

        setCategories(skillCategories)
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
          <span className="text-text-primary">Compétences</span>
        </div>
      </nav>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Compétences
          </h1>
        </div>

        <Button className="px-6 sm:w-auto" variant="secondary">
          Modifier
        </Button>
      </header>

      {status === 'loading' ? (
        <div className="rounded-card border border-border bg-surface px-6 py-12 text-center shadow-soft">
          <p className="text-sm text-text-secondary">
            Chargement des compétences...
          </p>
        </div>
      ) : null}

      {status === 'error' ? (
        <Alert variant="error">
          Impossible de charger les compétences pour le moment.
        </Alert>
      ) : null}

      {status === 'empty' ? (
        <div className="rounded-card border border-dashed border-border bg-surface px-6 py-14 text-center shadow-soft">
          <p className="text-base font-semibold text-text-primary">
            Aucune compétence enregistrée
          </p>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Ajoutez des compétences pour les retrouver ici.
          </p>
        </div>
      ) : null}

      {status === 'success' ? (
        <div className="space-y-6">
          {categories.map((category) => (
            <section className="space-y-3" key={category.id}>
              <h2 className="text-base font-bold text-text-primary">
                {category.title}
              </h2>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    className="inline-flex min-h-10 items-center rounded-input border border-border bg-surface px-4 text-sm font-medium text-text-primary shadow-soft"
                    key={skill}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : null}

      <Button className="min-h-14 gap-3 border-dashed" variant="secondary">
        <Plus aria-hidden="true" className="size-5" />
        Ajouter une compétence
      </Button>
    </section>
  )
}
