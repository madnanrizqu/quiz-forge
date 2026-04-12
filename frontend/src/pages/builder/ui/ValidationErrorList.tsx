import type { QuestionValidationError } from '@/entities/quiz'

export interface ValidationErrorListProps {
  errors: QuestionValidationError[]
}

export function ValidationErrorList({ errors }: ValidationErrorListProps) {
  return (
    <ul className="list-disc list-inside space-y-1">
      {errors.map((e) => (
        <li key={e.questionId}>
          <span className="font-medium">Question {e.questionNumber}</span>
          {': '}
          {e.invalidFields.join(', ')}
        </li>
      ))}
    </ul>
  )
}
