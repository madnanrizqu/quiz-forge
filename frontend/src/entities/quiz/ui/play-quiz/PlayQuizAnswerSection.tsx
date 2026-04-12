import { PlayQuizMultipleChoiceInput } from './PlayQuizMultipleChoiceInput'
import { PlayQuizShortAnswerInput } from './PlayQuizShortAnswerInput'
import { QuestionType } from '../../model/types'
import type { QuizOptionData } from '../../model/types'

export interface PlayQuizAnswerSectionProps {
  questionType: QuestionType
  options: QuizOptionData[]
  answer: string
  onSetAnswer: (answer: string) => void
}

export function PlayQuizAnswerSection({
  questionType,
  options,
  answer,
  onSetAnswer,
}: PlayQuizAnswerSectionProps) {
  if (questionType === QuestionType.ShortAnswer) {
    return <PlayQuizShortAnswerInput value={answer} onChange={onSetAnswer} />
  }

  return (
    <PlayQuizMultipleChoiceInput
      options={options}
      value={answer}
      onChange={onSetAnswer}
    />
  )
}