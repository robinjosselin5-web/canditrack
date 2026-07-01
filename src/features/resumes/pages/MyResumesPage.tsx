import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Alert, Button, Input, Modal } from '@/components/ui'
import {
  analyzeCandidateCv,
  createCandidateCv,
  deleteCandidateCv,
  getCandidateCvs,
} from '../services/candidateResumeService'
import type { ICandidateCvListItem } from '../types/candidateResume.types'
import { CandidateCvCard } from '../components/CandidateCvCard'
import {
  MAX_CV_FILE_SIZE,
  getCandidateCvErrorMessage,
} from '../utils/candidateCvHelpers'

export function MyResumesPage() {
  const [resumes, setResumes] = useState<ICandidateCvListItem[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isActionModalOpen, setIsActionModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedResume, setSelectedResume] =
    useState<ICandidateCvListItem | null>(null)
  const [label, setLabel] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingResumes, setIsLoadingResumes] = useState(false)
  const [analyzingResumeId, setAnalyzingResumeId] = useState<string | null>(null)
  const [deletingResumeId, setDeletingResumeId] = useState<string | null>(null)
  const [fileInputKey, setFileInputKey] = useState(0)

  useEffect(() => {
    void refreshResumes(setResumes, setIsLoadingResumes, setErrorMessage)
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
    if (deletingResumeId) {
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

      await refreshResumes(setResumes, setIsLoadingResumes, setErrorMessage)
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
    setAnalyzingResumeId(resumeId)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      await analyzeCandidateCv(resumeId)
      await refreshResumes(setResumes, setIsLoadingResumes, setErrorMessage)
      setSuccessMessage('Le CV a ete analyse avec succes.')
    } catch (error) {
      setErrorMessage(getCandidateCvErrorMessage(error))
    } finally {
      setAnalyzingResumeId(null)
    }
  }

  const handleDelete = async () => {
    if (!selectedResume) {
      return
    }

    setDeletingResumeId(selectedResume.id)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      await deleteCandidateCv(selectedResume.id)
      await refreshResumes(setResumes, setIsLoadingResumes, setErrorMessage)
      setSuccessMessage('Le CV a ete supprime avec succes.')
      setIsActionModalOpen(false)
      setSelectedResume(null)
    } catch (error) {
      setErrorMessage(getCandidateCvErrorMessage(error))
    } finally {
      setDeletingResumeId(null)
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

      {isLoadingResumes ? (
        <div className="rounded-card border border-border bg-surface px-6 py-12 text-center shadow-medium">
          <p className="text-sm text-text-secondary">Chargement des CV...</p>
        </div>
      ) : resumes.length === 0 ? (
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
              isAnalyzing={analyzingResumeId === resume.id}
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
            maxLength={50}
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
            {selectedResume?.originalFilename ?? 'CV selectionne'}
          </div>

          <p className="text-sm leading-6 text-text-secondary">
            Cette action retire ce CV de ta liste.
          </p>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              className="sm:w-auto"
              disabled={Boolean(deletingResumeId)}
              onClick={closeActionModal}
              variant="secondary"
            >
              Annuler
            </Button>
            <Button
              className="sm:w-auto"
              loading={deletingResumeId === selectedResume?.id}
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
  setCvs: (value: ICandidateCvListItem[]) => void,
  setIsLoadingCvs: (value: boolean) => void,
): Promise<void> {
  setIsLoadingCvs(true)

  try {
    const cvs = await getCandidateCvs()
    setCvs(cvs)
  } finally {
    setIsLoadingCvs(false)
  }
}

async function refreshResumes(
  setCvs: (value: ICandidateCvListItem[]) => void,
  setIsLoadingCvs: (value: boolean) => void,
  setErrorMessage: (value: string | null) => void,
): Promise<void> {
  try {
    await loadCvs(setCvs, setIsLoadingCvs)
  } catch {
    setErrorMessage('Impossible de charger les CV.')
  }
}
