import { useEffect, useMemo, type ReactNode } from 'react'
import { ExternalLink, FileText, Mail, MapPin, Phone } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Loader } from '@/components/ui'
import { usePublicGeneratedCv } from '../hooks/usePublicGeneratedCv'
import type { IGeneratedCvRenderData } from '../types/generatedCv.types'
import { formatCvPeriod, formatCvSkillCategory, getCandidateCvErrorMessage } from '../utils/candidateCvHelpers'
import { buildGeneratedCvPublicPath, slugifyCandidateName } from '../utils/generatedCvHelpers'

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function GeneratedCvPublicPage() {
  const navigate = useNavigate()
  const { candidateSlug, publicId } = useParams<{ candidateSlug: string; publicId: string }>()
  const publicIdForQuery = publicId && UUID_PATTERN.test(publicId) ? publicId : ''
  const isPublicIdValid = Boolean(publicIdForQuery)
  const { data, isLoading, error } = usePublicGeneratedCv(publicIdForQuery)

  useEffect(() => {
    if (!data || !candidateSlug || !publicId) return
    const currentPublicId = publicId
    const canonicalPath = buildGeneratedCvPublicPath({
      publicId: currentPublicId,
      firstname: data.firstname,
      lastname: data.lastname,
    })
    if (candidateSlug !== slugifyCandidateName(data.lastname, data.firstname)) {
      navigate(canonicalPath, { replace: true })
    }
  }, [candidateSlug, data, navigate, publicId])

  useEffect(() => {
    const previousTitle = document.title
    const robotsMeta = document.querySelector('meta[name="robots"]')
    const previousRobotsContent = robotsMeta?.getAttribute('content')
    const createdRobotsMeta = robotsMeta ?? document.createElement('meta')

    if (!robotsMeta) {
      createdRobotsMeta.setAttribute('name', 'robots')
      document.head.appendChild(createdRobotsMeta)
    }
    createdRobotsMeta.setAttribute('content', 'noindex, nofollow')

    if (data) {
      document.title = `${data.title} — ${data.firstname} ${data.lastname}`
    }

    return () => {
      document.title = previousTitle
      if (robotsMeta && typeof previousRobotsContent === 'string') {
        robotsMeta.setAttribute('content', previousRobotsContent)
      } else if (!robotsMeta) {
        createdRobotsMeta.remove()
      }
    }
  }, [data])

  if (!isPublicIdValid) {
    return <PublicCvError title="CV introuvable" message="Ce lien est invalide ou ce CV n’est plus accessible." />
  }

  if (isLoading) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-background px-4 py-10">
        <div className="flex items-center gap-3 text-text-secondary" role="status">
          <Loader />
          Chargement du CV...
        </div>
      </main>
    )
  }

  if (error || !data) {
    const isNotFound = (error as { response?: { status?: number } } | null)?.response?.status === 404
    return (
      <PublicCvError
        title={isNotFound ? 'CV introuvable' : 'CV indisponible'}
        message={getCandidateCvErrorMessage(
          error,
          'Ce CV ne peut pas être chargé pour le moment.',
        )}
      />
    )
  }

  return <GeneratedCvContent data={data} />
}

function GeneratedCvContent({ data }: { data: IGeneratedCvRenderData }) {
  const experiences = useMemo(() => [...data.experiences].sort((a, b) => a.position - b.position), [data.experiences])
  const skills = useMemo(() => [...data.skills].sort((a, b) => a.position - b.position), [data.skills])
  const languages = useMemo(() => [...data.languages].sort((a, b) => a.position - b.position), [data.languages])
  const trainings = useMemo(() => [...data.trainings].sort((a, b) => a.position - b.position), [data.trainings])
  const groupedSkills = useMemo(() => {
    const groups = new Map<string, typeof skills>()
    for (const skill of skills) {
      const current = groups.get(skill.category) ?? []
      current.push(skill)
      groups.set(skill.category, current)
    }
    return [...groups.entries()]
  }, [skills])

  return (
    <main className="min-h-dvh bg-background px-4 py-8 text-text-primary sm:px-8 sm:py-12">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-card border border-border bg-surface p-6 shadow-medium sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex size-24 shrink-0 items-center justify-center rounded-full bg-accent/20 text-2xl font-bold text-primary sm:size-28">
              {data.hasAvatar ? <span aria-label="Photo indisponible">{getInitials(data)}</span> : getInitials(data)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">{data.title}</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{data.firstname} {data.lastname}</h1>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-text-secondary">
                {data.email ? <a className="inline-flex items-center gap-2 hover:text-primary" href={`mailto:${data.email}`}><Mail className="size-4" aria-hidden="true" />{data.email}</a> : null}
                {data.phone ? <a className="inline-flex items-center gap-2 hover:text-primary" href={`tel:${data.phone}`}><Phone className="size-4" aria-hidden="true" />{data.phone}</a> : null}
                {data.address ? <span className="inline-flex items-center gap-2"><MapPin className="size-4" aria-hidden="true" />{data.address}</span> : null}
                {data.age !== null && data.age >= 0 ? <span>{data.age} ans</span> : null}
              </div>
              {data.linkedin || data.github ? (
                <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                  {data.linkedin ? <a className="inline-flex items-center gap-2 text-primary hover:underline" href={data.linkedin} rel="noopener noreferrer" target="_blank">LinkedIn<ExternalLink className="size-3" aria-hidden="true" /></a> : null}
                  {data.github ? <a className="inline-flex items-center gap-2 text-primary hover:underline" href={data.github} rel="noopener noreferrer" target="_blank">GitHub<ExternalLink className="size-3" aria-hidden="true" /></a> : null}
                </div>
              ) : null}
            </div>
          </div>
        </header>

        {languages.length > 0 ? <PublicSection title="Langues parlées"><div className="flex flex-wrap gap-2">{languages.map((language) => <span className="rounded-input bg-accent/20 px-3 py-2 text-sm font-semibold" key={`${language.name}-${language.position}`}>{language.name}</span>)}</div></PublicSection> : null}

        {experiences.length > 0 ? <PublicSection title="Expériences professionnelles"><div className="space-y-5">{experiences.map((experience) => <article className="border-l-2 border-primary/30 pl-4" key={`${experience.jobTitle}-${experience.position}`}><div className="flex flex-col justify-between gap-2 sm:flex-row"><h2 className="font-bold">{experience.jobTitle}</h2><span className="text-sm text-text-secondary">{formatCvPeriod(experience.startDate, experience.endDate, experience.isCurrent)}</span></div>{experience.companyName ? <p className="mt-1 text-sm font-medium text-text-secondary">{experience.companyName}</p> : null}{experience.location ? <p className="mt-1 text-sm text-text-secondary">{experience.location}</p> : null}{experience.description ? <p className="mt-3 whitespace-pre-line text-sm leading-6 text-text-secondary">{experience.description}</p> : null}</article>)}</div></PublicSection> : null}

        {groupedSkills.length > 0 ? <PublicSection title="Compétences"><div className="space-y-4">{groupedSkills.map(([category, categorySkills]) => <div key={category}><h2 className="text-sm font-bold text-text-secondary">{formatCvSkillCategory(category)}</h2><div className="mt-2 flex flex-wrap gap-2">{categorySkills.map((skill) => <span className="rounded-input border border-border px-3 py-2 text-sm" key={`${skill.name}-${skill.position}`}>{skill.name}</span>)}</div></div>)}</div></PublicSection> : null}

        {trainings.length > 0 ? <PublicSection title="Formations"><div className="space-y-5">{trainings.map((training) => <article className="border-l-2 border-success/60 pl-4" key={`${training.title}-${training.position}`}><div className="flex flex-col justify-between gap-2 sm:flex-row"><h2 className="font-bold">{training.title}</h2><span className="text-sm text-text-secondary">{formatCvPeriod(training.startDate, training.endDate)}</span></div>{training.organizationName ? <p className="mt-1 text-sm font-medium text-text-secondary">{training.organizationName}</p> : null}{training.degree ? <p className="mt-1 text-sm text-text-secondary">{training.degree}</p> : null}{training.fieldOfStudy ? <p className="mt-1 text-sm text-text-secondary">{training.fieldOfStudy}</p> : null}{training.location ? <p className="mt-1 text-sm text-text-secondary">{training.location}</p> : null}{training.isCertification ? <p className="mt-2 text-xs font-semibold text-text-secondary">{training.certificationType ?? 'Certification'}</p> : null}{training.description ? <p className="mt-3 text-sm leading-6 text-text-secondary">{training.description}</p> : null}</article>)}</div></PublicSection> : null}

        <footer className="flex items-center justify-center gap-2 pt-3 text-xs text-text-secondary"><FileText className="size-4" aria-hidden="true" /> CV partagé depuis CandiTrack</footer>
      </div>
    </main>
  )
}

function PublicSection({ children, title }: { children: ReactNode; title: string }) {
  return <section className="rounded-card border border-border bg-surface p-6 shadow-soft sm:p-8"><h2 className="mb-5 text-xl font-bold">{title}</h2>{children}</section>
}

function PublicCvError({ message, title }: { message: string; title: string }) {
  return <main className="flex min-h-dvh items-center justify-center bg-background px-4 py-10"><Card className="w-full max-w-lg text-center"><h1 className="text-2xl font-bold text-text-primary">{title}</h1><p className="mt-3 text-sm leading-6 text-text-secondary">{message}</p></Card></main>
}

function getInitials(data: Pick<IGeneratedCvRenderData, 'firstname' | 'lastname'>): string {
  return `${data.firstname.charAt(0)}${data.lastname.charAt(0)}`.toUpperCase()
}
