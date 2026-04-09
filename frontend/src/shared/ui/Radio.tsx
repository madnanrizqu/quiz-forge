import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

import { cx } from '@/shared/lib'

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="radio"
        className={cx(
          'h-5 w-5 appearance-none rounded-full border-2 border-outline-variant bg-surface-container-lowest',
          'checked:border-[6px] checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2',
          'transition-all duration-200 cursor-pointer shrink-0 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

Radio.displayName = 'Radio'
