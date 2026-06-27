import { NavLink, Outlet } from 'react-router-dom'
import { CircleUserRound } from 'lucide-react'
import { navigationItems } from '@/config/navigation'
import { useAuthStore } from '@/store/auth.store'

export function AppLayout() {
  const { user } = useAuthStore()
  const userLabel = user ? `${user.firstname} ${user.lastname}` : 'Utilisateur'

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <aside className="fixed inset-y-0 left-0 hidden w-[280px] border-r border-border bg-surface px-4 py-5 lg:flex lg:flex-col">
        <div className="mb-8 px-3">
          <p className="text-sm font-medium text-text-secondary">CandiTrack</p>
          <p className="mt-1 text-xl font-bold text-text-primary">
            Suivi candidatures
          </p>
        </div>

        <nav className="space-y-1" aria-label="Navigation principale">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-primary text-white shadow-small'
                    : 'text-text-secondary hover:bg-divider hover:text-text-primary',
                ].join(' ')
              }
            >
              <item.icon className="size-4" aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto flex items-center gap-3 border-t border-divider px-3 pt-5">
          <CircleUserRound className="size-6 text-primary" aria-hidden="true" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-text-primary">
              {userLabel}
            </p>
            <p className="truncate text-xs text-text-secondary">
              {user?.email ?? 'Session active'}
            </p>
          </div>
        </div>
      </aside>

      <div className="lg:pl-[280px]">
        <header className="sticky top-0 z-10 flex min-h-[72px] items-center border-b border-border bg-surface/90 px-5 backdrop-blur">
          <div className="flex w-full items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-text-secondary">
                CandiTrack
              </p>
              <p className="text-lg font-bold text-text-primary lg:hidden">
                Suivi candidatures
              </p>
            </div>
            <NavLink
              to="/settings"
              className="rounded-button border border-border bg-surface px-4 py-2 text-sm font-semibold text-text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Parametres
            </NavLink>
          </div>
        </header>

        <main className="px-5 py-6 sm:px-8 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
