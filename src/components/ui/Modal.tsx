import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function Modal({ children, isOpen, onClose, title }: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-labelledby="auth-modal-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-text-primary/30 px-4 py-8"
      role="dialog"
    >
      <button
        aria-label="Fermer la fenetre"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        type="button"
      />

      <div className="relative max-h-full w-full max-w-[600px] overflow-y-auto rounded-modal border border-border bg-surface p-8 shadow-large">
        <div className="flex items-start justify-between gap-6">
          <h2
            className="text-xl font-semibold leading-7 text-text-primary"
            id="auth-modal-title"
          >
            {title}
          </h2>
          <button
            aria-label="Fermer"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-text-secondary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={onClose}
            type="button"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 text-sm leading-6 text-text-secondary">
          {children}
        </div>
      </div>
    </div>
  );
}
