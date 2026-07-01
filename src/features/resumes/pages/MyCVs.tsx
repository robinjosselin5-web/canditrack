import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { CalendarDays, FileText, MoreVertical, Plus } from 'lucide-react'
import { Alert, Button, Input, Modal } from '@/components/ui'
import {
  analyzeCandidateCv,
  createCandidateCv,
  deleteCandidateCv,
  getCandidateCvs,
} from '../services/candidateCvService'
import type { ICandidateCvListItem } from '../types/candidateCv.types'

const MAX_CV_FILE_SIZE = 10 * 1024 * 1024

export function MyCVs() {
  const [cvs, setCvs] = useState<ICandidateCvListItem[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isActionModalOpen, setIsActionModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedCv, setSelectedCv] = useState<ICandidateCvListItem | null>(
    null,
  )
  const [label, setLabel] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingCvs, setIsLoadingCvs] = useState(false)
  const [analyzingCvId, setAnalyzingCvId] = useState<string | null>(null)
  const [deletingCvId, setDeletingCvId] = useState<string | null>(null)
  const [fileInputKey, setFileInputKey] = useState(0)

  useEffect(() => {
    void refreshCvs(setCvs, setIsLoadingCvs, setErrorMessage)
  }, [])

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

  const openActionModal = (cv: ICandidateCvListItem) => {
    setSelectedCv(cv)
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
    if (deletingCvId) {
      return
    }

    setIsActionModalOpen(false)
    setSelectedCv(null)
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

    if (label.trim().length > 50) {
      setErrorMessage('Le label ne doit pas depasser 50 caracteres.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      await createCandidateCv({
        file: selectedFile,
        label: label.trim() || undefined,
      })

      await refreshCvs(setCvs, setIsLoadingCvs, setErrorMessage)
      setSuccessMessage('Le CV a ete importe avec succes.')
      setIsModalOpen(false)
      resetForm()
    } catch (error) {
      setErrorMessage(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAnalyze = async (cvId: string) => {
    setAnalyzingCvId(cvId)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      await analyzeCandidateCv(cvId)
      await refreshCvs(setCvs, setIsLoadingCvs, setErrorMessage)
      setSuccessMessage('Le CV a ete analyse avec succes.')
    } catch (error) {
      setErrorMessage(getErrorMessage(error))
    } finally {
      setAnalyzingCvId(null)
    }
  }

  const handleDelete = async () => {
    if (!selectedCv) {
      return
    }

    setDeletingCvId(selectedCv.id)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      await deleteCandidateCv(selectedCv.id)
      await refreshCvs(setCvs, setIsLoadingCvs, setErrorMessage)
      setSuccessMessage('Le CV a ete supprime avec succes.')
      setIsActionModalOpen(false)
      setSelectedCv(null)
    } catch (error) {
      setErrorMessage(getErrorMessage(error))
    } finally {
      setDeletingCvId(null)
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
      {!isModalOpen && errorMessage ? (
        <Alert variant="error">{errorMessage}</Alert>
      ) : null}

      {isLoadingCvs ? (
        <div className="rounded-card border border-border bg-surface px-6 py-12 text-center shadow-medium">
          <p className="text-sm text-text-secondary">Chargement des CV...</p>
        </div>
      ) : cvs.length === 0 ? (
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
          {cvs.map((cv) => (
            <article
              key={cv.id}
              className="flex items-center gap-5 rounded-card border border-border bg-surface p-5 shadow-medium transition hover:-translate-y-0.5 hover:shadow-large sm:gap-8 sm:p-8"
            >
              <div className="flex size-20 shrink-0 items-center justify-center rounded-input bg-accent/20 text-primary sm:size-24">
                <FileText className="size-10" aria-hidden="true" />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="truncate text-base font-bold text-text-primary sm:text-lg">
                  {cv.originalFilename}
                </h2>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    className="w-full sm:w-auto"
                    disabled={analyzingCvId === cv.id}
                    loading={analyzingCvId === cv.id}
                    onClick={() => {
                      void handleAnalyze(cv.id)
                    }}
                    variant="secondary"
                  >
                    Analyser
                  </Button>
                  <span className="inline-flex items-center gap-2 text-sm text-text-secondary">
                    <CalendarDays className="size-4" aria-hidden="true" />
                    Ajoute le {formatDate(cv.uploadedAt)}
                  </span>
                </div>
              </div>

              <button
                aria-label={`Actions pour ${cv.originalFilename}`}
                className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-button text-text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                onClick={() => {
                  openActionModal(cv)
                }}
                type="button"
              >
                <MoreVertical className="size-5" aria-hidden="true" />
              </button>
            </article>
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
            name="cvFile"
            onChange={(event) => {
              setErrorMessage(null)
              setSelectedFile(event.target.files?.[0] ?? null)
            }}
            type="file"
          />

          <Input
            label="Label du CV"
            maxLength={50}
            name="cvLabel"
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
              loading={isSubmitting}
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
            {selectedCv?.originalFilename ?? 'CV sélectionné'}
          </div>

          <p className="text-sm leading-6 text-text-secondary">
            Cette action retire ce CV de ta liste.
          </p>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              className="sm:w-auto"
              disabled={Boolean(deletingCvId)}
              onClick={closeActionModal}
              variant="secondary"
            >
              Annuler
            </Button>
            <Button
              className="sm:w-auto"
              loading={deletingCvId === selectedCv?.id}
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

async function loadCvs(
  setCvs: Dispatch<SetStateAction<ICandidateCvListItem[]>>,
  setIsLoadingCvs: Dispatch<SetStateAction<boolean>>,
): Promise<void> {
  setIsLoadingCvs(true)

  try {
    const cvs = await getCandidateCvs()
    setCvs(cvs)
  } finally {
    setIsLoadingCvs(false)
  }
}

async function refreshCvs(
  setCvs: Dispatch<SetStateAction<ICandidateCvListItem[]>>,
  setIsLoadingCvs: Dispatch<SetStateAction<boolean>>,
  setErrorMessage: Dispatch<SetStateAction<string | null>>,
): Promise<void> {
  try {
    await loadCvs(setCvs, setIsLoadingCvs)
  } catch {
    setErrorMessage('Impossible de charger les CV.')
  }
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('fr-FR').format(new Date(date))
}

function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const response = error as { response?: { data?: { message?: string } } }

    if (response.response?.data?.message) {
      return response.response.data.message
    }
  }

  return "Une erreur est survenue pendant l'import du CV."
}
