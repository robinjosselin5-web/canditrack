import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import {
  Cake,
  GitBranch,
  ImagePlus,
  BriefcaseBusiness,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Save,
  UserRound,
} from 'lucide-react'
import { type ChangeEvent, useEffect, useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ALLOWED_AVATAR_MIME_TYPES, MAX_AVATAR_FILE_SIZE } from '@/config/userAvatarConstants'
import { Alert, Button, Card, Input } from '@/components/ui'
import { useLogout } from '@/features/auth'
import { useAuthStore } from '@/store/auth.store'
import type { IUser } from '@/types/user'
import { useUpdateUserProfile } from '../hooks/useUpdateUserProfile'
import { useUploadUserAvatar } from '../hooks/useUploadUserAvatar'
import { useUserProfile } from '../hooks/useUserProfile'
import { fetchUserAvatarBlob, type IUpdateProfilePayload } from '../services'
import type { IProfileFormValues } from '../types/profile.types'
import {
  getAvatarErrorMessage,
  getLogoutErrorMessage,
  getProfileErrorMessage,
} from '../utils/userErrorMessages'
import { profileSchema } from '../validation/profileSchema'

const settingsTabs = [
  { key: 'profile', label: 'Profil' },
  { key: 'security', label: 'Sécurité' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'preferences', label: 'Préférences' },
] as const

type SettingsSection = (typeof settingsTabs)[number]['key']

function buildProfileFormValues(user: IUser | null | undefined): IProfileFormValues {
  return {
    firstname: user?.firstname ?? '',
    lastname: user?.lastname ?? '',
    email: user?.email ?? '',
    age: user?.age != null ? String(user.age) : '',
    phone: user?.phone ?? '',
    address: user?.address ?? '',
    linkedin: user?.linkedin ?? '',
    github: user?.github ?? '',
  }
}

export function SettingsPage() {
  const { user: authUser } = useAuthStore()
  const profileQuery = useUserProfile()
  const user = profileQuery.data ?? authUser

  const logoutMutation = useLogout()
  const updateProfileMutation = useUpdateUserProfile()
  const uploadAvatarMutation = useUploadUserAvatar()

  const [activeSection, setActiveSection] = useState<SettingsSection>('profile')
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null)
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const photoInputId = useId()

  const {
    formState: { errors },
    handleSubmit,
    reset,
    register,
    setError,
  } = useForm<IProfileFormValues, unknown, IUpdateProfilePayload>({
    defaultValues: buildProfileFormValues(user),
    resolver: zodResolver(profileSchema),
  })

  useEffect(() => {
    if (profileQuery.data) {
      reset(buildProfileFormValues(profileQuery.data))
    }
  }, [profileQuery.data, reset])

  useEffect(() => {
    return () => {
      if (profilePhotoUrl) {
        URL.revokeObjectURL(profilePhotoUrl)
      }
    }
  }, [profilePhotoUrl])

  useEffect(() => {
    if (!user?.hasAvatar || selectedAvatarFile) {
      return
    }

    let isCancelled = false

    fetchUserAvatarBlob()
      .then((blob) => {
        if (!isCancelled) {
          setProfilePhotoUrl(URL.createObjectURL(blob))
        }
      })
      .catch(() => {
        // Pas de photo à afficher : on garde l'avatar par défaut.
      })

    return () => {
      isCancelled = true
    }
  }, [user?.hasAvatar, selectedAvatarFile])

  const handleProfilePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files ?? []

    if (!file) {
      return
    }

    if (!ALLOWED_AVATAR_MIME_TYPES.includes(file.type)) {
      setSubmitError('Seuls les formats JPG, PNG et GIF sont autorisés.')
      return
    }

    if (file.size > MAX_AVATAR_FILE_SIZE) {
      setSubmitError('Le fichier dépasse la limite de 5 Mo.')
      return
    }

    setSubmitError(null)
    setProfilePhotoUrl(URL.createObjectURL(file))
    setSelectedAvatarFile(file)
  }

  const onSubmit = async (values: IUpdateProfilePayload) => {
    setSubmitSuccess(false)

    try {
      await updateProfileMutation.mutateAsync(values)
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        setError('email', {
          message: 'Cette adresse e-mail est déjà utilisée.',
          type: 'server',
        })
      }

      setSubmitError(getProfileErrorMessage(error) ?? 'La mise à jour du profil a échoué.')
      return
    }

    if (selectedAvatarFile) {
      try {
        await uploadAvatarMutation.mutateAsync(selectedAvatarFile)
        setSelectedAvatarFile(null)
      } catch (error) {
        setSubmitError(getAvatarErrorMessage(error) ?? "L'envoi de la photo a échoué.")
        return
      }
    }

    setSubmitError(null)
    setSubmitSuccess(true)
  }

  const errorMessage = getLogoutErrorMessage(logoutMutation.error)
  const isSavePending = updateProfileMutation.isPending || uploadAvatarMutation.isPending

  return (
    <section className="mx-auto max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-text-primary">Paramètres</h1>
        <p className="mt-3 text-lg leading-7 text-text-secondary">
          Gérez vos préférences et paramètres de compte
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
        <div className="grid gap-6">
          <Card className="p-6 shadow-medium sm:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-text-primary">
                Informations personnelles
              </h2>
              <p className="mt-3 text-base leading-7 text-text-secondary">
                Mettez à jour vos informations personnelles.
              </p>
            </div>

            {submitError ? (
              <div className="mb-6">
                <Alert variant="error">{submitError}</Alert>
              </div>
            ) : null}

            {submitSuccess ? (
              <div className="mb-6">
                <Alert variant="success">Profil mis à jour avec succès.</Alert>
              </div>
            ) : null}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
                <div className="grid min-w-0 gap-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <Input
                      autoComplete="given-name"
                      error={errors.firstname?.message}
                      iconLeft={<UserRound className="size-5" />}
                      label="Prénom"
                      {...register('firstname')}
                    />
                    <Input
                      autoComplete="family-name"
                      error={errors.lastname?.message}
                      iconLeft={<UserRound className="size-5" />}
                      label="Nom"
                      {...register('lastname')}
                    />
                  </div>

                  <Input
                    autoComplete="email"
                    error={errors.email?.message}
                    iconLeft={<Mail className="size-5" />}
                    label="E-mail"
                    type="email"
                    {...register('email')}
                  />

                  <div className="grid gap-5 md:grid-cols-3">
                    <Input
                      error={errors.age?.message}
                      iconLeft={<Cake className="size-5" />}
                      label="Âge"
                      type="number"
                      {...register('age')}
                    />
                    <Input
                      autoComplete="tel"
                      error={errors.phone?.message}
                      iconLeft={<Phone className="size-5" />}
                      label="Téléphone"
                      type="tel"
                      {...register('phone')}
                    />
                    <Input
                      autoComplete="street-address"
                      error={errors.address?.message}
                      iconLeft={<MapPin className="size-5" />}
                      label="Adresse"
                      {...register('address')}
                    />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Input
                      error={errors.linkedin?.message}
                      iconLeft={<BriefcaseBusiness className="size-5" />}
                      label="LinkedIn"
                      type="url"
                      {...register('linkedin')}
                    />
                    <Input
                      error={errors.github?.message}
                      iconLeft={<GitBranch className="size-5" />}
                      label="GitHub"
                      type="url"
                      {...register('github')}
                    />
                  </div>
                </div>

                <div className="flex min-w-0 flex-col items-center border-border xl:min-h-full xl:border-l xl:pl-8">
                  <h3 className="text-base font-semibold text-text-primary">
                    Photo de profil
                  </h3>

                  <div className="mt-5 flex size-52 items-center justify-center overflow-hidden rounded-full bg-primary/10">
                    {profilePhotoUrl ? (
                      <img
                        alt="Aperçu de la photo de profil"
                        className="size-full rounded-full object-cover"
                        src={profilePhotoUrl}
                      />
                    ) : (
                      <UserRound
                        aria-hidden="true"
                        className="size-24 text-primary/70"
                        strokeWidth={1.25}
                      />
                    )}
                  </div>

                  <input
                    accept="image/png,image/jpeg,image/gif"
                    className="sr-only"
                    id={photoInputId}
                    onChange={handleProfilePhotoChange}
                    type="file"
                  />
                  <label
                    className="mt-6 inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-button border border-primary px-5 text-sm font-semibold text-primary transition hover:bg-primary/5 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary"
                    htmlFor={photoInputId}
                  >
                    <ImagePlus aria-hidden="true" className="size-5" />
                    Changer la photo
                  </label>
                  <p className="mt-4 text-center text-sm text-text-secondary">
                    JPG, PNG ou GIF. Max 5 Mo.
                  </p>
                </div>
              </div>

              <Button
                className="mt-8 min-h-14 text-base shadow-large"
                loading={isSavePending}
                type="submit"
              >
                <Save aria-hidden="true" className="size-5" />
                Enregistrer les modifications
              </Button>
            </form>
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
              Fermez votre session pour protéger vos données sur cet appareil.
            </p>
          </div>

          <Button
            aria-label="Se déconnecter"
            className="sm:w-auto"
            loading={logoutMutation.isPending}
            onClick={() => logoutMutation.mutate()}
            variant="danger"
          >
            <LogOut aria-hidden="true" className="size-4" />
            Se déconnecter
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
