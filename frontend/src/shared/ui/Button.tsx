import { Slot } from '@radix-ui/react-slot'
import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'

import { cx } from '@/shared/lib'
import { textVariantClasses } from './Text'

type ButtonVariant = 'primary' | 'ghost' | 'soft' | 'icon'
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: cx('h-9 px-4', textVariantClasses['body-standard']),
  md: cx('h-11 px-5', textVariantClasses['body-standard']),
  lg: cx('h-12 px-6', textVariantClasses['title-large']),
  icon: 'h-10 w-10 p-0',
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-gradient text-on-primary shadow-primary hover:-translate-y-0.5',
  ghost:
    'bg-transparent text-primary hover:-translate-y-0.5 hover:bg-surface-container-low',
  soft: 'bg-primary-fixed text-primary hover:bg-surface-container-high',
  icon: 'bg-transparent text-outline hover:text-error hover:bg-error/10',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      className,
      variant = 'primary',
      size = 'md',
      style,
      type,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cx(
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2',
          'focus-visible:ring-offset-surface disabled:pointer-events-none disabled:opacity-50',
          sizeClasses[size],
          variantClasses[variant],
          className,
        )}
        ref={ref}
        style={style}
        type={!asChild ? (type ?? 'button') : undefined}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
