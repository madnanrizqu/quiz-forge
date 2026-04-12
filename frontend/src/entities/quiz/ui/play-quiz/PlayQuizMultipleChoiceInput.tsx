import type { QuizOptionData } from '../../model/types'
import { PlayQuizQuizOption } from './PlayQuizQuizOption'

export interface PlayQuizMultipleChoiceInputProps {
  options: QuizOptionData[]
  value: string
  onChange: (value: string) => void
}

export function PlayQuizMultipleChoiceInput({
  options,
  value,
  onChange,
}: PlayQuizMultipleChoiceInputProps) {
  return (
    <fieldset className="space-y-4 border-0 p-0 m-0">
      <legend className="block text-sm font-semibold text-on-surface-variant mb-2 ml-1">
        Your Answer
      </legend>
      {options.map((option) => (
        <PlayQuizQuizOption
          key={option.id}
          name="quiz_option"
          value={option.id}
          label={option.label}
          checked={option.id === value}
          onChange={() => onChange(option.id)}
        />
      ))}
    </fieldset>
  )
}