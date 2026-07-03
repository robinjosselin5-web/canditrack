import { HelpCircle } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { BrandLogoLink } from "@/components/BrandLogoLink";
import { Modal } from "@/components/ui";

type AuthModalType = "help" | "privacy" | "terms" | null;

export function AuthLayout() {
  const [activeModal, setActiveModal] = useState<AuthModalType>(null);

  return (
    <main className="h-dvh overflow-hidden bg-surface text-text-primary">
      <div className="grid h-full min-h-0 lg:grid-cols-[42%_58%]">
        <aside className="relative hidden min-h-0 overflow-hidden border-r border-divider bg-accent/10 px-10 py-8 lg:flex lg:flex-col">
          <BrandLogoLink />

          <div className="my-auto max-w-sm">
            <h2 className="text-4xl font-bold leading-tight">
              Gerez toutes vos{" "}
              <span className="text-primary">candidatures</span> au meme endroit
            </h2>
            <p className="mt-6 text-lg leading-8 text-text-secondary">
              Suivez vos candidatures, organisez vos entretiens et boostez votre
              recherche d'emploi.
            </p>
          </div>

          <div className="relative mb-8 h-56 max-w-sm">
            <div className="absolute bottom-0 left-0 size-48 rounded-full bg-accent/20" />
            <div className="absolute bottom-4 left-8 w-72 rounded-card border border-border bg-surface p-6 shadow-large">
              <div className="mb-6 flex gap-2">
                <span className="size-2 rounded-full bg-accent" />
                <span className="size-2 rounded-full bg-accent/70" />
                <span className="size-2 rounded-full bg-accent/40" />
              </div>
              <div className="grid grid-cols-[80px_1fr] gap-6">
                <div className="size-20 rounded-full bg-linear-to-br from-primary to-accent" />
                <div className="space-y-3">
                  <span className="block h-3 w-16 rounded-full bg-divider" />
                  <span className="block h-3 w-32 rounded-full bg-divider" />
                  <span className="block h-3 w-28 rounded-full bg-divider" />
                </div>
              </div>
              <div className="mt-6 h-16 rounded-input bg-accent/10 p-4">
                <div className="flex h-full items-end gap-2">
                  <span className="h-4 flex-1 rounded-full bg-primary/60" />
                  <span className="h-7 flex-1 rounded-full bg-primary/80" />
                  <span className="h-5 flex-1 rounded-full bg-accent" />
                  <span className="h-10 flex-1 rounded-full bg-primary" />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="flex h-full min-h-0 flex-col bg-background/70 px-5 py-4 sm:px-8 lg:px-10">
          <div className="relative z-20 mb-3 flex justify-end">
            <button
              className="inline-flex cursor-pointer items-center gap-2 rounded-button px-3 py-2 text-sm font-medium text-text-secondary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onClick={() => setActiveModal("help")}
              type="button"
            >
              Besoin d'aide ?
              <HelpCircle className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative z-0 flex min-h-0 flex-1 items-center justify-center">
            <div className="w-full">
              <Outlet />
            </div>
          </div>

          <footer className="relative z-10 mt-3 flex flex-wrap justify-center gap-4 border-t border-divider pt-4 text-sm text-text-secondary sm:gap-6">
            <span>(c) 2026 CandiTrack. Tous droits reserves.</span>
            <button
              className="cursor-pointer font-medium transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onClick={() => setActiveModal("privacy")}
              type="button"
            >
              Confidentialite
            </button>
            <button
              className="cursor-pointer font-medium transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onClick={() => setActiveModal("terms")}
              type="button"
            >
              Conditions d'utilisation
            </button>
          </footer>
        </section>
      </div>

      <Modal
        isOpen={activeModal === "help"}
        onClose={() => setActiveModal(null)}
        title="Besoin d'aide"
      >
        <p>
          Un contenu d'assistance sera ajoute prochainement. Cette section
          pourra guider l'utilisateur sur la creation de compte, la connexion et
          la recuperation de mot de passe.
        </p>
      </Modal>

      <Modal
        isOpen={activeModal === "privacy"}
        onClose={() => setActiveModal(null)}
        title="Confidentialite"
      >
        <p>
          Un contenu de confidentialite sera ajoute prochainement. Cette section
          presentera les principes de collecte, de protection et d'utilisation
          des donnees personnelles dans CandiTrack.
        </p>
      </Modal>

      <Modal
        isOpen={activeModal === "terms"}
        onClose={() => setActiveModal(null)}
        title="Conditions d'utilisation"
      >
        <p>
          Un contenu de conditions d'utilisation sera ajoute prochainement.
          Cette section precisera les regles d'acces au service, les
          responsabilites de l'utilisateur et les limites d'utilisation de
          CandiTrack.
        </p>
      </Modal>
    </main>
  );
}
