import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CircleUserRound,
  ChevronDown,
  FileSearch,
  FileText,
  Folder,
  Home,
  LogOut,
  Menu,
  Settings,
  X,
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
  { to: '/statistics', label: 'Statistiques', icon: BarChart3 },
  { label: 'Catégories', icon: Folder },
  { to: '/settings', label: 'Paramètres', icon: Settings },
]

const cvSubmenuItems = [
  { to: '/profile/cv', label: 'Mes CV', icon: FileText },
  {
    to: '/profile/cv/extracted-data',
    label: 'Données extraites',
    icon: FileSearch,
  },
]

function isNavigationLink(
  item: DesktopNavigationItem,
): item is Extract<DesktopNavigationItem, { to: string }> {
  return typeof item.to === 'string'
}

export interface IAppLayoutOutletContext {
  openMobileMenu: () => void
}

export function AppLayout() {
  const location = useLocation()
  const { user } = useAuthStore()
  const logoutMutation = useLogout()
  const userLabel = user ? `${user.firstname} ${user.lastname}` : 'Utilisateur'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCvMenuOpen, setIsCvMenuOpen] = useState(true)
  const mobilePageTitle = getMobilePageTitle(location.pathname)

  return (
    <div className="min-h-dvh bg-background text-text-primary">
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

        <nav className="space-y-2" aria-label="Navigation principale">
          {desktopNavigationItems.map((item) =>
            isNavigationLink(item) ? (
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
              onClick={() => {
                setIsCvMenuOpen((currentValue) => !currentValue)
              }}
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
                    end={item.to === '/profile/cv'}
                    to={item.to}
                    className={({ isActive }) =>
                      [
                        'flex min-h-11 items-center gap-4 rounded-button px-4 text-sm font-semibold transition',
                        isActive
                          ? 'bg-accent/20 text-primary'
                          : 'text-text-secondary hover:bg-divider hover:text-text-primary',
                      ].join(' ')
                    }
                  >
                    <item.icon className="size-4" aria-hidden="true" />
                    {item.label}
                  </NavLink>
                ))}
              </div>
            ) : null}
          </div>
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

      <div className="min-h-dvh lg:pb-0 lg:pl-70">
        <div className="sticky top-0 z-30 bg-background/95 px-4 py-4 backdrop-blur lg:hidden">
          <div className="grid grid-cols-[40px_1fr_40px] items-center gap-4">
            <button
              aria-label="Ouvrir le menu"
              className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onClick={() => {
                setIsMobileMenuOpen(true)
              }}
              type="button"
            >
              <Menu className="size-6" aria-hidden="true" />
            </button>
            <p className="truncate text-center text-lg font-bold text-text-primary">
              {mobilePageTitle}
            </p>
            <span aria-hidden="true" />
          </div>
        </div>

        <main className="min-h-dvh px-4 py-6 sm:px-8 lg:px-10 lg:py-16">
          <Outlet
            context={{
              openMobileMenu: () => {
                setIsMobileMenuOpen(true)
              },
            }}
          />
        </main>
      </div>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Fermer le menu mobile"
            className="absolute inset-0 cursor-pointer bg-text-primary/30"
            onClick={() => {
              setIsMobileMenuOpen(false)
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
                  setIsMobileMenuOpen(false)
                }}
                type="button"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="space-y-2" aria-label="Navigation mobile secondaire">
              {desktopNavigationItems.map((item) =>
                isNavigationLink(item) ? (
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
                      setIsMobileMenuOpen(false)
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
                  onClick={() => {
                    setIsCvMenuOpen((currentValue) => !currentValue)
                  }}
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
                        end={item.to === '/profile/cv'}
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
                          setIsMobileMenuOpen(false)
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

            <button
              className="mt-auto inline-flex min-h-12 cursor-pointer items-center gap-4 border-t border-border pt-6 text-sm font-semibold text-text-secondary transition hover:text-error focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
              disabled={logoutMutation.isPending}
              onClick={() => logoutMutation.mutate()}
              type="button"
            >
              <LogOut className="size-5" aria-hidden="true" />
              Déconnexion
            </button>
          </aside>
        </div>
      ) : null}

    </div>
  )
}

function getMobilePageTitle(pathname: string): string {
  if (pathname.startsWith('/profile/cv')) {
    return 'CV'
  }

  if (pathname.startsWith('/companies')) {
    return 'Entreprises'
  }

  if (pathname.startsWith('/applications')) {
    return 'Candidatures'
  }

  if (pathname.startsWith('/statistics')) {
    return 'Statistiques'
  }

  if (pathname.startsWith('/settings')) {
    return 'Paramètres'
  }

  return 'CandiTrack'
}
