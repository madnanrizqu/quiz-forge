import { MultipleChoiceInput } from './MultipleChoiceInput'
import { ShortAnswerInput } from './ShortAnswerInput'
import { QuestionType } from '../../model/types'
import type { QuizOptionData } from '../../model/types'

export interface AnswerSectionProps {
  questionType: QuestionType
  options: QuizOptionData[]
  answer: string
  onSetAnswer: (answer: string) => void
}

export function AnswerSection({
  questionType,
  options,
  answer,
  onSetAnswer,
}: AnswerSectionProps) {
  if (questionType === QuestionType.ShortAnswer) {
    return <ShortAnswerInput value={answer} onChange={onSetAnswer} />
  }

  return (
    <MultipleChoiceInput
      options={options}
      value={answer}
      onChange={onSetAnswer}
    />
  )
}
