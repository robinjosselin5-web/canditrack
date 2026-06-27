import type { ReactNode } from 'react'

interface AlertProps {
  children: ReactNode
  variant?: 'error' | 'success' | 'info'
}

const variantClasses: Record<NonNullable<AlertProps['variant']>, string> = {
  error: 'border-error bg-error/20 text-red-700',
  info: 'border-primary bg-primary/10 text-text-primary',
  success: 'border-success bg-success/30 text-emerald-800',
}

export function Alert({ children, variant = 'info' }: AlertProps) {
  return (
    <div
      className={[
        'rounded-input border px-4 py-3 text-sm leading-6',
        variantClasses[variant],
      ].join(' ')}
      role={variant === 'error' ? 'alert' : 'status'}
    >
      {children}
    </div>
  )
}
