import { AxiosError } from 'axios'
import { LogOut } from 'lucide-react'
import { Alert, Button, Card } from '@/components/ui'
import { useLogout } from '@/features/auth'
import type { IApiResponse } from '@/types/api'
import { PageHeader } from '../components/PageHeader'

export function Settings() {
  const logoutMutation = useLogout()
  const errorMessage = getLogoutErrorMessage(logoutMutation.error)

  return (
    <section className="max-w-3xl">
      <PageHeader
        title="Parametres"
        description="Configure ton profil, tes preferences et les options de l'application."
      />

      <Card>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              Session
            </h2>
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

function getLogoutErrorMessage(error: unknown): string | null {
  if (!error) {
    return null
  }

  if (error instanceof AxiosError) {
    const response = error.response?.data as IApiResponse<unknown> | undefined

    if (!error.response) {
      return "L'API est indisponible. La session n'a pas ete fermee."
    }

    return response?.message ?? "La deconnexion a echoue. Reessayez."
  }

  return "La deconnexion a echoue. Reessayez."
}
