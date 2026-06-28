import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Alert, Card } from '@/components/ui'
import { Button } from '@/components/ui'
import { CompanyForm } from '../components/CompanyForm'

export function CreateCompanyPage() {
  const navigate = useNavigate()

  return (
    <section className="mx-auto w-full max-w-2xl">
      <div className="mb-6">
        <Button
          aria-label="Retour aux entreprises"
          className="w-auto"
          onClick={() => {
            navigate('/companies')
          }}
          variant="secondary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Retour aux entreprises
        </Button>
      </div>

      <Card>
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-normal text-text-primary">
            Ajouter une entreprise
          </h1>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Renseigne les informations principales pour commencer le suivi.
          </p>
        </div>

        <Alert variant="info">
          Le statut initial sera automatiquement positionne sur draft.
        </Alert>

        <div className="mt-6">
          <CompanyForm
            onSuccess={() => {
              navigate('/companies')
            }}
          />
        </div>
      </Card>
    </section>
  )
}

