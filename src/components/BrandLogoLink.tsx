import { Link } from "react-router-dom";
import logoUrl from "@/assets/logo.png";

interface BrandLogoLinkProps {
  variant?: "horizontal" | "stacked";
}

export function BrandLogoLink({ variant = "horizontal" }: BrandLogoLinkProps) {
  if (variant === "stacked") {
    return (
      <Link
        to="/"
        aria-label="Retour a l'accueil CandiTrack"
        className="mx-auto inline-flex cursor-pointer flex-col items-center rounded-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <span className="flex size-24 items-center justify-center rounded-modal bg-accent/20 shadow-small">
          <img
            src={logoUrl}
            alt=""
            className="size-14 object-contain"
            aria-hidden="true"
          />
        </span>
        <span className="mt-4 text-3xl font-bold text-text-primary">
          Candi<span className="text-primary">Track</span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      to="/"
      aria-label="Retour a l'accueil CandiTrack"
      className="inline-flex cursor-pointer items-center gap-3 rounded-input focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <span className="flex size-10 items-center justify-center rounded-input bg-primary shadow-small">
        <img
          src={logoUrl}
          alt=""
          className="size-7 object-contain"
          aria-hidden="true"
        />
      </span>
      <span className="text-2xl font-bold">CandiTrack</span>
    </Link>
  );
}
