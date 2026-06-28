import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'

export function Companies() {
  return (
    <section>
      <PageHeader
        title="Entreprises"
        description="Centralise les entreprises, contacts et opportunites associees."
      />

      <Link
        to="/companies/new"
        className="inline-flex rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-text-primary transition hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Ajouter une entreprise
      </Link>
    </section>
  )
}
