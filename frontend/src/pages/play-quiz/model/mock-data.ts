import { QuestionType } from '@/entities/quiz'
import type { QuizOptionData } from '@/entities/quiz'

export interface QuizPlayData {
  quizId: string
  questionNumber: number
  totalQuestions: number
  questionType: QuestionType
  questionText: string
  codeSnippet?: string
  options: QuizOptionData[]
}

export const MOCK_QUIZZES: Record<string, QuizPlayData> = {
  'quiz-1': {
    quizId: 'quiz-1',
    questionNumber: 7,
    totalQuestions: 12,
    questionType: QuestionType.MultipleChoice,
    questionText:
      'Which architectural principle refers to the ability of a system to handle a growing amount of work by adding resources to the system?',
    codeSnippet: 'function scale() { return "horizontal"; }',
    options: [
      { id: 'opt1', label: 'Vertical Integration' },
      { id: 'opt2', label: 'Scalability' },
      { id: 'opt3', label: 'Redundancy' },
      { id: 'opt4', label: 'Encapsulation' },
    ],
  },
  'quiz-2': {
    quizId: 'quiz-2',
    questionNumber: 1,
    totalQuestions: 1,
    questionType: QuestionType.ShortAnswer,
    questionText:
      'Which architectural principle refers to the ability of a system to handle a growing amount of work by adding resources to the system?',
    codeSnippet: undefined,
    options: [],
  },
}
