import {
  BriefcaseBusiness,
  FileText,
  FolderOpen,
  Info,
  StickyNote,
  type LucideIcon,
} from 'lucide-react'

export type DetailsTab = 'summary' | 'information' | 'applications' | 'notes' | 'files'

export const detailsTabs: Array<{
  icon: LucideIcon
  key: DetailsTab
  label: string
}> = [
  { key: 'summary', label: 'Resume', icon: FileText },
  { key: 'information', label: 'Informations', icon: Info },
  { key: 'applications', label: 'Candidatures', icon: BriefcaseBusiness },
  { key: 'notes', label: 'Notes', icon: StickyNote },
  { key: 'files', label: 'Fichiers', icon: FolderOpen },
]
