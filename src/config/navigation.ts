import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  FileText,
  LayoutDashboard,
  Settings,
  type LucideIcon,
} from 'lucide-react'

export type NavigationItem = {
  to: string
  label: string
  icon: LucideIcon
}

export const navigationItems: NavigationItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/applications', label: 'Candidatures', icon: BriefcaseBusiness },
  { to: '/companies', label: 'Entreprises', icon: Building2 },
  { to: '/profile/cv', label: 'Mes CV', icon: FileText },
  { to: '/statistics', label: 'Statistiques', icon: BarChart3 },
  { to: '/settings', label: 'Paramètres', icon: Settings },
]
