import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  CircleUserRound,
  FileSearch,
  FileText,
  Folder,
  Home,
  LogOut,
  Settings,
  X,
  type LucideIcon,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '@/routes/paths'

type NavigationItem =
  | { icon: LucideIcon; label: string; to: string }
  | { icon: LucideIcon; label: string; to?: never }

const desktopNavigationItems: NavigationItem[] = [
  { to: ROUTES.DASHBOARD, label: 'Tableau de bord', icon: Home },
  { to: ROUTES.COMPANIES, label: 'Entreprises', icon: Building2 },
  { to: ROUTES.APPLICATIONS, label: 'Candidatures', icon: BriefcaseBusiness },
  { to: ROUTES.STATISTICS, label: 'Statistiques', icon: BarChart3 },
  { label: 'Catégories', icon: Folder },
  { to: ROUTES.SETTINGS, label: 'Paramètres', icon: Settings },
]

const cvSubmenuItems = [
  { to: ROUTES.PROFILE_CV, label: 'Mes CV', icon: FileText },
  {
    to: ROUTES.EXTRACTED_DATA,
    label: 'Données extraites',
    icon: FileSearch,
  },
]

interface ISidebarNavProps {
  isCvMenuOpen: boolean
  isLogoutPending: boolean
  onCloseMobileMenu?: () => void
  onLogout: () => void
  onToggleCvMenu: () => void
  userLabel: string
  variant: 'desktop' | 'mobile'
}

export function SidebarNav({
  isCvMenuOpen,
  isLogoutPending,
  onCloseMobileMenu,
  onLogout,
  onToggleCvMenu,
  userLabel,
  variant,
}: ISidebarNavProps) {
  if (variant === 'desktop') {
    return (
      <aside className="fixed inset-y-0 left-0 hidden w-70 border-r border-border bg-surface px-5 py-8 lg:flex lg:flex-col">
        <div className="mb-12 flex items-center gap-4">
          <CircleUserRound className="size-12 text-accent" aria-hidden="true" />
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-text-primary">
              {userLabel}
            </p>
            <p className="truncate text-sm text-text-secondary">Admin</p>
          </div>
        </div>

        <SidebarLinks
          isCvMenuOpen={isCvMenuOpen}
          onCloseMobileMenu={undefined}
          onToggleCvMenu={onToggleCvMenu}
        />

        <SidebarLogout isLogoutPending={isLogoutPending} onLogout={onLogout} />
      </aside>
    )
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        aria-label="Fermer le menu mobile"
        className="absolute inset-0 cursor-pointer bg-text-primary/30"
        onClick={() => {
          onCloseMobileMenu?.()
        }}
        type="button"
      />

      <aside className="relative flex h-full w-[min(88vw,320px)] flex-col border-r border-border bg-surface px-5 py-6 shadow-large">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <CircleUserRound
              className="size-12 shrink-0 text-accent"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-text-primary">
                {userLabel}
              </p>
              <p className="truncate text-sm text-text-secondary">Admin</p>
            </div>
          </div>

          <button
            aria-label="Fermer le menu"
            className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-secondary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={() => {
              onCloseMobileMenu?.()
            }}
            type="button"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <SidebarLinks
          isCvMenuOpen={isCvMenuOpen}
          onCloseMobileMenu={onCloseMobileMenu}
          onToggleCvMenu={onToggleCvMenu}
        />

        <SidebarLogout isLogoutPending={isLogoutPending} onLogout={onLogout} />
      </aside>
    </div>
  )
}

function SidebarLinks({
  isCvMenuOpen,
  onCloseMobileMenu,
  onToggleCvMenu,
}: {
  isCvMenuOpen: boolean
  onCloseMobileMenu?: () => void
  onToggleCvMenu: () => void
}) {
  return (
    <nav className="space-y-2" aria-label="Navigation principale">
      {desktopNavigationItems.map((item) =>
        item.to ? (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              [
                'flex min-h-12 cursor-pointer items-center gap-4 rounded-button px-4 text-sm font-semibold transition',
                isActive
                  ? 'bg-accent/20 text-primary'
                  : 'text-text-secondary hover:bg-divider hover:text-text-primary',
              ].join(' ')
            }
            onClick={() => {
              onCloseMobileMenu?.()
            }}
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

      <div className="pt-2">
        <button
          aria-expanded={isCvMenuOpen}
          className="flex min-h-12 w-full items-center justify-between rounded-button px-4 text-sm font-semibold text-text-secondary transition hover:bg-divider hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={onToggleCvMenu}
          type="button"
        >
          <span className="inline-flex items-center gap-4">
            <FileText className="size-5" aria-hidden="true" />
            CV
          </span>
          <ChevronDown
            className={[
              'size-4 transition-transform',
              isCvMenuOpen ? 'rotate-180' : 'rotate-0',
            ].join(' ')}
            aria-hidden="true"
          />
        </button>

        {isCvMenuOpen ? (
          <div className="mt-2 space-y-2 pl-4">
            {cvSubmenuItems.map((item) => (
              <NavLink
                key={item.label}
                end={item.to === ROUTES.PROFILE_CV}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'flex min-h-11 items-center gap-4 rounded-button px-4 text-sm font-semibold transition',
                    isActive
                      ? 'bg-accent/20 text-primary'
                      : 'text-text-secondary hover:bg-divider hover:text-text-primary',
                  ].join(' ')
                }
                onClick={() => {
                  onCloseMobileMenu?.()
                }}
              >
                <item.icon className="size-4" aria-hidden="true" />
                {item.label}
              </NavLink>
            ))}
          </div>
        ) : null}
      </div>
    </nav>
  )
}

function SidebarLogout({
  isLogoutPending,
  onLogout,
}: {
  isLogoutPending: boolean
  onLogout: () => void
}) {
  return (
    <button
      className="mt-auto inline-flex min-h-12 cursor-pointer items-center gap-4 border-t border-border pt-8 text-sm font-semibold text-text-secondary transition hover:text-error focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
      disabled={isLogoutPending}
      onClick={onLogout}
      type="button"
    >
      <LogOut className="size-5" aria-hidden="true" />
      Déconnexion
    </button>
  )
}
