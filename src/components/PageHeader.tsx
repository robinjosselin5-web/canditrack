type PageHeaderProps = {
  title: string
  description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold tracking-normal text-text-primary">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
        {description}
      </p>
    </div>
  )
}
