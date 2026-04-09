import { Slot } from '@radix-ui/react-slot'
import type { ComponentPropsWithoutRef } from 'react'

import { cx } from '@/shared/lib'

export type TextVariant =
  | 'display-h1'
  | 'headline-h2'
  | 'title-large'
  | 'body-standard'
  | 'label-small'
  | 'micro'

type TextTone = 'on-surface' | 'on-surface-variant' | 'on-primary' | 'primary'

export interface TextProps extends ComponentPropsWithoutRef<'p'> {
  asChild?: boolean
  tone?: TextTone
  variant?: TextVariant
}

export const textVariantClasses: Record<TextVariant, string> = {
  'display-h1':
    'font-display text-display-h1 font-display-h1 tracking-display-h1',
  'headline-h2':
    'font-display text-headline-h2 font-headline-h2 tracking-headline-h2',
  'title-large': 'font-sans text-title-large font-title-large',
  'body-standard': 'font-sans text-body-standard font-body-standard',
  'label-small':
    'font-sans text-label-small font-label-small uppercase tracking-label-small',
  micro: 'font-sans text-micro font-micro',
}

const textToneClasses: Record<TextTone, string> = {
  'on-surface': 'text-on-surface',
  'on-surface-variant': 'text-on-surface-variant',
  'on-primary': 'text-on-primary',
  primary: 'text-primary',
}

export function Text({
  asChild = false,
  className,
  tone = 'on-surface',
  variant = 'body-standard',
  ...props
}: TextProps) {
  const Comp = asChild ? Slot : 'p'

  return (
    <Comp
      className={cx(
        textVariantClasses[variant],
        textToneClasses[tone],
        className,
      )}
      {...props}
    />
  )
}
