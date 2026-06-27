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
        to="/companies/demo-company"
        className="inline-flex rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
      >
        Voir une fiche entreprise
      </Link>
    </section>
  )
}
