import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function Modal({ children, isOpen, onClose, title }: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const focusInitialElement = () => {
      closeButtonRef.current?.focus();
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = getFocusableElements(dialogRef.current);

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const currentIndex = focusableElements.findIndex(
        (element) => element === document.activeElement,
      );

      event.preventDefault();

      if (event.shiftKey) {
        const previousIndex =
          currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
        focusableElements[previousIndex]?.focus();
        return;
      }

      const nextIndex =
        currentIndex === -1 || currentIndex === focusableElements.length - 1
          ? 0
          : currentIndex + 1;
      focusableElements[nextIndex]?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);
    queueMicrotask(focusInitialElement);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      restoreFocusRef.current?.focus();
      restoreFocusRef.current = null;
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      aria-modal="true"
      className="fixed inset-0 z-60 overflow-y-auto bg-text-primary/30 px-3 py-3 sm:px-4 sm:py-6"
      role="dialog"
      ref={dialogRef}
      tabIndex={-1}
    >
      <button
        aria-label="Fermer la fenetre"
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        tabIndex={-1}
        type="button"
      />

      <div className="relative mx-auto my-0 w-full max-w-150 max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-modal border border-border bg-surface p-5 shadow-large sm:my-6 sm:max-h-[calc(100dvh-3rem)] sm:p-8">
        <div className="flex items-start justify-between gap-4 sm:gap-6">
          <h2
            className="text-lg font-semibold leading-7 text-text-primary sm:text-xl"
            id={titleId}
          >
            {title}
          </h2>
          <button
            aria-label="Fermer"
            className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-secondary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:size-10"
            onClick={onClose}
            type="button"
            ref={closeButtonRef}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 text-sm leading-6 text-text-secondary sm:mt-6" id={descriptionId}>
          {children}
        </div>
      </div>
    </div>
  );
}

function getFocusableElements(container: HTMLElement | null): HTMLElement[] {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      [
        'button:not([disabled])',
        '[href]',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(','),
    ),
  ).filter(
    (element) => !element.hasAttribute('disabled') && element.tabIndex !== -1,
  );
}
