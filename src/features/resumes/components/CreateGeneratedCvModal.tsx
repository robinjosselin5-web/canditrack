import { useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { Alert, Button, Checkbox, Input, Modal } from '@/components/ui'
import { useCreateGeneratedCv } from '../hooks/useCreateGeneratedCv'
import { useProfileExtractedData } from '../hooks/useProfileExtractedData'
import type {
  CvSkillCategory,
  ICandidateCvExperience,
  ICandidateCvSkill,
  ICandidateCvTraining,
} from '../types/candidateResume.types'
import type { IGeneratedCvDetail } from '../types/generatedCv.types'
import { formatCvPeriod, formatCvSkillCategory, getCandidateCvErrorMessage } from '../utils/candidateCvHelpers'

interface CreateGeneratedCvModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated?: (generatedCv: IGeneratedCvDetail) => void
}

const TOTAL_STEPS = 3
const STEP_LABELS = ['Expériences', 'Compétences', 'Formations']
const SKILL_CATEGORIES: CvSkillCategory[] = [
  'SPOKEN_LANGUAGES',
  'PROGRAMMING_LANGUAGES',
  'FRAMEWORKS_LIBRARIES',
  'TOOLS_TECHNOLOGIES',
  'METHODOLOGIES',
  'SOFT_SKILLS',
  'OTHER',
]
const EMPTY_EXPERIENCES: ICandidateCvExperience[] = []
const EMPTY_SKILLS: ICandidateCvSkill[] = []
const EMPTY_TRAININGS: ICandidateCvTraining[] = []

export function CreateGeneratedCvModal({
  isOpen,
  onClose,
  onCreated,
}: CreateGeneratedCvModalProps) {
  const { data, isLoading, error } = useProfileExtractedData()
  const createMutation = useCreateGeneratedCv()
  const [currentStep, setCurrentStep] = useState(1)
  const [title, setTitle] = useState('')
  const [selectedExperienceIds, setSelectedExperienceIds] = useState<Set<string>>(new Set())
  const [selectedSkillIds, setSelectedSkillIds] = useState<Set<string>>(new Set())
  const [selectedTrainingIds, setSelectedTrainingIds] = useState<Set<string>>(new Set())
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [titleTouched, setTitleTouched] = useState(false)

  const resetState = () => {
    setCurrentStep(1)
    setTitle('')
    setSelectedExperienceIds(new Set())
    setSelectedSkillIds(new Set())
    setSelectedTrainingIds(new Set())
    setSubmitError(null)
    setTitleTouched(false)
    createMutation.reset()
  }

  const experiences = data?.experiences ?? EMPTY_EXPERIENCES
  const skills = data?.skills ?? EMPTY_SKILLS
  const trainings = data?.trainings ?? EMPTY_TRAININGS
  const hasNoData = experiences.length === 0 && skills.length === 0 && trainings.length === 0
  const titleError = title.trim().length === 0
    ? 'Le titre du CV est obligatoire.'
    : title.trim().length > 150
      ? 'Le titre ne doit pas dépasser 150 caractères.'
      : null
  const canSubmit = titleError === null && !createMutation.isPending

  const groupedSkills = useMemo(
    () => SKILL_CATEGORIES.map((category) => ({
      category,
      title: formatCvSkillCategory(category),
      skills: skills.filter((skill) => skill.category === category),
    })).filter((group) => group.skills.length > 0),
    [skills],
  )

  const toggleSelection = (
    id: string,
    setter: Dispatch<SetStateAction<Set<string>>>,
  ) => {
    setter((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleClose = () => {
    if (createMutation.isPending) return
    resetState()
    onClose()
  }

  const handleSubmit = async () => {
    setTitleTouched(true)
    if (!canSubmit) return

    setSubmitError(null)
    try {
      const generatedCv = await createMutation.mutateAsync({
        title: title.trim(),
        experienceIds: [...selectedExperienceIds],
        skillIds: [...selectedSkillIds],
        trainingIds: [...selectedTrainingIds],
      })
      onCreated?.(generatedCv)
      resetState()
      onClose()
    } catch (mutationError) {
      setSubmitError(getCandidateCvErrorMessage(
        mutationError,
        'Impossible de créer le CV pour le moment.',
      ))
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Créer un CV">
      <div className="space-y-5">
        <Input
          error={titleTouched ? titleError ?? undefined : undefined}
          label="Titre du CV"
          maxLength={150}
          name="generatedCvTitle"
          onChange={(event) => {
            setTitle(event.target.value)
            setSubmitError(null)
          }}
          placeholder="CV Développeur Full Stack"
          value={title}
        />

        <div className="flex flex-wrap items-center gap-2" aria-label="Progression de la création">
          <span className="text-sm font-semibold text-text-primary">
            Étape {currentStep} sur {TOTAL_STEPS}
          </span>
          <span className="text-sm text-text-secondary">{STEP_LABELS[currentStep - 1]}</span>
        </div>

        {isLoading ? (
          <div className="rounded-card border border-border bg-divider/50 px-4 py-8 text-center text-sm text-text-secondary">
            Chargement des données disponibles...
          </div>
        ) : null}

        {error ? (
          <Alert variant="error">
            {getCandidateCvErrorMessage(error, 'Impossible de charger les données du profil.')}
          </Alert>
        ) : null}

        {!isLoading && !error && hasNoData ? (
          <Alert variant="info">
            Aucune donnée enregistrée. Vous pouvez créer ce CV uniquement avec vos informations personnelles.
          </Alert>
        ) : null}

        {!isLoading && currentStep === 1 ? (
          <SelectionList
            emptyMessage="Aucune expérience enregistrée. Vous pouvez continuer sans en sélectionner."
            items={experiences}
            selectedIds={selectedExperienceIds}
            onToggle={(id) => toggleSelection(id, setSelectedExperienceIds)}
            renderItem={(experience) => (
              <>
                <span className="font-semibold text-text-primary">{experience.jobTitle}</span>
                <span className="block text-sm text-text-secondary">
                  {experience.companyName ?? 'Entreprise non précisée'} · {formatCvPeriod(experience.startDate, experience.endDate, experience.isCurrent)}
                </span>
                {experience.location ? <span className="block text-sm text-text-secondary">{experience.location}</span> : null}
              </>
            )}
          />
        ) : null}

        {!isLoading && currentStep === 2 ? (
          skills.length === 0 ? (
            <p className="rounded-card border border-dashed border-border px-4 py-8 text-center text-sm text-text-secondary">
              Aucune compétence enregistrée. Vous pouvez continuer sans en sélectionner.
            </p>
          ) : (
            <div className="max-h-[40vh] space-y-5 overflow-y-auto pr-1">
              {groupedSkills.map((group) => (
                <section className="space-y-2" key={group.category}>
                  <h3 className="text-sm font-bold text-text-primary">{group.title}</h3>
                  <div className="grid gap-2">
                    {group.skills.map((skill) => (
                      <Checkbox
                        checked={selectedSkillIds.has(skill.id)}
                        id={`generated-cv-skill-${skill.id}`}
                        key={skill.id}
                        label={skill.name}
                        name={`generated-cv-skill-${skill.id}`}
                        onChange={() => toggleSelection(skill.id, setSelectedSkillIds)}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )
        ) : null}

        {!isLoading && currentStep === 3 ? (
          <SelectionList
            emptyMessage="Aucune formation enregistrée. Vous pouvez créer le CV sans formation."
            items={trainings}
            selectedIds={selectedTrainingIds}
            onToggle={(id) => toggleSelection(id, setSelectedTrainingIds)}
            renderItem={(training) => (
              <>
                <span className="font-semibold text-text-primary">{training.title}</span>
                {training.organizationName ? <span className="block text-sm text-text-secondary">{training.organizationName}</span> : null}
                {training.degree ? <span className="block text-sm text-text-secondary">{training.degree}</span> : null}
                {training.fieldOfStudy ? <span className="block text-sm text-text-secondary">{training.fieldOfStudy}</span> : null}
                <span className="block text-sm text-text-secondary">{formatCvPeriod(training.startDate, training.endDate)}</span>
                {training.location ? <span className="block text-sm text-text-secondary">{training.location}</span> : null}
                {training.isCertification ? <span className="mt-1 inline-block text-xs font-semibold text-text-secondary">{training.certificationType ?? 'Certification'}</span> : null}
              </>
            )}
          />
        ) : null}

        {submitError ? <Alert variant="error">{submitError}</Alert> : null}

        <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
          {currentStep === 1 ? (
            <Button className="sm:w-auto" disabled={createMutation.isPending} onClick={handleClose} variant="secondary">
              Annuler
            </Button>
          ) : (
            <Button className="sm:w-auto" disabled={createMutation.isPending} onClick={() => setCurrentStep((step) => Math.max(1, step - 1))} variant="secondary">
              Précédent
            </Button>
          )}
          {currentStep < TOTAL_STEPS ? (
            <Button className="sm:w-auto" disabled={createMutation.isPending} onClick={() => setCurrentStep((step) => Math.min(TOTAL_STEPS, step + 1))}>
              Suivant
            </Button>
          ) : (
            <Button className="sm:w-auto" disabled={!canSubmit} loading={createMutation.isPending} onClick={() => void handleSubmit()}>
              {createMutation.isPending ? 'Création...' : 'Créer le CV'}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  )
}

interface SelectionListProps<T extends { id: string }> {
  emptyMessage: string
  items: T[]
  selectedIds: Set<string>
  onToggle: (id: string) => void
  renderItem: (item: T) => ReactNode
}

function SelectionList<T extends { id: string }>({
  emptyMessage,
  items,
  selectedIds,
  onToggle,
  renderItem,
}: SelectionListProps<T>) {
  if (items.length === 0) {
    return <p className="rounded-card border border-dashed border-border px-4 py-8 text-center text-sm text-text-secondary">{emptyMessage}</p>
  }

  return (
    <div className="max-h-[40vh] space-y-2 overflow-y-auto pr-1">
      {items.map((item) => (
        <label
          className="flex cursor-pointer items-start gap-3 rounded-card border border-border bg-surface p-3 transition hover:bg-divider has-[:checked]:border-primary has-[:checked]:bg-primary/5"
          htmlFor={`generated-cv-item-${item.id}`}
          key={item.id}
        >
          <input
            checked={selectedIds.has(item.id)}
            className="mt-1 size-4 cursor-pointer rounded border-border text-primary focus:ring-primary"
            id={`generated-cv-item-${item.id}`}
            onChange={() => onToggle(item.id)}
            type="checkbox"
          />
          <span className="min-w-0 flex-1">{renderItem(item)}</span>
        </label>
      ))}
    </div>
  )
}
