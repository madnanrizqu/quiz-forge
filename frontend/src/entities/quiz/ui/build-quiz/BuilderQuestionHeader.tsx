import { Badge, Select } from '@/shared/ui'
import { QuestionType } from '../../model/types'

export interface BuilderQuestionHeaderProps {
  questionNumber: number
  type: QuestionType
  onTypeChange?: (type: QuestionType) => void
  disabled?: boolean
}

export function BuilderQuestionHeader({
  questionNumber,
  type,
  onTypeChange,
  disabled,
}: BuilderQuestionHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-6">
      <Badge className="bg-primary-fixed text-on-primary-fixed-variant font-bold uppercase tracking-wider text-xs">
        Question {String(questionNumber).padStart(2, '0')}
      </Badge>
      <Select
        value={type}
        onChange={(e) => onTypeChange?.(e.target.value as QuestionType)}
        disabled={disabled}
      >
        <option value={QuestionType.MultipleChoice}>Multiple Choice</option>
        <option value={QuestionType.ShortAnswer}>Short Answer</option>
      </Select>
    </div>
  )
}
