import { QuestionType } from '@/entities/quiz'
import type { Quiz } from '@/entities/quiz'

export const mockQuizzes: Quiz[] = [
  {
    id: 'quiz-001',
    title: 'Advanced JavaScript Patterns',
    description:
      'Test your knowledge of advanced JavaScript concepts including closures, prototypes, and async patterns.',
    questions: [
      {
        id: 'q-001',
        type: QuestionType.MultipleChoice,
        prompt: 'What is the output of typeof null in JavaScript?',
        code: 'console.log(typeof null);',
        choices: [
          { id: 'c-001', text: 'object', isCorrect: true },
          { id: 'c-002', text: 'null', isCorrect: false },
          { id: 'c-003', text: 'undefined', isCorrect: false },
          { id: 'c-004', text: 'boolean', isCorrect: false },
        ],
      },
      {
        id: 'q-002',
        type: QuestionType.ShortAnswer,
        prompt:
          'What keyword is used to declare a constant variable in JavaScript?',
        correctAnswer: 'const',
      },
    ],
  },
  {
    id: 'quiz-002',
    title: 'React Fundamentals',
    description:
      'Core concepts of React including components, state, and hooks.',
    questions: [],
  },
]

export function getQuizById(id: string): Quiz | undefined {
  return mockQuizzes.find((quiz) => quiz.id === id)
}
