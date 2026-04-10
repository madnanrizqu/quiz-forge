import { useState } from 'react'
import { QuizOption } from '@/shared/ui'
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

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <QuizOption
          key={option.id}
          name="quiz_option"
          value={option.id}
          label={option.label}
        />
      ))}
    </div>
  )
}
