import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Loader } from './Loader'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-primary text-white shadow-small hover:brightness-95 focus-visible:outline-primary',
  secondary:
    'border border-border bg-surface text-text-primary hover:bg-divider focus-visible:outline-primary',
  ghost:
    'bg-transparent text-primary hover:bg-divider focus-visible:outline-primary',
  danger:
    'bg-error text-white shadow-small hover:brightness-95 focus-visible:outline-error',
}

export function Button({
  children,
  className = '',
  disabled,
  loading = false,
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-button px-4 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
        variantClasses[variant],
        className,
      ].join(' ')}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading ? <Loader /> : null}
      {children}
    </button>
  )
}
