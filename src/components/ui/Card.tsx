import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div
      className={[
        'rounded-card border border-border bg-surface p-6 shadow-medium sm:p-8',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
