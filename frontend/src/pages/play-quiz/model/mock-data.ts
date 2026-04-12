import { QuestionType } from '@/entities/quiz'
import type { QuizResultData, QuizPlayData } from '@/entities/quiz'

export const MOCK_QUIZZES: Record<string, QuizPlayData[]> = {
  'quiz-1': [
    {
      quizId: 'quiz-1',
      questionNumber: 1,
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
    {
      quizId: 'quiz-1',
      questionNumber: 2,
      questionType: QuestionType.ShortAnswer,
      questionText:
        'What is the primary purpose of a load balancer in a distributed system?',
      codeSnippet: undefined,
      options: [],
    },
    {
      quizId: 'quiz-1',
      questionNumber: 3,
      questionType: QuestionType.MultipleChoice,
      questionText:
        'Which pattern describes the decomposition of a monolithic application into microservices?',
      codeSnippet: 'function decompose() { return "microservices"; }',
      options: [
        { id: 'opt1', label: 'Monolithic Pattern' },
        { id: 'opt2', label: 'Microservices Pattern' },
        { id: 'opt3', label: 'Serverless Pattern' },
        { id: 'opt4', label: 'Event-Driven Pattern' },
      ],
    },
  ],
  'quiz-2': [
    {
      quizId: 'quiz-2',
      questionNumber: 1,
      questionType: QuestionType.ShortAnswer,
      questionText:
        'Which architectural principle refers to the ability of a system to handle a growing amount of work by adding resources to the system?',
      codeSnippet: undefined,
      options: [],
    },
  ],
}

export const MOCK_QUIZ_RESULTS: Record<string, QuizResultData> = {
  'quiz-1': {
    quizId: 'quiz-1',
    quizTitle: 'Financial Architect Certification Assessment',
    score: 17,
    totalQuestions: 20,
    timeSpent: '12:45',
    tabSwitches: 2,
    pastes: 3,
    questions: [
      {
        questionNumber: 1,
        questionText:
          'What is the primary objective of a "Fluid Architect" design philosophy?',
        isCorrect: true,
      },
      {
        questionNumber: 2,
        questionText:
          'Which color hex code is used as the primary container in this design system?',
        isCorrect: false,
      },
      {
        questionNumber: 3,
        questionText:
          'How should boundaries be defined according to the "No-Line" rule?',
        isCorrect: true,
      },
      {
        questionNumber: 4,
        questionText:
          'What is the recommended radius for main containers in this system?',
        isCorrect: true,
      },
      {
        questionNumber: 5,
        questionText:
          'Which principle describes the ability of a system to handle growing workloads?',
        isCorrect: true,
      },
      {
        questionNumber: 6,
        questionText:
          'What is the purpose of the ambient shadow in the design system?',
        isCorrect: false,
      },
      {
        questionNumber: 7,
        questionText:
          'How does the surface hierarchy help users navigate the interface?',
        isCorrect: true,
      },
      {
        questionNumber: 8,
        questionText:
          'Which typeface is recommended for headlines according to the design system?',
        isCorrect: true,
      },
    ],
  },
  'quiz-2': {
    quizId: 'quiz-2',
    quizTitle: 'Software Architecture Fundamentals',
    score: 6,
    totalQuestions: 8,
    timeSpent: '08:22',
    tabSwitches: 1,
    pastes: 1,
    questions: [
      {
        questionNumber: 1,
        questionText:
          'Which architectural principle refers to the ability of a system to handle a growing amount of work by adding resources to the system?',
        isCorrect: true,
      },
      {
        questionNumber: 2,
        questionText:
          'What is the primary purpose of a load balancer in a distributed system?',
        isCorrect: true,
      },
      {
        questionNumber: 3,
        questionText:
          'Which pattern describes the decomposition of a monolithic application into microservices?',
        isCorrect: false,
      },
      {
        questionNumber: 4,
        questionText:
          'What does the CAP theorem state about distributed systems?',
        isCorrect: true,
      },
      {
        questionNumber: 5,
        questionText:
          'Which type of database is most suitable for handling unstructured data?',
        isCorrect: true,
      },
      {
        questionNumber: 6,
        questionText:
          'What is the main advantage of event-driven architecture?',
        isCorrect: false,
      },
      {
        questionNumber: 7,
        questionText:
          'Which principle states that each component should have only one responsibility?',
        isCorrect: true,
      },
      {
        questionNumber: 8,
        questionText: 'What is eventual consistency in distributed databases?',
        isCorrect: true,
      },
    ],
  },
}
