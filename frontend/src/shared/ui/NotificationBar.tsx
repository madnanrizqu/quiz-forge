import type { ReactNode } from 'react'
import { cx } from '@/shared/lib'
import { Icon } from './icons'

export interface NotificationBarProps {
  title: string
  description?: ReactNode
  variant?: 'error' | 'success' | 'info' | 'warning'
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

const variantStyles = {
  error: {
    bg: 'bg-error-container/20',
    border: 'border-error/20',
    text: 'text-error',
    descriptionText: 'text-on-error-container/80',
    icon: 'mi:report' as const,
  },
  success: {
    bg: 'bg-success-container/20',
    border: 'border-success/20',
    text: 'text-success',
    descriptionText: 'text-on-success-container/80',
    icon: 'mi:check_circle' as const,
  },
  warning: {
    bg: 'bg-warning-container/20',
    border: 'border-warning/20',
    text: 'text-warning',
    descriptionText: 'text-on-warning-container/80',
    icon: 'mi:warning' as const,
  },
  info: {
    bg: 'bg-info-container/20',
    border: 'border-info/20',
    text: 'text-info',
    descriptionText: 'text-on-info-container/80',
    icon: 'mi:info' as const,
  },
}

export function NotificationBar({
  title,
  description,
  variant = 'error',
  headingLevel = 3,
  className,
}: NotificationBarProps) {
  const styles = variantStyles[variant]

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cx(
        styles.bg,
        styles.border,
        'border rounded-2xl p-4 flex items-start gap-4',
        className,
      )}
    >
      <Icon name={styles.icon} aria-hidden="true" className={cx(styles.text, 'mt-0.5')} />
      <div className="space-y-1">
        <p role="heading" aria-level={headingLevel} className={cx('text-sm font-semibold', styles.text)}>
          {title}
        </p>
        {description && (
          <div className={cx('text-sm', styles.descriptionText)}>{description}</div>
        )}
      </div>
    </div>
  )
}
