import { ArrowLeft, ChevronRight, GraduationCap, MoreVertical, Plus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Modal } from '@/components/ui'
import { ConfirmationModal } from '@/features/companies/components/ConfirmationModal'
import { ROUTES } from '@/routes/paths'
import { TrainingForm } from '../components/TrainingForm'
import { useCreateCandidateTraining } from '../hooks/useCreateCandidateTraining'
import { useDeleteCandidateTraining } from '../hooks/useDeleteCandidateTraining'
import { useProfileExtractedData } from '../hooks/useProfileExtractedData'
import { useUpdateCandidateTraining } from '../hooks/useUpdateCandidateTraining'
import type { ICreateCandidateTrainingPayload, ICandidateCvTraining } from '../types/candidateResume.types'
import { formatCvPeriod, getCandidateCvErrorMessage } from '../utils/candidateCvHelpers'
import type { TrainingFormInput } from '../validation/trainingSchema'

export function TrainingPage() {
  const navigate = useNavigate()
  const { data, isLoading, error } = useProfileExtractedData()
  const trainings = data?.trainings ?? []
  const [openMenuTrainingId, setOpenMenuTrainingId] = useState<string | null>(null)
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false)
  const [editingTraining, setEditingTraining] = useState<ICandidateCvTraining | null>(null)
  const [trainingToDelete, setTrainingToDelete] = useState<ICandidateCvTraining | null>(null)
  const createTrainingMutation = useCreateCandidateTraining()
  const deleteTrainingMutation = useDeleteCandidateTraining()
  const updateTrainingMutation = useUpdateCandidateTraining()

  const closeTrainingModal = () => {
    setIsTrainingModalOpen(false)
    setEditingTraining(null)
    createTrainingMutation.reset()
    updateTrainingMutation.reset()
  }

  const openCreateTrainingModal = () => {
    setEditingTraining(null)
    createTrainingMutation.reset()
    updateTrainingMutation.reset()
    setIsTrainingModalOpen(true)
  }

  const openUpdateTrainingModal = (training: ICandidateCvTraining) => {
    setEditingTraining(training)
    setOpenMenuTrainingId(null)
    createTrainingMutation.reset()
    updateTrainingMutation.reset()
    setIsTrainingModalOpen(true)
  }

  const openDeleteTrainingModal = (training: ICandidateCvTraining) => {
    setOpenMenuTrainingId(null)
    deleteTrainingMutation.reset()
    setTrainingToDelete(training)
  }

  const closeDeleteTrainingModal = () => {
    if (deleteTrainingMutation.isPending) return
    deleteTrainingMutation.reset()
    setTrainingToDelete(null)
  }

  const handleDeleteTraining = async () => {
    const training = trainingToDelete
    if (!training) return
    deleteTrainingMutation.reset()
    try {
      await deleteTrainingMutation.mutateAsync(training.id)
      setTrainingToDelete(null)
    } catch {
      // The confirmation modal displays the mutation error and stays open.
    }
  }

  const editingTrainingInitialValues: TrainingFormInput | undefined = editingTraining
    ? {
        certificationType: editingTraining.certificationType ?? '',
        degree: editingTraining.degree ?? '',
        description: editingTraining.description ?? '',
        endDate: editingTraining.endDate ?? '',
        fieldOfStudy: editingTraining.fieldOfStudy ?? '',
        isCertification: editingTraining.isCertification,
        location: editingTraining.location ?? '',
        organizationName: editingTraining.organizationName ?? '',
        startDate: editingTraining.startDate ?? '',
        title: editingTraining.title,
      }
    : undefined

  const handleTrainingSubmit = async (values: ICreateCandidateTrainingPayload) => {
    try {
      if (editingTraining?.id) {
        await updateTrainingMutation.mutateAsync({
          trainingId: editingTraining.id,
          payload: values,
        })
      } else {
        await createTrainingMutation.mutateAsync(values)
      }
      closeTrainingModal()
    } catch {
      // The mutation error is displayed by TrainingForm and keeps the modal open.
    }
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-7">
      <nav className="flex items-center gap-3 text-sm font-semibold text-text-secondary">
        <button aria-label="Retour aux donnees extraites" className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" onClick={() => navigate(ROUTES.EXTRACTED_DATA)} type="button">
          <ArrowLeft aria-hidden="true" className="size-5" />
        </button>
        <div className="hidden items-center gap-2 sm:flex">
          <button className="cursor-pointer transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" onClick={() => navigate(ROUTES.EXTRACTED_DATA)} type="button">Donnees extraites</button>
          <ChevronRight aria-hidden="true" className="size-4" />
          <span className="text-text-primary">Formations</span>
        </div>
      </nav>

      <header>
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Formations</h1>
      </header>

      {isLoading ? <div className="rounded-card border border-border bg-surface px-6 py-12 text-center shadow-soft"><p className="text-sm text-text-secondary">Chargement des formations...</p></div> : null}
      {error ? <Alert variant="error">{getCandidateCvErrorMessage(error, 'Impossible de charger les formations pour le moment.')}</Alert> : null}
      {!isLoading && !error && trainings.length === 0 ? <div className="rounded-card border border-dashed border-border bg-surface px-6 py-14 text-center shadow-soft"><p className="text-base font-semibold text-text-primary">Aucune formation extraite</p><p className="mt-2 text-sm leading-6 text-text-secondary">Aucun CV analyse ne contient encore de formation exploitable.</p></div> : null}

      {!isLoading && !error && trainings.length > 0 ? (
        <div className="grid gap-3">
          {trainings.map((training) => {
            const period = formatCvPeriod(training.startDate, training.endDate)
            return (
              <article className="flex items-start gap-4 rounded-card border border-border bg-surface p-4 shadow-soft sm:p-5" key={training.id}>
                <span className="mt-0.5 hidden size-12 shrink-0 items-center justify-center rounded-input bg-divider text-text-primary sm:inline-flex"><GraduationCap aria-hidden="true" className="size-6" /></span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h2 className="text-base font-bold text-text-primary">{training.title}</h2>
                      <p className="mt-1 text-sm font-medium text-text-secondary">{training.organizationName ?? 'Organisme non precise'}</p>
                      {training.degree ? <p className="mt-1 text-sm text-text-secondary">{training.degree}</p> : null}
                      {training.fieldOfStudy ? <p className="mt-1 text-sm text-text-secondary">{training.fieldOfStudy}</p> : null}
                      {training.location ? <p className="mt-1 text-sm text-text-secondary">{training.location}</p> : null}
                    </div>
                    <p className="pr-2 text-sm font-medium text-text-secondary sm:text-right">{period}</p>
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <div>
                      {training.description ? <p className="text-sm leading-6 text-text-secondary">{training.description}</p> : null}
                      {training.isCertification ? <span className="mt-2 inline-flex min-h-8 items-center rounded-input border border-border bg-divider px-3 text-xs font-semibold uppercase tracking-wide text-text-primary">{training.certificationType ?? 'Certification'}</span> : null}
                    </div>
                    <div className="relative">
                      <button aria-expanded={openMenuTrainingId === training.id} aria-label={`Options pour ${training.title}`} className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-secondary transition hover:bg-divider hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" onClick={() => setOpenMenuTrainingId((currentId) => currentId === training.id ? null : training.id)} type="button">
                        <MoreVertical aria-hidden="true" className="size-5" />
                      </button>
                      {openMenuTrainingId === training.id ? <div className="absolute right-0 top-10 z-20 w-44 rounded-card border border-border bg-surface p-2 shadow-large" role="menu">
                        <button className="flex w-full cursor-pointer items-center rounded-button px-3 py-2 text-left text-sm font-medium text-text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" onClick={() => openUpdateTrainingModal(training)} role="menuitem" type="button">Modifier</button>
                        <button className="flex w-full cursor-pointer items-center rounded-button px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error" onClick={() => openDeleteTrainingModal(training)} role="menuitem" type="button">Supprimer</button>
                      </div> : null}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      ) : null}

      <Button className="min-h-14 gap-3 border-dashed" onClick={openCreateTrainingModal} variant="secondary"><Plus aria-hidden="true" className="size-5" />Ajouter une formation</Button>

      <Modal isOpen={isTrainingModalOpen} onClose={closeTrainingModal} title={editingTraining ? 'Modifier une formation' : 'Ajouter une formation'}>
        <TrainingForm initialValues={editingTrainingInitialValues} isSubmitting={createTrainingMutation.isPending || updateTrainingMutation.isPending} mode={editingTraining ? 'update' : 'create'} onCancel={closeTrainingModal} onSubmit={handleTrainingSubmit} serverError={editingTraining ? updateTrainingMutation.error : createTrainingMutation.error} />
      </Modal>

      <ConfirmationModal confirmLabel={deleteTrainingMutation.isPending ? 'Suppression...' : 'Supprimer'} error={getDeleteTrainingErrorMessage(deleteTrainingMutation.error)} isLoading={deleteTrainingMutation.isPending} isOpen={trainingToDelete !== null} message={getDeleteTrainingConfirmationMessage(trainingToDelete)} onClose={closeDeleteTrainingModal} onConfirm={handleDeleteTraining} title="Supprimer cette formation ?" />
    </section>
  )
}

function getDeleteTrainingConfirmationMessage(training: ICandidateCvTraining | null): string {
  if (!training) return 'Cette action est irreversible.'
  const organizationMessage = training.organizationName ? ` chez « ${training.organizationName} »` : ''
  return `Cette action supprimera definitivement la formation « ${training.title} »${organizationMessage}. Cette action est irreversible.`
}

function getDeleteTrainingErrorMessage(error: unknown): string | null {
  if (error && typeof error === 'object' && (error as { response?: { status?: number } }).response?.status === 404) {
    return "Cette formation n existe plus ou vous n etes pas autorise a la supprimer."
  }
  return error ? getCandidateCvErrorMessage(error, 'Impossible de supprimer la formation. Veuillez reessayer.') : null
}
