import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { useLogout } from '@/features/auth'
import { ROUTES } from '@/routes/paths'
import { useAuthStore } from '@/store/auth.store'
import { SidebarNav } from './SidebarNav'

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
      <SidebarNav
        isCvMenuOpen={isCvMenuOpen}
        isLogoutPending={logoutMutation.isPending}
        onCloseMobileMenu={() => {
          setIsMobileMenuOpen(false)
        }}
        onLogout={() => logoutMutation.mutate()}
        onToggleCvMenu={() => {
          setIsCvMenuOpen((currentValue) => !currentValue)
        }}
        userLabel={userLabel}
        variant="desktop"
      />

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
        <SidebarNav
          isCvMenuOpen={isCvMenuOpen}
          isLogoutPending={logoutMutation.isPending}
          onCloseMobileMenu={() => {
            setIsMobileMenuOpen(false)
          }}
          onLogout={() => logoutMutation.mutate()}
          onToggleCvMenu={() => {
            setIsCvMenuOpen((currentValue) => !currentValue)
          }}
          userLabel={userLabel}
          variant="mobile"
        />
      ) : null}
    </div>
  )
}

function getMobilePageTitle(pathname: string): string {
  if (pathname.startsWith(ROUTES.PROFILE_CV)) {
    return 'CV'
  }

  if (pathname.startsWith(ROUTES.COMPANIES)) {
    return 'Entreprises'
  }

  if (pathname.startsWith(ROUTES.APPLICATIONS)) {
    return 'Candidatures'
  }

  if (pathname.startsWith(ROUTES.STATISTICS)) {
    return 'Statistiques'
  }

  if (pathname.startsWith(ROUTES.SETTINGS)) {
    return 'Paramètres'
  }

  return 'CandiTrack'
}
