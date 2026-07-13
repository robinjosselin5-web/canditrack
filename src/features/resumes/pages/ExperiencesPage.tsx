import { ArrowLeft, BriefcaseBusiness, ChevronRight, MoreVertical, Plus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Modal } from '@/components/ui'
import { ROUTES } from '@/routes/paths'
import { ExperienceForm } from '../components/ExperienceForm'
import { ConfirmationModal } from '@/features/companies/components/ConfirmationModal'
import { useCreateCandidateExperience } from '../hooks/useCreateCandidateExperience'
import { useDeleteCandidateExperience } from '../hooks/useDeleteCandidateExperience'
import { useProfileExtractedData } from '../hooks/useProfileExtractedData'
import { useUpdateCandidateExperience } from '../hooks/useUpdateCandidateExperience'
import type { ICandidateCvExperience } from '../types/candidateResume.types'
import { formatCvPeriod, getCandidateCvErrorMessage } from '../utils/candidateCvHelpers'
import type { ExperienceFormInput, ExperienceFormValues } from '../validation/experienceSchema'

export function ExperiencesPage() {
  const navigate = useNavigate()
  const { data, isLoading, error } = useProfileExtractedData()
  const experiences = data?.experiences ?? []
  const [openMenuExperienceId, setOpenMenuExperienceId] = useState<string | null>(null)
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<ICandidateCvExperience | null>(null)
  const [experienceToDelete, setExperienceToDelete] =
    useState<ICandidateCvExperience | null>(null)
  const createExperienceMutation = useCreateCandidateExperience()
  const deleteExperienceMutation = useDeleteCandidateExperience()
  const updateExperienceMutation = useUpdateCandidateExperience()

  const goBackToExtractedData = () => {
    navigate(ROUTES.EXTRACTED_DATA)
  }

  const closeExperienceModal = () => {
    setIsExperienceModalOpen(false)
    setEditingExperience(null)
    createExperienceMutation.reset()
    updateExperienceMutation.reset()
  }

  const openCreateExperienceModal = () => {
    setEditingExperience(null)
    createExperienceMutation.reset()
    updateExperienceMutation.reset()
    setIsExperienceModalOpen(true)
  }

  const openUpdateExperienceModal = (experience: ICandidateCvExperience) => {
    setEditingExperience(experience)
    setOpenMenuExperienceId(null)
    createExperienceMutation.reset()
    updateExperienceMutation.reset()
    setIsExperienceModalOpen(true)
  }

  const openDeleteExperienceModal = (experience: ICandidateCvExperience) => {
    setOpenMenuExperienceId(null)
    deleteExperienceMutation.reset()
    setExperienceToDelete(experience)
  }

  const closeDeleteExperienceModal = () => {
    if (deleteExperienceMutation.isPending) {
      return
    }

    deleteExperienceMutation.reset()
    setExperienceToDelete(null)
  }

  const handleDeleteExperience = async () => {
    if (!experienceToDelete) {
      return
    }

    deleteExperienceMutation.reset()

    try {
      await deleteExperienceMutation.mutateAsync(experienceToDelete.id)
      setExperienceToDelete(null)
    } catch {
      // The confirmation modal displays the mutation error and stays open.
    }
  }

  const editingExperienceInitialValues: ExperienceFormInput | undefined = editingExperience
    ? {
        companyName: editingExperience.companyName ?? '',
        endDate: editingExperience.endDate ?? '',
        jobTitle: editingExperience.jobTitle,
        location: editingExperience.location ?? '',
        startDate: editingExperience.startDate ?? '',
      }
    : undefined

  const handleExperienceSubmit = async (values: ExperienceFormValues) => {
    try {
      if (editingExperience) {
        await updateExperienceMutation.mutateAsync({
          experienceId: editingExperience.id,
          payload: values,
        })
      } else {
        await createExperienceMutation.mutateAsync(values)
      }

      closeExperienceModal()
    } catch {
      // The mutation error is displayed by ExperienceForm and keeps the modal open.
    }
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-7">
      <nav className="flex items-center gap-3 text-sm font-semibold text-text-secondary">
        <button
          aria-label="Retour aux donnees extraites"
          className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={goBackToExtractedData}
          type="button"
        >
          <ArrowLeft aria-hidden="true" className="size-5" />
        </button>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            className="cursor-pointer transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={goBackToExtractedData}
            type="button"
          >
            Donnees extraites
          </button>
          <ChevronRight aria-hidden="true" className="size-4" />
          <span className="text-text-primary">Experiences</span>
        </div>
      </nav>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Experiences
        </h1>
      </header>

      {isLoading ? (
        <div className="rounded-card border border-border bg-surface px-6 py-12 text-center shadow-soft">
          <p className="text-sm text-text-secondary">Chargement des experiences...</p>
        </div>
      ) : null}

      {error ? (
        <Alert variant="error">
          {getCandidateCvErrorMessage(
            error,
            'Impossible de charger les experiences pour le moment.',
          )}
        </Alert>
      ) : null}

      {!isLoading && !error && experiences.length === 0 ? (
        <div className="rounded-card border border-dashed border-border bg-surface px-6 py-14 text-center shadow-soft">
          <p className="text-base font-semibold text-text-primary">
            Aucune experience extraite
          </p>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Aucun CV analyse ne contient encore d'experience exploitable.
          </p>
        </div>
      ) : null}

      {!isLoading && !error && experiences.length > 0 ? (
        <div className="space-y-4">
          {experiences.map((experience) => (
            <article
              className="flex items-start gap-4 rounded-card border border-border bg-surface p-4 shadow-soft sm:p-5"
              key={experience.id}
            >
              <span className="mt-0.5 hidden size-12 shrink-0 items-center justify-center rounded-input bg-divider text-text-primary sm:inline-flex">
                <BriefcaseBusiness aria-hidden="true" className="size-6" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="text-base font-bold text-text-primary">
                      {experience.jobTitle}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-text-secondary">
                      {experience.companyName ?? 'Entreprise non precisee'}
                    </p>
                    {experience.location ? (
                      <p className="mt-1 text-sm text-text-secondary">
                        {experience.location}
                      </p>
                    ) : null}
                  </div>

                  <p className="pr-2 text-sm font-medium text-text-secondary sm:text-right">
                    {formatCvPeriod(experience.startDate, experience.endDate, experience.isCurrent)}
                  </p>
                </div>

                <div className="mt-3 flex items-start justify-between gap-3">
                  {experience.description ? (
                    <p className="text-sm leading-6 text-text-secondary">
                      {experience.description}
                    </p>
                  ) : <span />}

                  <div className="relative">
                    <button
                      aria-expanded={openMenuExperienceId === experience.id}
                      aria-label={`Options pour ${experience.jobTitle}`}
                      className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-secondary transition hover:bg-divider hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      onClick={() => {
                        setOpenMenuExperienceId((currentId) =>
                          currentId === experience.id ? null : experience.id,
                        )
                      }}
                      type="button"
                    >
                      <MoreVertical aria-hidden="true" className="size-5" />
                    </button>

                    {openMenuExperienceId === experience.id ? (
                      <div
                        className="absolute right-0 top-10 z-20 w-44 rounded-card border border-border bg-surface p-2 shadow-large"
                        role="menu"
                      >
                        <button
                          className="flex w-full cursor-pointer items-center rounded-button px-3 py-2 text-left text-sm font-medium text-text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                          onClick={() => openUpdateExperienceModal(experience)}
                          role="menuitem"
                          type="button"
                        >
                          Modifier
                        </button>
                        <button
                          className="flex w-full cursor-pointer items-center rounded-button px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
                          onClick={() => openDeleteExperienceModal(experience)}
                          role="menuitem"
                          type="button"
                        >
                          Supprimer
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      <Button
        className="min-h-14 gap-3 border-dashed"
        onClick={openCreateExperienceModal}
        variant="secondary"
      >
        <Plus aria-hidden="true" className="size-5" />
        Ajouter une experience
      </Button>

      <Modal
        isOpen={isExperienceModalOpen}
        onClose={closeExperienceModal}
        title={editingExperience ? 'Modifier une experience' : 'Ajouter une experience'}
      >
        <ExperienceForm
          initialValues={editingExperienceInitialValues}
          isSubmitting={
            createExperienceMutation.isPending || updateExperienceMutation.isPending
          }
          mode={editingExperience ? 'update' : 'create'}
          onCancel={closeExperienceModal}
          onSubmit={handleExperienceSubmit}
          serverError={
            editingExperience
              ? updateExperienceMutation.error
              : createExperienceMutation.error
          }
        />
      </Modal>

      <ConfirmationModal
        confirmLabel={
          deleteExperienceMutation.isPending ? 'Suppression...' : 'Supprimer'
        }
        error={getDeleteExperienceErrorMessage(deleteExperienceMutation.error)}
        isLoading={deleteExperienceMutation.isPending}
        isOpen={experienceToDelete !== null}
        message={getDeleteExperienceConfirmationMessage(experienceToDelete)}
        onClose={closeDeleteExperienceModal}
        onConfirm={handleDeleteExperience}
        title="Supprimer cette experience ?"
      />
    </section>
  )
}

function getDeleteExperienceConfirmationMessage(
  experience: ICandidateCvExperience | null,
): string {
  if (!experience) {
    return 'Cette action est irreversible.'
  }

  const companyMessage = experience.companyName
    ? ` chez « ${experience.companyName} »`
    : ''

  return `Cette action supprimera definitivement l experience « ${experience.jobTitle} »${companyMessage}. Cette action est irreversible.`
}

function getDeleteExperienceErrorMessage(error: unknown): string | null {
  if (error && typeof error === 'object') {
    const response = error as { response?: { status?: number } }

    if (response.response?.status === 404) {
      return "Cette experience n existe plus ou vous n etes pas autorise a la supprimer."
    }
  }

  return error
    ? getCandidateCvErrorMessage(
        error,
        'Impossible de supprimer l experience. Veuillez reessayer.',
      )
    : null
}
