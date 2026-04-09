import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

import { cx } from './cx'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cx(
          'h-14 w-full rounded-xl border-0 bg-surface-container-lowest px-4',
          'text-title-large font-title-large text-on-surface placeholder:text-on-surface-variant',
          'outline-1 outline-ghost-border shadow-ambient transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'
