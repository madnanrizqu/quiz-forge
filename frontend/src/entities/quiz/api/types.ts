// ==================== QUESTION TYPES ====================
export type ApiQuestionType = 'mcq' | 'short' | 'code'

// ==================== RESPONSE TYPES ====================

export interface QuizListResponse {
  id: number
  title: string
  description: string
  timeLimitSeconds?: number
  isPublished: boolean
  createdAt: string
}

export type QuizResponse = QuizListResponse

export interface QuizWithQuestionsResponse extends QuizResponse {
  questions: QuestionResponse[]
}

export interface QuestionResponse {
  id: number
  quizId: number
  type: ApiQuestionType
  prompt: string
  options?: string[]
  correctAnswer?: string | number
  position: number
}

export interface AttemptResponse {
  id: number
  quizId: number
  startedAt: string
  submittedAt?: string
  answers: Array<{ questionId: number; value: string }>
  score?: number
}

export interface AttemptWithQuizResponse extends AttemptResponse {
  quiz: Omit<QuizResponse, 'isPublished'> & {
    questions: QuestionResponse[]
  }
}

export interface SubmitResponse {
  score: number
  details: Array<{ questionId: number; correct: boolean; expected?: string }>
}

export interface OkResponse { ok: true }

// ==================== PATH PARAMS ====================
export interface QuizPathParams { id: number }
export interface QuestionPathParams { id: number }
export interface AttemptPathParams { id: number }

// ==================== QUERY PARAMS ====================
export interface EmptyQueryParams {}

// ==================== PAYLOAD TYPES ====================
export interface CreateQuizPayload {
  title: string
  description: string
  timeLimitSeconds?: number
  isPublished?: boolean
}

export interface UpdateQuizPayload {
  title?: string
  description?: string
  timeLimitSeconds?: number
  isPublished?: boolean
}

export interface CreateQuestionPayload {
  type: ApiQuestionType
  prompt: string
  options?: string[]
  correctAnswer?: string | number
  position?: number
}

export interface UpdateQuestionPayload {
  type?: ApiQuestionType
  prompt?: string
  options?: string[] | null
  correctAnswer?: string | number
  position?: number
}

export interface StartAttemptPayload {
  quizId: number
}

export interface AnswerPayload {
  questionId: number
  value: string | number
}
