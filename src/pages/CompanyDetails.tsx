import { useParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'

export function CompanyDetails() {
  const { companyId } = useParams()

  return (
    <section>
      <PageHeader
        title="Detail entreprise"
        description={`Fiche de l'entreprise ${companyId ?? 'selectionnee'}.`}
      />
    </section>
  )
}
