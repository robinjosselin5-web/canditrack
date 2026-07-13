import { Alert, Button, Modal } from '@/components/ui'

interface ConfirmationModalProps {
  isOpen: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  isLoading?: boolean
  error?: string | null
  onConfirm: () => void
  onClose: () => void
}

export function ConfirmationModal({
  cancelLabel = 'Annuler',
  confirmLabel = 'Confirmer',
  isLoading = false,
  isOpen,
  error = null,
  message,
  onClose,
  onConfirm,
  title,
}: ConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        {error ? <Alert variant="error">{error}</Alert> : null}
        <p className="text-sm leading-6 text-text-secondary">{message}</p>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            className="sm:w-auto"
            disabled={isLoading}
            onClick={onClose}
            variant="secondary"
          >
            {cancelLabel}
          </Button>
          <Button
            className="sm:w-auto"
            loading={isLoading}
            onClick={onConfirm}
            variant="danger"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
