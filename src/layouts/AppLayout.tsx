import { NavLink, Outlet } from 'react-router-dom'
import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CircleUserRound,
  FileText,
  Folder,
  Home,
  LogOut,
  MoreHorizontal,
  Settings,
  type LucideIcon,
} from 'lucide-react'
import { useLogout } from '@/features/auth'
import { useAuthStore } from '@/store/auth.store'

type DesktopNavigationItem =
  | {
      icon: LucideIcon
      label: string
      to: string
    }
  | {
      icon: LucideIcon
      label: string
      to?: never
    }

const desktopNavigationItems: DesktopNavigationItem[] = [
  { to: '/dashboard', label: 'Tableau de bord', icon: Home },
  { to: '/companies', label: 'Entreprises', icon: Building2 },
  { to: '/applications', label: 'Candidatures', icon: BriefcaseBusiness },
  { to: '/resumes', label: 'CV', icon: FileText },
  { to: '/statistics', label: 'Statistiques', icon: BarChart3 },
  { label: 'Catégories', icon: Folder },
  { to: '/settings', label: 'Paramètres', icon: Settings },
]

const mobileNavigationItems = [
  { to: '/dashboard', label: 'Accueil', icon: Home },
  { to: '/companies', label: 'Entreprises', icon: Building2 },
  { to: '/applications', label: 'Candidatures', icon: BriefcaseBusiness },
  { to: '/settings', label: 'Plus', icon: MoreHorizontal },
]

function isNavigationLink(
  item: DesktopNavigationItem,
): item is Extract<DesktopNavigationItem, { to: string }> {
  return typeof item.to === 'string'
}

export function AppLayout() {
  const { user } = useAuthStore()
  const logoutMutation = useLogout()
  const userLabel = user ? `${user.firstname} ${user.lastname}` : 'Utilisateur'

  return (
    <div className="min-h-dvh bg-background text-text-primary">
      <aside className="fixed inset-y-0 left-0 hidden w-[280px] border-r border-border bg-surface px-5 py-8 lg:flex lg:flex-col">
        <div className="mb-12 flex items-center gap-4">
          <CircleUserRound
            className="size-12 text-accent"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-text-primary">
              {userLabel}
            </p>
            <p className="truncate text-sm text-text-secondary">Admin</p>
          </div>
        </div>

        <nav className="space-y-2" aria-label="Navigation principale">
          {desktopNavigationItems.map((item) =>
            isNavigationLink(item) ? (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'flex min-h-12 items-center gap-4 rounded-button px-4 text-sm font-semibold transition',
                    isActive
                      ? 'bg-accent/20 text-primary'
                      : 'text-text-secondary hover:bg-divider hover:text-text-primary',
                  ].join(' ')
                }
              >
                <item.icon className="size-5" aria-hidden="true" />
                {item.label}
              </NavLink>
            ) : (
              <span
                key={item.label}
                className="flex min-h-12 items-center gap-4 rounded-button px-4 text-sm font-semibold text-text-secondary"
                aria-disabled="true"
              >
                <item.icon className="size-5" aria-hidden="true" />
                {item.label}
              </span>
            ),
          )}
        </nav>

        <button
          className="mt-auto inline-flex min-h-12 cursor-pointer items-center gap-4 border-t border-border pt-8 text-sm font-semibold text-text-secondary transition hover:text-error focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
          disabled={logoutMutation.isPending}
          onClick={() => logoutMutation.mutate()}
          type="button"
        >
          <LogOut className="size-5" aria-hidden="true" />
          Déconnexion
        </button>
      </aside>

      <div className="min-h-dvh pb-24 lg:pb-0 lg:pl-[280px]">
        <main className="min-h-dvh px-4 py-6 sm:px-8 lg:px-10 lg:py-16">
          <Outlet />
        </main>
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 rounded-t-card border border-border bg-surface px-2 pb-4 pt-3 shadow-large lg:hidden"
        aria-label="Navigation mobile"
      >
        {mobileNavigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                'flex min-h-14 flex-col items-center justify-center gap-1 rounded-button text-xs font-semibold transition',
                isActive
                  ? 'text-primary'
                  : 'text-text-secondary hover:text-text-primary',
              ].join(' ')
            }
          >
            <item.icon className="size-5" aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
