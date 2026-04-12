import type { QuestionResponse } from '../api/types'
import { QuestionType } from './types'
import type { QuizPlayData } from './types'

const TO_QUESTION_TYPE: Record<string, QuestionType> = {
  mcq: QuestionType.MultipleChoice,
  short: QuestionType.ShortAnswer,
}

export function toQuizPlayData(
  response: QuestionResponse,
  quizIdStr: string,
): QuizPlayData {
  return {
    quizId: quizIdStr,
    questionId: response.id,
    questionType: TO_QUESTION_TYPE[response.type] ?? QuestionType.ShortAnswer,
    questionText: response.prompt,
    codeSnippet: undefined,
    options:
      response.options?.map((opt, i) => ({
        id: String(i + 1),
        label: opt,
      })) ?? [],
  }
}
