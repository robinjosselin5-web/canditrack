import { NavLink, Outlet } from "react-router-dom";
import { Bell, ChevronDown, CircleUserRound, LogOut } from "lucide-react";
import { BrandLogoLink } from "@/components/BrandLogoLink";
import { navigationItems } from "@/config/navigation";
import { useLogout } from "@/features/auth";
import { useAuthStore } from "@/store/auth.store";

export function AppLayout() {
  const { user } = useAuthStore();
  const logoutMutation = useLogout();
  const userLabel = user ? `${user.firstname} ${user.lastname}` : "Utilisateur";

  return (
    <div className="bg-background text-text-primary">
      <aside className="fixed inset-y-0 left-0 hidden w-[260px] border-r border-border bg-surface px-5 py-6 lg:flex lg:flex-col">
        <div className="mb-16">
          <BrandLogoLink />
        </div>

        <div className="mb-12 flex items-center gap-4">
          <CircleUserRound
            className="size-14 text-status-draft"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-text-primary">
              {userLabel}
            </p>
            <p className="truncate text-sm text-text-secondary">
              {user?.email ?? "Session active"}
            </p>
          </div>
        </div>

        <nav className="space-y-3" aria-label="Navigation principale">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "flex min-h-14 items-center gap-4 rounded-button px-4 text-base font-semibold transition",
                  isActive
                    ? "bg-accent/15 text-primary shadow-small"
                    : "text-text-secondary hover:bg-divider hover:text-text-primary",
                ].join(" ")
              }
            >
              <item.icon className="size-5" aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="mt-auto inline-flex min-h-12 cursor-pointer items-center gap-4 rounded-button px-4 text-base font-semibold text-red-500 transition hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
          disabled={logoutMutation.isPending}
          onClick={() => logoutMutation.mutate()}
          type="button"
        >
          <LogOut className="size-5" aria-hidden="true" />
          Se deconnecter
        </button>
      </aside>

      <div className="flex min-h-0 flex-col lg:pl-[260px]">
        <header className="sticky top-0 z-10 flex min-h-24 items-center border-b border-border bg-surface/90 px-5 backdrop-blur sm:px-8 lg:px-10">
          <div className="flex w-full items-center justify-between gap-4">
            <div className="lg:hidden">
              <BrandLogoLink />
            </div>
            <div className="ml-auto flex items-center gap-5">
              <button
                aria-label="Notifications"
                className="relative inline-flex size-11 items-center justify-center rounded-full text-text-secondary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                type="button"
              >
                <Bell className="size-6" aria-hidden="true" />
                <span className="absolute right-1 top-1 inline-flex size-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  3
                </span>
              </button>
              <NavLink
                to="/settings"
                className="inline-flex items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <CircleUserRound
                  className="size-12 text-status-draft"
                  aria-hidden="true"
                />
                <ChevronDown
                  className="size-5 text-text-secondary"
                  aria-hidden="true"
                />
              </NavLink>
            </div>
            <NavLink
              to="/settings"
              className="hidden rounded-button border border-border bg-surface px-4 py-2 text-sm font-semibold text-text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Parametres
            </NavLink>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-hidden px-5 py-6 sm:px-8 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
