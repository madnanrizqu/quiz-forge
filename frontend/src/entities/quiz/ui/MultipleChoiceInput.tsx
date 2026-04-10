import { QuizOption } from '@/shared/ui'
import type { QuizOptionData } from '../model/types'

export interface MultipleChoiceInputProps {
  options: QuizOptionData[]
}

export function MultipleChoiceInput({ options }: MultipleChoiceInputProps) {
  return (
    <fieldset className="space-y-4 border-0 p-0 m-0">
      <legend className="block text-sm font-semibold text-on-surface-variant mb-2 ml-1">
        Your Answer
      </legend>
      {options.map((option) => (
        <QuizOption
          key={option.id}
          name="quiz_option"
          value={option.id}
          label={option.label}
        />
      ))}
    </fieldset>
  )
}
