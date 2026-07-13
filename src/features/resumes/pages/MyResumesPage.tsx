import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Alert, Button, Input, Modal } from '@/components/ui'
import { MAX_CV_FILE_SIZE, MAX_CV_LABEL_LENGTH } from '@/config/candidateCvConstants'
import type { ICandidateCvListItem } from '../types/candidateResume.types'
import { CandidateCvCard } from '../components/CandidateCvCard'
import { getCandidateCvErrorMessage } from '../utils/candidateCvHelpers'
import { useCreateCandidateCv } from '../hooks/useCreateCandidateCv'
import { useAnalyzeCandidateCv } from '../hooks/useAnalyzeCandidateCv'
import { useCandidateCvs } from '../hooks/useCandidateCvs'
import { useDeleteCandidateCv } from '../hooks/useDeleteCandidateCv'

export function MyResumesPage() {
  const {
    data: resumes = [],
    isLoading: isLoadingResumes,
    error: resumesError,
  } = useCandidateCvs()
  const createMutation = useCreateCandidateCv()
  const analyzeMutation = useAnalyzeCandidateCv()
  const deleteMutation = useDeleteCandidateCv()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isActionModalOpen, setIsActionModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedResume, setSelectedResume] =
    useState<ICandidateCvListItem | null>(null)
  const [label, setLabel] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fileInputKey, setFileInputKey] = useState(0)

  const resetForm = () => {
    setSelectedFile(null)
    setLabel('')
    setFileInputKey((currentKey) => currentKey + 1)
  }

  const openModal = () => {
    setErrorMessage(null)
    setSuccessMessage(null)
    resetForm()
    setIsModalOpen(true)
  }

  const openActionModal = (resume: ICandidateCvListItem) => {
    setSelectedResume(resume)
    setIsActionModalOpen(true)
  }

  const closeModal = () => {
    if (isSubmitting) {
      return
    }

    setIsModalOpen(false)
    setErrorMessage(null)
  }

  const closeActionModal = () => {
    if (deleteMutation.isPending) {
      return
    }

    setIsActionModalOpen(false)
    setSelectedResume(null)
  }

  const handleImport = async () => {
    if (!selectedFile) {
      setErrorMessage('Selectionne un fichier PDF.')
      return
    }

    if (
      selectedFile.type !== 'application/pdf' &&
      !selectedFile.name.toLowerCase().endsWith('.pdf')
    ) {
      setErrorMessage('Le fichier doit etre au format PDF.')
      return
    }

    if (selectedFile.size <= 0) {
      setErrorMessage('Le fichier selectionne est vide.')
      return
    }

    if (selectedFile.size > MAX_CV_FILE_SIZE) {
      setErrorMessage('Le fichier ne doit pas depasser 10 Mo.')
      return
    }

    if (label.trim().length > MAX_CV_LABEL_LENGTH) {
      setErrorMessage('Le label ne doit pas depasser 50 caracteres.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      await createMutation.mutateAsync({
        file: selectedFile,
        label: label.trim() || undefined,
      })
      setSuccessMessage('Le CV a ete importe avec succes.')
      setIsModalOpen(false)
      resetForm()
    } catch (error) {
      setErrorMessage(getCandidateCvErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAnalyze = async (resumeId: string) => {
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      await analyzeMutation.mutateAsync(resumeId)
      setSuccessMessage('Le CV a été analysé avec succès.')
    } catch (error) {
      setErrorMessage(getCandidateCvErrorMessage(error))
    }
  }

  const handleDelete = async () => {
    if (!selectedResume) {
      return
    }

    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      await deleteMutation.mutateAsync(selectedResume.id)
      setSuccessMessage('Le CV a ete supprime avec succes.')
      setIsActionModalOpen(false)
      setSelectedResume(null)
    } catch (error) {
      setErrorMessage(getCandidateCvErrorMessage(error))
    }
  }

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8 px-1 sm:px-0">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-normal text-text-primary sm:text-4xl">
            Mes CV
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
            Gerez et consultez tous vos CV importes. Vous pouvez ajouter un CV
            et retrouver vos fichiers en un coup d'oeil.
          </p>
        </div>

        <Button className="w-full px-6 sm:w-auto" onClick={openModal}>
          <Plus className="size-5" aria-hidden="true" />
          Ajouter un CV
        </Button>
      </header>

      {successMessage ? <Alert variant="success">{successMessage}</Alert> : null}
      {!isModalOpen && (errorMessage || resumesError) ? (
        <Alert variant="error">{errorMessage ?? getCandidateCvErrorMessage(resumesError)}</Alert>
      ) : null}

      {isLoadingResumes ? (
        <div className="rounded-card border border-border bg-surface px-6 py-12 text-center shadow-medium">
          <p className="text-sm text-text-secondary">Chargement des CV...</p>
        </div>
      ) : resumes.length === 0 && !errorMessage ? (
        <div className="rounded-card border border-dashed border-border bg-surface px-6 py-14 text-center shadow-medium">
          <p className="text-base font-semibold text-text-primary">
            Aucun CV importe pour le moment
          </p>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Ajoute ton premier CV pour le retrouver dans cette liste.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {resumes.map((resume) => (
            <CandidateCvCard
              key={resume.id}
              cv={resume}
              isAnalyzing={analyzeMutation.isPending}
              onAnalyze={(resumeId) => {
                void handleAnalyze(resumeId)
              }}
              onOpenActions={openActionModal}
            />
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Importer un CV">
        <div className="space-y-5">
          {errorMessage ? <Alert variant="error">{errorMessage}</Alert> : null}

          <Input
            accept="application/pdf,.pdf"
            key={fileInputKey}
            label="Fichier PDF"
            name="resumeFile"
            onChange={(event) => {
              setErrorMessage(null)
              setSelectedFile(event.target.files?.[0] ?? null)
            }}
            type="file"
          />

          <Input
            label="Label du CV"
            maxLength={MAX_CV_LABEL_LENGTH}
            name="resumeLabel"
            onChange={(event) => {
              setErrorMessage(null)
              setLabel(event.target.value)
            }}
            placeholder="Ex. CV Developpeur React"
            value={label}
          />

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              className="sm:w-auto"
              disabled={isSubmitting}
              onClick={closeModal}
              variant="secondary"
            >
              Annuler
            </Button>
            <Button
              className="sm:w-auto"
              loading={isSubmitting || createMutation.isPending}
              onClick={handleImport}
            >
              Importer
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isActionModalOpen}
        onClose={closeActionModal}
        title="Supprimer un CV"
      >
        <div className="space-y-5">
          <div className="rounded-card border border-border bg-divider/50 px-4 py-3 text-sm text-text-primary">
            {selectedResume?.originalFilename ?? 'CV selectionne'}
          </div>

          <p className="text-sm leading-6 text-text-secondary">
            Cette action retire ce CV de ta liste.
          </p>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              className="sm:w-auto"
              disabled={deleteMutation.isPending}
              onClick={closeActionModal}
              variant="secondary"
            >
              Annuler
            </Button>
            <Button
              className="sm:w-auto"
              loading={deleteMutation.isPending}
              onClick={() => {
                void handleDelete()
              }}
              variant="danger"
            >
              Supprimer
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  )
}
