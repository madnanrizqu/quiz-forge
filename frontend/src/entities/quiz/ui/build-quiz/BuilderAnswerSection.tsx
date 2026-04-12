import { QuestionType } from '../../model/types'
import { BuilderMultipleChoiceInput } from './BuilderMultipleChoiceInput'
import { BuilderShortAnswerInput } from './BuilderShortAnswerInput'
import type { QuizChoice } from '../../model/types'

export interface BuilderAnswerSectionProps {
  questionType: QuestionType
  choices: QuizChoice[]
  correctAnswerId?: string
  shortAnswerValue?: string
  onTypeChange?: (type: QuestionType) => void
  onChoiceChange?: (choiceId: string, text: string) => void
  onCorrectAnswerChange?: (choiceId: string) => void
  onAddChoice?: () => void
  onDeleteChoice?: (choiceId: string) => void
  onShortAnswerChange?: (value: string) => void
}

export function BuilderAnswerSection({
  questionType,
  choices,
  correctAnswerId,
  shortAnswerValue,
  onChoiceChange,
  onCorrectAnswerChange,
  onAddChoice,
  onDeleteChoice,
  onShortAnswerChange,
}: BuilderAnswerSectionProps) {
  if (questionType === QuestionType.ShortAnswer) {
    return (
      <BuilderShortAnswerInput
        value={shortAnswerValue}
        onChange={onShortAnswerChange}
      />
    )
  }

  return (
    <BuilderMultipleChoiceInput
      choices={choices}
      correctAnswerId={correctAnswerId}
      onChoiceChange={onChoiceChange}
      onCorrectAnswerChange={onCorrectAnswerChange}
      onAddChoice={onAddChoice}
      onDeleteChoice={onDeleteChoice}
    />
  )
}
