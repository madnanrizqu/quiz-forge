import { Button, Icon, Input, Radio } from '@/shared/ui'
import type { QuizChoice } from '../../model/types'

export interface BuilderMultipleChoiceInputProps {
  choices: QuizChoice[]
  correctAnswerId?: string
  name: string
  onChoiceChange?: (choiceId: string, text: string) => void
  onCorrectAnswerChange?: (choiceId: string) => void
  onAddChoice?: () => void
  onDeleteChoice?: (choiceId: string) => void
  disabled?: boolean
}

export function BuilderMultipleChoiceInput({
  choices,
  correctAnswerId,
  name,
  onChoiceChange,
  onCorrectAnswerChange,
  onAddChoice,
  onDeleteChoice,
  disabled,
}: BuilderMultipleChoiceInputProps) {
  return (
    <div className="space-y-3">
      <label className="block mb-2 text-sm font-semibold text-on-surface-variant">
        Answer Choices
      </label>
      {choices.map((choice) => (
        <div key={choice.id} className="flex items-center gap-4 group/option">
          <Radio
            name={name}
            checked={choice.id === correctAnswerId}
            onChange={() => onCorrectAnswerChange?.(choice.id)}
            disabled={disabled}
          />
          <Input
            className="flex-1 bg-surface-container-low h-12 text-sm font-medium"
            value={choice.text}
            onChange={(e) => onChoiceChange?.(choice.id, e.target.value)}
            disabled={disabled}
          />
          <Button
            variant="icon"
            size="icon"
            onClick={() => onDeleteChoice?.(choice.id)}
            disabled={disabled}
          >
            <Icon name="mi:delete" />
          </Button>
        </div>
      ))}
      {!disabled && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 text-primary font-semibold text-sm -ml-2"
          onClick={onAddChoice}
        >
          <Icon name="mi:add" size="sm" className="mr-2" />
          Add Choice
        </Button>
      )}
    </div>
  )
}
