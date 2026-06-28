import { Link } from 'react-router-dom'
import { Alert, Card } from '@/components/ui'
import { CompanyForm } from '../components/CompanyForm'

export function CreateCompanyPage() {
  return (
    <section className="mx-auto w-full max-w-2xl">
      <div className="mb-6">
        <Link
          to="/companies"
          className="text-sm font-semibold text-primary transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Retour aux entreprises
        </Link>
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
          <CompanyForm />
        </div>
      </Card>
    </section>
  )
}

