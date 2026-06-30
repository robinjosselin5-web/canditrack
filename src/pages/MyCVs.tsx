import { useState } from 'react'
import { FileUp, Files } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Alert, Button, Card, Input, Modal } from '../components/ui'
import { createCandidateCv } from '../features/user/services/candidateCvService'
import type { ICandidateCv } from '../features/user/types/candidateCv.types'

const MAX_CV_FILE_SIZE = 10 * 1024 * 1024

export function MyCVs() {
  const [cvs, setCvs] = useState<ICandidateCv[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
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

  const closeModal = () => {
    if (isSubmitting) {
      return
    }

    setIsModalOpen(false)
    setErrorMessage(null)
  }

  const handleImport = async () => {
    if (!selectedFile) {
      setErrorMessage('Sélectionne un fichier PDF.')
      return
    }

    if (
      selectedFile.type !== 'application/pdf' &&
      !selectedFile.name.toLowerCase().endsWith('.pdf')
    ) {
      setErrorMessage('Le fichier doit être au format PDF.')
      return
    }

    if (selectedFile.size <= 0) {
      setErrorMessage('Le fichier sélectionné est vide.')
      return
    }

    if (selectedFile.size > MAX_CV_FILE_SIZE) {
      setErrorMessage('Le fichier ne doit pas dépasser 10 Mo.')
      return
    }

    if (label.trim().length > 50) {
      setErrorMessage('Le label ne doit pas dépasser 50 caractères.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const candidateCv = await createCandidateCv({
        file: selectedFile,
        label: label.trim() || undefined,
      })

      setCvs((currentCvs) => [candidateCv, ...currentCvs])
      setSuccessMessage('Le CV a été importé avec succès.')
      setIsModalOpen(false)
      resetForm()
    } catch (error) {
      setErrorMessage(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="space-y-6">
      <PageHeader
        title="Mes CV"
        description="Prépare et retrouve ici les CV importés avant l'arrivée du backend de gestion."
      />

      {successMessage ? <Alert variant="success">{successMessage}</Alert> : null}

      <Card className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <div className="inline-flex size-12 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Files className="size-6" aria-hidden="true" />
            </div>
            <p className="max-w-2xl text-sm leading-6 text-text-secondary">
              Importe un CV pour préparer la future synchronisation avec les
              candidatures. Cette version front-end affiche simplement l'état
              vide de la page.
            </p>
          </div>

          <Button className="w-full sm:w-auto" onClick={openModal} variant="primary">
            <FileUp className="size-4" aria-hidden="true" />
            Importer un CV
          </Button>
        </div>

        {cvs.length === 0 ? (
          <div className="rounded-card border border-dashed border-border bg-background/60 px-6 py-10 text-center">
            <p className="text-base font-semibold text-text-primary">
              Aucun CV importé pour le moment
            </p>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Clique sur "Importer un CV" pour préparer l'espace réservé à tes
              futurs fichiers.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {cvs.map((cv) => (
              <article
                key={cv.id}
                className="rounded-card border border-border bg-background p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold text-text-primary">
                      {cv.label}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      {cv.originalFilename}
                    </p>
                  </div>
                  {cv.isDefault ? (
                    <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                      Principal
                    </span>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Importer un CV"
      >
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
            placeholder="Ex. CV Développeur React"
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
              variant="primary"
            >
              Importer
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  )
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
