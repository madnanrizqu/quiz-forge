import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

import { cx } from '@/shared/lib'
import { Radio } from '@/shared/ui'

export interface QuizOptionProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const QuizOption = forwardRef<HTMLInputElement, QuizOptionProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId =
      id ?? `quiz-option-${label.toLowerCase().replace(/\s+/g, '-')}`

    return (
      <label
        htmlFor={inputId}
        className={cx(
          'group relative flex items-center p-5 rounded-xl bg-surface hover:bg-surface-container-low transition-all duration-200 cursor-pointer border-2 border-transparent',
          'active:scale-[0.98]',
          className,
        )}
      >
        <Radio id={inputId} ref={ref} {...props} />
        <span
          className={cx(
            'ml-4 text-lg font-medium text-on-surface group-hover:text-primary transition-colors',
          )}
        >
          {label}
        </span>
        <div
          className={cx(
            'absolute inset-0 rounded-xl border-2 border-transparent pointer-events-none',
          )}
        />
      </label>
    )
  },
)

QuizOption.displayName = 'QuizOption'
