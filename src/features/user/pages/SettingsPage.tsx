import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { LogOut, Mail, Save, Upload, UserRound } from 'lucide-react'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Button, Card, Input, Loader } from '@/components/ui'
import { useLogout } from '@/features/auth'
import {
  getLogoutErrorMessage,
  getProfileErrorMessage,
} from '../utils/userErrorMessages'
import { useUpdateUserProfile } from '../hooks/useUpdateUserProfile'
import { useUploadUserAvatar } from '../hooks/useUploadUserAvatar'
import { useUserProfile } from '../hooks/useUserProfile'
import { type IProfileFormValues } from '../types/profile.types'
import { profileSchema } from '../validation/profileSchema'
import type { IApiResponse } from '@/types/api'

const settingsTabs = [
  { key: 'profile', label: 'Profil' },
  { key: 'security', label: 'Securite' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'preferences', label: 'Preferences' },
] as const

type SettingsSection = (typeof settingsTabs)[number]['key']

export function SettingsPage() {
  const profileQuery = useUserProfile()
  const updateProfileMutation = useUpdateUserProfile()
  const uploadAvatarMutation = useUploadUserAvatar()
  const logoutMutation = useLogout()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile')
  const [avatarErrorMessage, setAvatarErrorMessage] = useState<string | null>(null)
  const {
    formState: { errors, isDirty },
    handleSubmit,
    register,
    reset,
  } = useForm<IProfileFormValues>({
    defaultValues: {
      email: '',
      firstname: '',
      lastname: '',
    },
    resolver: zodResolver(profileSchema),
  })

  useEffect(() => {
    if (!profileQuery.data) {
      return
    }

    reset({
      email: profileQuery.data.email,
      firstname: profileQuery.data.firstname,
      lastname: profileQuery.data.lastname,
    })
  }, [profileQuery.data, reset])

  const onSubmit = (values: IProfileFormValues) => {
    updateProfileMutation.mutate(values)
  }

  const onChangeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    event.target.value = ''

    if (!file) {
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setAvatarErrorMessage('Le fichier est trop volumineux. La taille maximale est de 5 MB.')
      return
    }

    setAvatarErrorMessage(null)
    uploadAvatarMutation.mutate(file)
  }

  const profileErrorMessage = getProfileErrorMessage(profileQuery.error ?? updateProfileMutation.error)
  const uploadErrorMessage = getUploadAvatarErrorMessage(
    uploadAvatarMutation.error,
  )
  const errorMessage = getLogoutErrorMessage(logoutMutation.error)

  return (
    <section className="mx-auto max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-text-primary">Parametres</h1>
        <p className="mt-3 text-lg leading-7 text-text-secondary">
          Gerez vos preferences et parametres de compte
        </p>
      </div>

      <nav
        aria-label="Sections des parametres"
        className="mb-8 flex gap-8 overflow-x-auto border-b border-border text-base font-semibold text-text-secondary sm:gap-16"
      >
        {settingsTabs.map((tab) => (
          <button
            className={[
              'min-w-max cursor-pointer border-b-2 px-4 pb-5 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
              activeSection === tab.key
                ? 'border-primary text-primary'
                : 'border-transparent hover:text-text-primary',
            ].join(' ')}
            key={tab.key}
            onClick={() => {
              setActiveSection(tab.key)
            }}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeSection === 'profile' ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <Card className="p-6 shadow-medium sm:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-text-primary">
                Informations personnelles
              </h2>
              <p className="mt-3 text-base leading-7 text-text-secondary">
                Mettez a jour vos informations personnelles.
              </p>
            </div>

            {profileQuery.isLoading ? (
              <div className="flex min-h-48 items-center justify-center gap-3 text-sm text-text-secondary">
                <Loader />
                Chargement du profil
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {updateProfileMutation.isSuccess ? (
                  <Alert variant="success">Profil mis a jour avec succes.</Alert>
                ) : null}

                {profileErrorMessage ? (
                  <Alert variant="error">{profileErrorMessage}</Alert>
                ) : null}

                <div className="grid gap-5 md:grid-cols-2">
                  <Input
                    aria-label="Prenom"
                    autoComplete="given-name"
                    error={errors.firstname?.message}
                    iconLeft={<UserRound className="size-5" />}
                    label="Prenom"
                    placeholder="Votre prenom"
                    {...register('firstname')}
                  />
                  <Input
                    aria-label="Nom"
                    autoComplete="family-name"
                    error={errors.lastname?.message}
                    iconLeft={<UserRound className="size-5" />}
                    label="Nom"
                    placeholder="Votre nom"
                    {...register('lastname')}
                  />
                </div>

                <Input
                  aria-label="Adresse e-mail"
                  autoComplete="email"
                  error={errors.email?.message}
                  iconLeft={<Mail className="size-5" />}
                  label="Email"
                  placeholder="john.doe@example.com"
                  type="email"
                  {...register('email')}
                />

                <Button
                  className="min-h-14 text-base shadow-large"
                  disabled={!isDirty}
                  loading={updateProfileMutation.isPending}
                  type="submit"
                >
                  <Save className="size-5" aria-hidden="true" />
                  Enregistrer les modifications
                </Button>
              </form>
            )}
          </Card>

          <Card className="p-6 text-center shadow-medium sm:p-8">
            <h2 className="text-left text-2xl font-semibold text-text-primary">
              Photo de profil
            </h2>

            <div className="mx-auto mt-8 flex aspect-square max-w-52 items-center justify-center overflow-hidden rounded-card bg-accent/15">
              {profileQuery.data?.avatarUrl ? (
                <img
                  alt="Avatar du profil"
                  className="h-full w-full object-cover"
                  src={profileQuery.data.avatarUrl}
                />
              ) : (
                <UserRound
                  className="size-28 text-status-draft"
                  aria-hidden="true"
                />
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={onChangeAvatar}
            />

            <Button
              className="mx-auto mt-6 max-w-44"
              loading={uploadAvatarMutation.isPending}
              onClick={() => fileInputRef.current?.click()}
              type="button"
              variant="secondary"
            >
              <Upload className="size-5 text-primary" aria-hidden="true" />
              Changer
            </Button>

            {avatarErrorMessage ? (
              <div className="mt-5">
                <Alert variant="error">{avatarErrorMessage}</Alert>
              </div>
            ) : null}

            {uploadErrorMessage ? (
              <div className="mt-5">
                <Alert variant="error">{uploadErrorMessage}</Alert>
              </div>
            ) : null}

            <p className="mt-5 text-sm leading-6 text-text-secondary">
              JPG, PNG ou WEBP. Max 5MB.
            </p>
          </Card>
        </div>
      ) : (
        <Card className="p-8 shadow-medium">
          <PlaceholderSection title={settingsTabs.find((tab) => tab.key === activeSection)?.label ?? 'Section'} />
        </Card>
      )}

      <Card className="mt-6 lg:hidden">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Session</h2>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Fermez votre session pour proteger vos donnees sur cet appareil.
            </p>
          </div>

          <Button
            aria-label="Se deconnecter"
            className="sm:w-auto"
            loading={logoutMutation.isPending}
            onClick={() => logoutMutation.mutate()}
            variant="danger"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Se deconnecter
          </Button>
        </div>

        {errorMessage ? (
          <div className="mt-5">
            <Alert variant="error">{errorMessage}</Alert>
          </div>
        ) : null}
      </Card>
    </section>
  )
}

function PlaceholderSection({ title }: { title: string }) {
  return (
    <div className="rounded-[20px] border border-dashed border-border bg-background/60 p-6">
      <p className="text-lg font-semibold text-slate-950">{title}</p>
      <p className="mt-2 text-sm leading-7 text-text-secondary">
        Cette section arrive prochainement.
      </p>
    </div>
  )
}

function getUploadAvatarErrorMessage(error: unknown): string | null {
  if (!error) {
    return null
  }

  if (error instanceof AxiosError) {
    const response = error.response?.data as IApiResponse<unknown> | undefined

    if (!error.response) {
      return "L'API est indisponible. L'avatar n'a pas ete mis a jour."
    }

    return response?.message ?? "L'upload de l'avatar a echoue. Reessayez."
  }

  return "L'upload de l'avatar a echoue. Reessayez."
}
