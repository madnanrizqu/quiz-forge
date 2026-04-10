import { useState } from 'react'
import { MultipleChoiceInput } from './MultipleChoiceInput'
import { ShortAnswerInput } from './ShortAnswerInput'
import { QuestionType } from '../model/types'
import type { QuizOptionData } from '../model/types'

export interface AnswerSectionProps {
  questionType: QuestionType
  options: QuizOptionData[]
}

export function AnswerSection({ questionType, options }: AnswerSectionProps) {
  const [shortAnswer, setShortAnswer] = useState('')

  if (questionType === QuestionType.ShortAnswer) {
    return <ShortAnswerInput value={shortAnswer} onChange={setShortAnswer} />
  }

  return <MultipleChoiceInput options={options} />
}
