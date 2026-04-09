import { Slot } from '@radix-ui/react-slot'
import type { HTMLAttributes } from 'react'

import { cx } from '@/shared/lib/cx'
import { Text } from './Text'

export interface QuestionCardProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  title: string
  description?: string
}

export function QuestionCard({
  title,
  description,
  asChild = false,
  className,
  children,
  ...props
}: QuestionCardProps) {
  const Comp = asChild ? Slot : 'article'

  return (
    <Comp
      className={cx(
        'relative overflow-hidden rounded-xl bg-surface-container-lowest p-5',
        'outline-1 outline-ghost-border shadow-ambient transition-all duration-300 hover:-translate-y-1',
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="absolute bottom-3 left-0 top-3 w-1 rounded-r-full bg-primary"
      />
      <div className="pl-4">
        <Text asChild className="m-0" variant="headline-h2">
          <h3>{title}</h3>
        </Text>
        {description ? (
          <Text
            className="mb-0 mt-2"
            tone="on-surface-variant"
            variant="body-standard"
          >
            {description}
          </Text>
        ) : null}
        {children ? <div className="mt-4">{children}</div> : null}
      </div>
    </Comp>
  )
}
