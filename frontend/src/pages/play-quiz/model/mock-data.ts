import type { QuizOptionData } from '@/entities/quiz'

export interface PlayQuizPageProps {
  questionNumber: number
  totalQuestions: number
  questionType: string
  questionText: string
  codeSnippet?: string
  options: QuizOptionData[]
  onPrevious?: () => void
  onNext?: () => void
  onSubmit?: () => void
}

export const MOCK_QUIZ_PLAY_PROPS: Omit<
  PlayQuizPageProps,
  'onPrevious' | 'onNext' | 'onSubmit'
> = {
  questionNumber: 7,
  totalQuestions: 12,
  questionType: 'Multiple Choice',
  questionText:
    'Which architectural principle refers to the ability of a system to handle a growing amount of work by adding resources to the system?',
  codeSnippet: 'function scale() { return "horizontal"; }',
  options: [
    { id: 'opt1', label: 'Vertical Integration' },
    { id: 'opt2', label: 'Scalability' },
    { id: 'opt3', label: 'Redundancy' },
    { id: 'opt4', label: 'Encapsulation' },
  ],
}
