import { Clock3, Mail, Send, UserRound, XCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { CompanyStatus } from '../types/company.types'

export const statusLabels: Record<CompanyStatus, string> = {
  accepted: 'Acceptée',
  draft: 'Brouillon',
  follow_up: 'À relancer',
  interview: 'Entretien',
  no_response: 'Sans réponse',
  pending: 'En attente',
  rejected: 'Refusée',
}

export const statusStyles: Record<CompanyStatus, string> = {
  accepted: 'bg-status-accepted/45 text-emerald-700',
  draft: 'bg-status-draft/45 text-slate-700',
  follow_up: 'bg-status-follow-up/45 text-violet-700',
  interview: 'bg-status-interview/45 text-emerald-700',
  no_response: 'bg-status-no-response/45 text-amber-700',
  pending: 'bg-status-pending/20 text-blue-700',
  rejected: 'bg-status-rejected/45 text-red-700',
}

export const statusIcons: Record<CompanyStatus, LucideIcon> = {
  accepted: Send,
  draft: Clock3,
  follow_up: Clock3,
  interview: UserRound,
  no_response: Clock3,
  pending: Mail,
  rejected: XCircle,
}
