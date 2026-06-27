import type { ReactNode } from 'react'

interface AuthPageShellProps {
  title: string
  description: string
  children?: ReactNode
}

export function AuthPageShell({
  title,
  description,
  children,
}: AuthPageShellProps) {
  return (
    <section className="rounded-card border border-border bg-surface p-6 text-text-primary shadow-medium sm:p-8">
      <p className="text-sm font-medium text-text-secondary">CandiTrack</p>
      <h1 className="mt-2 text-3xl font-bold tracking-normal">{title}</h1>
      <p className="mt-3 text-sm leading-6 text-text-secondary">
        {description}
      </p>
      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  )
}
