import { useMemo, useState } from 'react'
import { ArrowLeft, ChevronRight, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Alert, Modal } from '@/components/ui'
import { ConfirmationModal } from '@/features/companies/components/ConfirmationModal'
import { ROUTES } from '@/routes/paths'
import { SkillForm } from '../components/SkillForm'
import { useCreateCandidateSkill } from '../hooks/useCreateCandidateSkill'
import { useDeleteCandidateSkill } from '../hooks/useDeleteCandidateSkill'
import { useProfileExtractedData } from '../hooks/useProfileExtractedData'
import type { CvSkillCategory, ICandidateCvSkill } from '../types/candidateResume.types'
import { formatCvSkillCategory, getCandidateCvErrorMessage } from '../utils/candidateCvHelpers'
import { getDeleteSkillErrorMessage } from '../utils/skillHelpers'

export function SkillsPage() {
  const navigate = useNavigate()
  const { data, isLoading, error } = useProfileExtractedData()
  const skills = data?.skills
  const [selectedCategory, setSelectedCategory] = useState<CvSkillCategory | null>(null)
  const [skillToDelete, setSkillToDelete] = useState<ICandidateCvSkill | null>(null)
  const createSkillMutation = useCreateCandidateSkill()
  const deleteSkillMutation = useDeleteCandidateSkill()

  const groupedSkills = useMemo(() => {
    const categories: CvSkillCategory[] = [
      'SPOKEN_LANGUAGES',
      'PROGRAMMING_LANGUAGES',
      'FRAMEWORKS_LIBRARIES',
      'TOOLS_TECHNOLOGIES',
      'METHODOLOGIES',
      'SOFT_SKILLS',
      'OTHER',
    ]
    return categories.map((category) => ({
      category,
      title: formatCvSkillCategory(category),
      skills: (skills ?? []).filter((skill) => skill.category === category),
    }))
  }, [skills])

  const handleCreate = async (payload: { name: string; category: CvSkillCategory }) => {
    try {
      await createSkillMutation.mutateAsync(payload)
      createSkillMutation.reset()
      setSelectedCategory(null)
    } catch {
      // Keep the modal open so the form can display the mutation error.
    }
  }

  const handleDelete = async () => {
    if (!skillToDelete) return

    try {
      await deleteSkillMutation.mutateAsync(skillToDelete.id)
      setSkillToDelete(null)
    } catch {
      // Keep the confirmation modal open so the error remains visible.
    }
  }

  const closeDeleteModal = () => {
    if (deleteSkillMutation.isPending) return
    deleteSkillMutation.reset()
    setSkillToDelete(null)
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-7">
      <nav className="flex items-center gap-3 text-sm font-semibold text-text-secondary">
        <button
          aria-label="Retour aux donnees extraites"
          className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={() => navigate(ROUTES.EXTRACTED_DATA)}
          type="button"
        >
          <ArrowLeft aria-hidden="true" className="size-5" />
        </button>
        <div className="hidden items-center gap-2 sm:flex">
          <button
            className="cursor-pointer transition hover:text-primary"
            onClick={() => navigate(ROUTES.EXTRACTED_DATA)}
            type="button"
          >
            Donnees extraites
          </button>
          <ChevronRight aria-hidden="true" className="size-4" />
          <span className="text-text-primary">Competences</span>
        </div>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
        Competences
      </h1>

      {isLoading ? (
        <div className="rounded-card border border-border bg-surface px-6 py-12 text-center shadow-soft">
          <p className="text-sm text-text-secondary">Chargement des competences...</p>
        </div>
      ) : null}

      {error ? (
        <Alert variant="error">
          {getCandidateCvErrorMessage(
            error,
            'Impossible de charger les competences pour le moment.',
          )}
        </Alert>
      ) : null}

      {!isLoading && !error ? (
        <div className="space-y-6">
          {groupedSkills.map((group) => (
            <section className="space-y-3" key={group.category}>
              <h2 className="text-base font-bold text-text-primary">{group.title}</h2>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <button
                    aria-label={`Supprimer la competence ${skill.name}`}
                    className="inline-flex min-h-10 cursor-pointer items-center rounded-input border border-border bg-surface px-4 text-sm font-medium text-text-primary shadow-soft transition hover:bg-divider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    key={skill.id}
                    onClick={() => {
                      deleteSkillMutation.reset()
                      setSkillToDelete(skill)
                    }}
                    type="button"
                  >
                    {skill.name}
                  </button>
                ))}
                {group.skills.length === 0 ? (
                  <p className="text-sm text-text-secondary">
                    Aucune competence dans cette categorie.
                  </p>
                ) : null}
                <button
                  aria-label={`Ajouter une competence dans la categorie ${group.title}`}
                  className="inline-flex min-h-10 size-10 shrink-0 cursor-pointer items-center justify-center rounded-input border border-border bg-surface px-1 text-sm font-medium text-text-primary shadow-soft transition hover:bg-background"
                  onClick={() => {
                    createSkillMutation.reset()
                    setSelectedCategory(group.category)
                  }}
                  type="button"
                >
                  <Plus aria-hidden="true" />
                </button>
              </div>
            </section>
          ))}
        </div>
      ) : null}

      <Modal
        isOpen={selectedCategory !== null}
        onClose={() => {
          if (!createSkillMutation.isPending) setSelectedCategory(null)
        }}
        title="Ajouter une competence"
      >
        {selectedCategory ? (
          <SkillForm
            category={selectedCategory}
            isSubmitting={createSkillMutation.isPending}
            onCancel={() => setSelectedCategory(null)}
            onSubmit={handleCreate}
            serverError={createSkillMutation.error}
          />
        ) : null}
      </Modal>

      <ConfirmationModal
        confirmLabel={deleteSkillMutation.isPending ? 'Suppression...' : 'Supprimer'}
        error={getDeleteSkillErrorMessage(deleteSkillMutation.error)}
        isLoading={deleteSkillMutation.isPending}
        isOpen={skillToDelete !== null}
        message={
          skillToDelete
            ? `Cette action supprimera la competence Â« ${skillToDelete.name} Â». Cette action est irreversible.`
            : 'Cette action est irreversible.'
        }
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title="Supprimer cette competence ?"
      />
    </section>
  )
}
