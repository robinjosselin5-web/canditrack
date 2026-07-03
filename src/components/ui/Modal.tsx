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
      className="fixed inset-0 z-[60] overflow-y-auto bg-text-primary/30 px-3 py-3 sm:px-4 sm:py-6"
      role="dialog"
    >
      <button
        aria-label="Fermer la fenetre"
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        type="button"
      />

      <div className="relative mx-auto my-0 w-full max-w-[600px] max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-modal border border-border bg-surface p-5 shadow-large sm:my-6 sm:max-h-[calc(100dvh-3rem)] sm:p-8">
        <div className="flex items-start justify-between gap-4 sm:gap-6">
          <h2
            className="text-lg font-semibold leading-7 text-text-primary sm:text-xl"
            id="auth-modal-title"
          >
            {title}
          </h2>
          <button
            aria-label="Fermer"
            className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-secondary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:size-10"
            onClick={onClose}
            type="button"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 text-sm leading-6 text-text-secondary sm:mt-6">
          {children}
        </div>
      </div>
    </div>
  );
}
