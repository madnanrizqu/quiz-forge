import { forwardRef } from 'react'
import type { ReactNode, InputHTMLAttributes } from 'react'

import { cx } from '@/shared/lib'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  trailingIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, trailingIcon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          className={cx(
            'h-14 w-full rounded-xl border-0 bg-surface-container-lowest px-4',
            'text-title-large font-title-large text-on-surface placeholder:text-on-surface-variant',
            'outline-1 outline-ghost-border shadow-ambient transition-all duration-300',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-50',
            trailingIcon ? 'pr-12' : undefined,
            className,
          )}
          ref={ref}
          {...props}
        />
        {trailingIcon && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
            {trailingIcon}
          </span>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
