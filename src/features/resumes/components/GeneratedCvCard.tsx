import { CalendarDays, FileText } from 'lucide-react'
import { formatCvDate } from '../utils/candidateCvHelpers'
import type { IGeneratedCvListItem } from '../types/generatedCv.types'

interface GeneratedCvCardProps {
  cv: IGeneratedCvListItem
  isOpening?: boolean
  onOpen?: (cv: IGeneratedCvListItem) => void
}

export function GeneratedCvCard({ cv, isOpening = false, onOpen }: GeneratedCvCardProps) {
  const content = (
    <>
      <div className="flex size-16 shrink-0 items-center justify-center rounded-input bg-success/15 text-success sm:size-20">
        <FileText className="size-8 sm:size-10" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-bold text-text-primary sm:text-lg">
          {cv.title}
        </h3>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-text-secondary">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="size-4" aria-hidden="true" />
            Créé le {formatCvDate(cv.createdAt)}
          </span>
          <span>{cv.visibility === 'LINK_ONLY' ? 'Lien privé' : 'Privé'}</span>
        </div>
        <ul className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-text-secondary">
          <li className="rounded-input bg-divider px-2.5 py-1">
            {cv.experienceCount} expérience{cv.experienceCount > 1 ? 's' : ''}
          </li>
          <li className="rounded-input bg-divider px-2.5 py-1">
            {cv.skillCount} compétence{cv.skillCount > 1 ? 's' : ''}
          </li>
          <li className="rounded-input bg-divider px-2.5 py-1">
            {cv.languageCount} langue{cv.languageCount > 1 ? 's' : ''}
          </li>
          <li className="rounded-input bg-divider px-2.5 py-1">
            {cv.trainingCount} formation{cv.trainingCount > 1 ? 's' : ''}
          </li>
        </ul>
      </div>
    </>
  )

  if (onOpen) {
    return (
      <button
        aria-label={`Voir le CV ${cv.title}`}
        className="flex w-full cursor-pointer items-center gap-4 rounded-card border border-border bg-surface p-4 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:gap-6 sm:p-5"
        disabled={isOpening}
        onClick={() => onOpen(cv)}
        type="button"
      >
        {content}
        {isOpening ? <span className="text-sm text-text-secondary">Ouverture...</span> : null}
      </button>
    )
  }

  return (
    <article className="flex items-center gap-4 rounded-card border border-border bg-surface p-4 shadow-soft sm:gap-6 sm:p-5">
      {content}
    </article>
  )
}
