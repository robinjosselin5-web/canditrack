import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Plus, Upload } from 'lucide-react'
import { Alert, Button, Card, Input, Modal } from '@/components/ui'
import { MAX_CV_FILE_SIZE, MAX_CV_LABEL_LENGTH } from '@/config/candidateCvConstants'
import type { ICandidateCvListItem } from '../types/candidateResume.types'
import { CandidateCvCard } from '../components/CandidateCvCard'
import { CreateGeneratedCvModal } from '../components/CreateGeneratedCvModal'
import { GeneratedCvCard } from '../components/GeneratedCvCard'
import { getCandidateCvErrorMessage } from '../utils/candidateCvHelpers'
import { useCreateCandidateCv } from '../hooks/useCreateCandidateCv'
import { useAnalyzeCandidateCv } from '../hooks/useAnalyzeCandidateCv'
import { useCandidateCvs } from '../hooks/useCandidateCvs'
import { useDeleteCandidateCv } from '../hooks/useDeleteCandidateCv'
import { useGeneratedCvs } from '../hooks/useGeneratedCvs'
import { getGeneratedCv } from '../services/generatedCvService'
import { buildGeneratedCvPublicPath } from '../utils/generatedCvHelpers'
import type { IGeneratedCvListItem } from '../types/generatedCv.types'

export function MyResumesPage() {
  const navigate = useNavigate()
  const {
    data: resumes = [],
    isLoading: isLoadingResumes,
    error: resumesError,
  } = useCandidateCvs()
  const createMutation = useCreateCandidateCv()
  const analyzeMutation = useAnalyzeCandidateCv()
  const deleteMutation = useDeleteCandidateCv()
  const {
    data: generatedCvs = [],
    isLoading: isLoadingGeneratedCvs,
    error: generatedCvsError,
  } = useGeneratedCvs()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isActionModalOpen, setIsActionModalOpen] = useState(false)
  const [isCreateGeneratedCvModalOpen, setIsCreateGeneratedCvModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedResume, setSelectedResume] =
    useState<ICandidateCvListItem | null>(null)
  const [label, setLabel] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fileInputKey, setFileInputKey] = useState(0)
  const [openingGeneratedCvId, setOpeningGeneratedCvId] = useState<string | null>(null)

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

  const handleOpenGeneratedCv = async (generatedCv: IGeneratedCvListItem) => {
    setErrorMessage(null)
    setOpeningGeneratedCvId(generatedCv.id)

    try {
      const detail = await getGeneratedCv(generatedCv.id)
      navigate(buildGeneratedCvPublicPath({
        publicId: detail.publicId,
        firstname: detail.firstname,
        lastname: detail.lastname,
      }))
    } catch (error) {
      setErrorMessage(getCandidateCvErrorMessage(error, 'Impossible d’ouvrir ce CV pour le moment.'))
    } finally {
      setOpeningGeneratedCvId(null)
    }
  }

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8 px-1 sm:px-0">
      <header>
        <div>
          <h1 className="text-3xl font-bold tracking-normal text-text-primary sm:text-4xl">
            Mes CV
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
            Gérez et consultez tous vos CV. Vous pouvez importer un CV existant
            ou en créer un nouveau depuis zéro.
          </p>
        </div>
      </header>

      {successMessage ? <Alert variant="success">{successMessage}</Alert> : null}
      {!isModalOpen && (errorMessage || resumesError) ? (
        <Alert variant="error">{errorMessage ?? getCandidateCvErrorMessage(resumesError)}</Alert>
      ) : null}

      <Card className="p-5 shadow-medium sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-5">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-input bg-accent/20 text-primary">
              <Upload className="size-10" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-text-primary sm:text-2xl">
                CV importés
              </h2>
              <p className="mt-2 text-sm leading-6 text-text-secondary sm:text-base">
                Importez vos CV existants (PDF) et laissez l&apos;IA extraire les informations clés.
              </p>
            </div>
          </div>

          <Button className="w-full px-6 sm:w-auto" onClick={openModal}>
            <Upload className="size-5" aria-hidden="true" />
            Importer un CV
          </Button>
        </div>

        {isLoadingResumes ? (
          <div className="mt-8 rounded-card border border-border bg-surface px-6 py-12 text-center">
            <p className="text-sm text-text-secondary">Chargement des CV...</p>
          </div>
        ) : resumes.length === 0 && !errorMessage ? (
          <div className="mt-8 rounded-card border border-dashed border-border bg-surface px-6 py-14 text-center">
            <p className="text-base font-semibold text-text-primary">
              Aucun CV importé pour le moment
            </p>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Ajoutez votre premier CV pour le retrouver dans cette liste.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
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
      </Card>

      <Card className="p-5 shadow-medium sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-5">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-input bg-success/10 text-success">
              <FileText className="size-10" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-text-primary sm:text-2xl">
                CV créés
              </h2>
              <p className="mt-2 text-sm leading-6 text-text-secondary sm:text-base">
                Créez un nouveau CV depuis zéro avec notre éditeur (bientôt disponible).
              </p>
            </div>
          </div>

          <Button
            className="w-full border-success bg-linear-to-r from-emerald-400 to-success px-6 text-white hover:brightness-95 focus-visible:outline-success sm:w-auto"
            onClick={() => setIsCreateGeneratedCvModalOpen(true)}
            type="button"
            variant="secondary"
          >
            <Plus className="size-5" aria-hidden="true" />
            Créer un CV
          </Button>
        </div>

        {isLoadingGeneratedCvs ? (
          <div className="mt-8 rounded-card border border-border bg-surface px-6 py-12 text-center">
            <p className="text-sm text-text-secondary">Chargement des CV créés...</p>
          </div>
        ) : generatedCvsError ? (
          <div className="mt-8">
            <Alert variant="error">
              {getCandidateCvErrorMessage(
                generatedCvsError,
                'Impossible de charger les CV créés pour le moment.',
              )}
            </Alert>
          </div>
        ) : generatedCvs.length === 0 ? (
          <div className="mt-8 rounded-card border border-dashed border-success/40 px-6 py-12 text-center sm:py-14">
            <FileText className="mx-auto size-12 text-success" aria-hidden="true" />
            <p className="mt-5 text-base font-semibold text-text-secondary sm:text-lg">
              Aucun CV créé pour le moment
            </p>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Créez votre premier CV pour le voir apparaître ici.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {generatedCvs.map((generatedCv) => (
                <GeneratedCvCard
                  cv={generatedCv}
                  isOpening={openingGeneratedCvId === generatedCv.id}
                  key={generatedCv.id}
                  onOpen={(cv) => {
                    void handleOpenGeneratedCv(cv)
                  }}
                />
            ))}
          </div>
        )}
      </Card>

      <CreateGeneratedCvModal
        isOpen={isCreateGeneratedCvModalOpen}
        onClose={() => setIsCreateGeneratedCvModalOpen(false)}
      />

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
