export interface QuizOptionData {
  id: string
  label: string
}

export enum QuestionType {
  MultipleChoice = 'multiple-choice',
  ShortAnswer = 'short-answer',
}

export enum QuizState {
  Active = 'active',
  Completed = 'completed',
}

export interface QuestionResult {
  questionNumber: number
  questionText: string
  isCorrect: boolean
}

export interface QuizResultData {
  quizId: string
  quizTitle: string
  score: number
  totalQuestions: number
  timeSpent: string
  tabSwitches: number
  pastes: number
  questions: QuestionResult[]
}

export interface QuizChoice {
  id: string
  text: string
  isCorrect: boolean
}

export interface QuizQuestion {
  id: string
  type: QuestionType
  prompt: string
  code?: string
  choices?: QuizChoice[]
  correctAnswer?: string
}

export interface Quiz {
  id: string
  title: string
  description: string
  questions: QuizQuestion[]
}

export interface QuestionValidationError {
  questionId: string
  questionNumber: number
  invalidFields: string[]
}

export interface ValidationResult {
  isValid: boolean
  errors: QuestionValidationError[]
}
