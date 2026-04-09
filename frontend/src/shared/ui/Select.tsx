import { forwardRef } from 'react'
import type { SelectHTMLAttributes } from 'react'

import { cx } from '@/shared/lib'
import { Icon } from './icons'
import { textVariantClasses } from './Text'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative inline-block w-full md:w-auto">
        <select
          className={cx(
            'w-full appearance-none rounded-lg border-0 bg-surface-container-low py-1.5 pl-4 pr-10',
            textVariantClasses['body-standard'],
            'font-medium text-on-surface cursor-pointer',
            'transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-on-surface-variant">
          <Icon name="svg:chevron_down" size={16} />
        </div>
      </div>
    )
  },
)

Select.displayName = 'Select'
