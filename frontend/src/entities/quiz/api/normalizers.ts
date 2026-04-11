import type { QuestionResponse, AttemptWithQuizResponse } from './types'
import { QuestionType as FrontendQuestionType } from '../model/types'

const API_TO_QUESTION_TYPE: Record<string, FrontendQuestionType> = {
  mcq: FrontendQuestionType.MultipleChoice,
  short: FrontendQuestionType.ShortAnswer,
}

export function toQuestionType(apiType: string): FrontendQuestionType {
  const mapped = API_TO_QUESTION_TYPE[apiType] as
    | FrontendQuestionType
    | undefined
  if (mapped === undefined) {
    throw new Error(`Unknown question type from backend: ${apiType}`)
  }
  return mapped
}

export function toQuestion(response: QuestionResponse): QuestionResponse {
  return {
    ...response,
    type: toQuestionType(response.type) as unknown as QuestionResponse['type'],
  }
}

export function toQuestions(responses: QuestionResponse[]): QuestionResponse[] {
  return responses.map(toQuestion)
}

export function toAttemptWithQuiz(
  response: AttemptWithQuizResponse,
): AttemptWithQuizResponse {
  return {
    ...response,
    quiz: {
      ...response.quiz,
      questions: toQuestions(response.quiz.questions),
    },
  }
}
