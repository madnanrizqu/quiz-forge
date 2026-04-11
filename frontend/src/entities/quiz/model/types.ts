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
