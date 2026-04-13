import type { ClipboardEventHandler } from 'react'
import { PlayerMultipleChoiceInput } from './PlayerMultipleChoiceInput'
import { PlayerShortAnswerInput } from './PlayerShortAnswerInput'
import { QuestionType } from '../../model/types'
import type { QuizOptionData } from '../../model/types'

export interface PlayerAnswerSectionProps {
  questionType: QuestionType
  options: QuizOptionData[]
  answer: number | string
  onSetAnswer: (answer: string | number) => void
  onPaste?: ClipboardEventHandler<HTMLInputElement>
}

export function PlayerAnswerSection({
  questionType,
  options,
  answer,
  onSetAnswer,
  onPaste,
}: PlayerAnswerSectionProps) {
  if (questionType === QuestionType.ShortAnswer) {
    return (
      <PlayerShortAnswerInput
        value={String(answer)}
        onChange={onSetAnswer}
        onPaste={onPaste}
      />
    )
  }

  return (
    <PlayerMultipleChoiceInput
      options={options}
      value={
        typeof answer === 'string' && answer.length > 0
          ? Number(answer)
          : typeof answer === 'number'
            ? answer
            : // initial unselected, also catch all
              -1
      }
      onChange={onSetAnswer}
    />
  )
}
