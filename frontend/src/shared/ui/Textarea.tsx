import { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'

import { cx } from '@/shared/lib'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cx(
          'w-full min-h-[100px] rounded-xl border-0 bg-surface-container-lowest px-4 py-3',
          'text-body-standard font-sans text-on-surface placeholder:text-on-surface-variant',
          'outline-1 outline-ghost-border transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
          'resize-y disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

Textarea.displayName = 'Textarea'
