import { cx } from '@/shared/lib'
import { textVariantClasses } from './Text'

export interface StepperProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export function Stepper({ currentStep, totalSteps, className }: StepperProps) {
  return (
    <div className={cx('flex items-center gap-4', className)}>
      <span
        className={cx(
          textVariantClasses['label-small'],
          'text-primary font-bold tracking-[0.15em]',
        )}
      >
        Step 0{currentStep}
      </span>
      <div className="flex gap-1.5 flex-1 max-w-[120px]">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={cx(
              'h-1.5 flex-1 rounded-full transition-all duration-300',
              index < currentStep ? 'bg-primary' : 'bg-surface-container-high',
            )}
          />
        ))}
      </div>
    </div>
  )
}