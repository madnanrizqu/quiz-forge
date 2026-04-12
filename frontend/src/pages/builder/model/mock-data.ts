export interface QuizQuestion {
  id: string
  type: 'multiple_choice' | 'short_answer'
  prompt: string
  code?: string
  choices?: { id: string; text: string; isCorrect: boolean }[]
  correctAnswer?: string
}

export interface Quiz {
  id: string
  title: string
  description: string
  questions: QuizQuestion[]
}

export const mockQuizzes: Quiz[] = [
  {
    id: 'quiz-001',
    title: 'Advanced JavaScript Patterns',
    description: 'Test your knowledge of advanced JavaScript concepts including closures, prototypes, and async patterns.',
    questions: [
      {
        id: 'q-001',
        type: 'multiple_choice',
        prompt: 'What is the output of typeof null in JavaScript?',
        code: "console.log(typeof null);",
        choices: [
          { id: 'c-001', text: 'object', isCorrect: true },
          { id: 'c-002', text: 'null', isCorrect: false },
          { id: 'c-003', text: 'undefined', isCorrect: false },
          { id: 'c-004', text: 'boolean', isCorrect: false },
        ],
      },
      {
        id: 'q-002',
        type: 'short_answer',
        prompt: 'What keyword is used to declare a constant variable in JavaScript?',
        correctAnswer: 'const',
      },
    ],
  },
  {
    id: 'quiz-002',
    title: 'React Fundamentals',
    description: 'Core concepts of React including components, state, and hooks.',
    questions: [],
  },
]

export function getQuizById(id: string): Quiz | undefined {
  return mockQuizzes.find((quiz) => quiz.id === id)
}