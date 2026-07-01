import { CalendarDays, FileText, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui'
import type { ICandidateCvListItem } from '../types/candidateResume.types'
import { formatCvDate } from '../utils/candidateCvHelpers'

interface CandidateCvCardProps {
  cv: ICandidateCvListItem
  isAnalyzing: boolean
  onAnalyze: (cvId: string) => void
  onOpenActions: (cv: ICandidateCvListItem) => void
}

export function CandidateCvCard({
  cv,
  isAnalyzing,
  onAnalyze,
  onOpenActions,
}: CandidateCvCardProps) {
  return (
    <article className="flex items-center gap-5 rounded-card border border-border bg-surface p-5 shadow-medium transition hover:-translate-y-0.5 hover:shadow-large sm:gap-8 sm:p-8">
      <div className="flex size-20 shrink-0 items-center justify-center rounded-input bg-accent/20 text-primary sm:size-24">
        <FileText className="size-10" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="truncate text-base font-bold text-text-primary sm:text-lg">
          {cv.originalFilename}
        </h2>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            className="w-full sm:w-auto"
            disabled={isAnalyzing}
            loading={isAnalyzing}
            onClick={() => onAnalyze(cv.id)}
            variant="secondary"
          >
            Analyser
          </Button>
          <span className="inline-flex items-center gap-2 text-sm text-text-secondary">
            <CalendarDays className="size-4" aria-hidden="true" />
            Ajoute le {formatCvDate(cv.uploadedAt)}
          </span>
        </div>
      </div>

      <button
        aria-label={`Actions pour ${cv.originalFilename}`}
        className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-button text-text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        onClick={() => onOpenActions(cv)}
        type="button"
      >
        <MoreVertical className="size-5" aria-hidden="true" />
      </button>
    </article>
  )
}
