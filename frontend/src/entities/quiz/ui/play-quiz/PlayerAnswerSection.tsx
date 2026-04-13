import { PlayerMultipleChoiceInput } from './PlayerMultipleChoiceInput'
import { PlayerShortAnswerInput } from './PlayerShortAnswerInput'
import { QuestionType } from '../../model/types'
import type { QuizOptionData } from '../../model/types'

export interface PlayerAnswerSectionProps {
  questionType: QuestionType
  options: QuizOptionData[]
  answer: number | string
  onSetAnswer: (answer: string | number) => void
}

export function PlayerAnswerSection({
  questionType,
  options,
  answer,
  onSetAnswer,
}: PlayerAnswerSectionProps) {
  if (questionType === QuestionType.ShortAnswer) {
    return (
      <PlayerShortAnswerInput value={String(answer)} onChange={onSetAnswer} />
    )
  }

  return (
    <PlayerMultipleChoiceInput
      options={options}
      value={Number(answer)}
      onChange={onSetAnswer}
    />
  )
}
