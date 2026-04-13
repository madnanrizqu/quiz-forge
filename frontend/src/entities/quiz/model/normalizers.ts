import type { QuestionResponse, SubmitResponse } from '../api/types'
import { QuestionType } from './types'
import type { QuizPlayData, QuizResultData } from './types'
import { QUESTION_PROMPT_CODE_DELIMITER } from './config'

const TO_QUESTION_TYPE: Record<string, QuestionType> = {
  mcq: QuestionType.MultipleChoice,
  short: QuestionType.ShortAnswer,
}

export function toQuizPlayData(
  response: QuestionResponse,
  quizIdStr: string,
): QuizPlayData {
  const parts = response.prompt.split(QUESTION_PROMPT_CODE_DELIMITER)
  const questionText = parts[0] ?? response.prompt
  const codeSnippet =
    parts.length > 1 ? parts.slice(1).join(QUESTION_PROMPT_CODE_DELIMITER) : undefined

  return {
    quizId: quizIdStr,
    questionId: response.id,
    questionType: TO_QUESTION_TYPE[response.type] ?? QuestionType.ShortAnswer,
    questionText,
    codeSnippet,
    options:
      response.options?.map((opt, i) => ({
        id: String(i + 1),
        label: opt,
      })) ?? [],
  }
}

export function toQuizResultData(
  response: SubmitResponse,
  context: {
    quizId: string
    quizTitle: string
    questions: QuizPlayData[]
    tabSwitches?: number
    pastes?: number
  },
): QuizResultData {
  return {
    quizId: context.quizId,
    quizTitle: context.quizTitle,
    score: response.score,
    totalQuestions: context.questions.length,
    timeSpent: '0:00',
    tabSwitches: context.tabSwitches ?? 0,
    pastes: context.pastes ?? 0,
    questions: response.details.map((detail) => {
      const question = context.questions.find(
        (q) => q.questionId === detail.questionId,
      )
      return {
        questionNumber: question?.questionId ?? detail.questionId,
        questionText: question?.questionText ?? '',
        isCorrect: detail.correct,
      }
    }),
  }
}
