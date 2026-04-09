import { Slot } from '@radix-ui/react-slot'
import type { HTMLAttributes } from 'react'

import { cx } from '@/shared/lib'
import { textVariantClasses } from './Text'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean
}

export function Badge({ asChild = false, className, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      className={cx(
        'inline-flex items-center rounded-full bg-surface-container-high px-3 py-1',
        textVariantClasses['label-small'],
        'text-on-surface',
        className,
      )}
      {...props}
    />
  )
}
