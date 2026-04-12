import { Slot } from '@radix-ui/react-slot'
import type { HTMLAttributes } from 'react'

import { cx } from '@/shared/lib'
import { Text } from '@/shared/ui'

export interface QuestionCardProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  title?: string
  description?: string
  disabled?: boolean
}

export function QuestionCard({
  title,
  description,
  asChild = false,
  disabled = false,
  className,
  children,
  ...props
}: QuestionCardProps) {
  const Comp = asChild ? Slot : 'article'

  return (
    <Comp
      className={cx(
        'relative overflow-hidden rounded-2xl bg-surface-container-lowest p-6 md:p-8',
        'outline-1 outline-ghost-border shadow-[0_12px_40px_rgba(20,28,43,0.06)] transition-all duration-300',
        !disabled && 'hover:-translate-y-1',
        disabled && 'opacity-60 pointer-events-none',
        className,
      )}
      {...props}
    >
      <div className="w-full">
        {title ? (
          <Text asChild className="m-0" variant="headline-h2">
            <h3>{title}</h3>
          </Text>
        ) : null}
        {description ? (
          <Text
            className="mb-0 mt-2"
            tone="on-surface-variant"
            variant="body-standard"
          >
            {description}
          </Text>
        ) : null}
        {children ? (
          <div className={title || description ? 'mt-4 w-full' : 'w-full'}>
            {children}
          </div>
        ) : null}
      </div>
    </Comp>
  )
}
