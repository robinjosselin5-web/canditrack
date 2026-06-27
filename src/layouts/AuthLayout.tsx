import { BarChart3, HelpCircle } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <main className="min-h-screen bg-background text-text-primary">
      <div className="grid min-h-screen lg:grid-cols-[42%_58%]">
        <aside className="hidden border-r border-divider bg-primary/5 px-10 py-10 lg:flex lg:flex-col">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-input bg-primary text-white shadow-small">
              <BarChart3 className="size-5" aria-hidden="true" />
            </span>
            <span className="text-2xl font-bold">CandiTrack</span>
          </div>

          <div className="my-auto max-w-sm">
            <h2 className="text-3xl font-bold leading-tight">
              Gerez toutes vos{' '}
              <span className="text-primary">candidatures</span> au meme
              endroit
            </h2>
            <p className="mt-6 text-base leading-7 text-text-secondary">
              Suivez vos candidatures, organisez vos entretiens et boostez
              votre recherche d'emploi.
            </p>
          </div>
        </aside>

        <section className="flex min-h-screen flex-col px-4 py-6 sm:px-8 lg:px-10">
          <div className="mb-8 flex justify-end">
            <span className="inline-flex items-center gap-2 text-sm text-text-secondary">
              Besoin d'aide ?
              <HelpCircle className="size-5" aria-hidden="true" />
            </span>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="w-full">
              <Outlet />
            </div>
          </div>

          <footer className="mt-8 hidden justify-center gap-6 border-t border-divider pt-6 text-sm text-text-secondary lg:flex">
            <span>(c) 2026 CandiTrack. Tous droits reserves.</span>
            <span>Confidentialite</span>
            <span>Conditions d'utilisation</span>
          </footer>
        </section>
      </div>
    </main>
  )
}
