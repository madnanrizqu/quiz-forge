import * as LabelPrimitive from '@radix-ui/react-label'
import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef, ElementRef } from 'react'

import { cx } from '@/shared/lib/cx'
import { textVariantClasses } from './Text'

type LabelElement = ElementRef<typeof LabelPrimitive.Root>
type LabelProps = ComponentPropsWithoutRef<typeof LabelPrimitive.Root>

export const Label = forwardRef<LabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <LabelPrimitive.Root
        className={cx(
          'block text-on-surface-variant',
          textVariantClasses['label-small'],
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

Label.displayName = 'Label'
