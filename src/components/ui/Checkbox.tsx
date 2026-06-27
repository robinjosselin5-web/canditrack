import type { InputHTMLAttributes } from 'react'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function Checkbox({ id, label, ...props }: CheckboxProps) {
  const inputId = id ?? props.name

  return (
    <label
      className="flex items-start gap-3 text-sm text-text-secondary"
      htmlFor={inputId}
    >
      <input
        className="mt-0.5 size-4 rounded border-border text-primary focus:ring-primary"
        id={inputId}
        type="checkbox"
        {...props}
      />
      <span>{label}</span>
    </label>
  )
}
