import { BrandLogoLink } from '@/components/BrandLogoLink'

interface AuthPageHeaderProps {
  title: string
  description: string
}

export function AuthPageHeader({ title, description }: AuthPageHeaderProps) {
  return (
    <div className="mb-6 text-center">
      <BrandLogoLink variant="stacked" />
      <h1 className="mt-6 text-4xl font-bold tracking-normal text-text-primary">
        {title}
      </h1>
      <p className="mt-3 text-base leading-7 text-text-secondary">
        {description}
      </p>
    </div>
  )
}
