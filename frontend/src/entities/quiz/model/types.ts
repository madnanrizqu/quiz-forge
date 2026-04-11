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
