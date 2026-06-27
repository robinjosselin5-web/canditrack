import type { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  iconLeft?: ReactNode
  label: string
}

export function Input({
  className = '',
  error,
  iconLeft,
  id,
  label,
  ...props
}: InputProps) {
  const inputId = id ?? props.name
  const errorId = error && inputId ? `${inputId}-error` : undefined

  return (
    <label className="block" htmlFor={inputId}>
      <span className="text-sm font-semibold text-text-primary">{label}</span>
      <span
        className={[
          'mt-2 flex min-h-12 items-center gap-3 rounded-input border bg-surface px-4 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
          error ? 'border-error' : 'border-border',
          className,
        ].join(' ')}
      >
        {iconLeft ? (
          <span className="text-text-secondary" aria-hidden="true">
            {iconLeft}
          </span>
        ) : null}
        <input
          aria-describedby={errorId}
          aria-invalid={Boolean(error)}
          className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-placeholder"
          id={inputId}
          {...props}
        />
      </span>
      {error ? (
        <span className="mt-2 block text-sm text-red-600" id={errorId}>
          {error}
        </span>
      ) : null}
    </label>
  )
}
