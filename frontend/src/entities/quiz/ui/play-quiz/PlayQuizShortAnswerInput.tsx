import { Input, Label } from '@/shared/ui'
import { cx } from '@/shared/lib'
import type { InputHTMLAttributes } from 'react'

export interface PlayQuizShortAnswerInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> {
  value: string
  onChange: (value: string) => void
}

export function PlayQuizShortAnswerInput({
  value,
  onChange,
  className,
  ...props
}: PlayQuizShortAnswerInputProps) {
  return (
    <div className="group relative">
      <Label htmlFor="answer-input" className="mb-2 ml-1">
        Your Answer
      </Label>
      <Input
        id="answer-input"
        className={cx(
          'h-14 w-full rounded-xl bg-surface-container-lowest px-6',
          className,
        )}
        placeholder="Type your answer here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </div>
  )
}