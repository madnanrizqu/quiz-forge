import type { QuizChoice, QuizQuestion } from '@/entities/quiz'
import { QuestionType } from '@/entities/quiz'

export const DEFAULT_CHOICES: QuizChoice[] = [
  { id: '1', text: '', isCorrect: true },
  { id: '2', text: '', isCorrect: false },
]

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

export function getInitialCorrectAnswerId(choices?: QuizChoice[]): string {
  if (choices) {
    const correct = choices.find((c) => c.isCorrect)
    return correct?.id ?? '1'
  }
  return '1'
}

export function createDefaultQuestion(
  type: QuestionType = QuestionType.MultipleChoice,
): QuizQuestion {
  return {
    id: generateId(),
    type,
    prompt: '',
    ...(type === QuestionType.MultipleChoice
      ? {
          choices: [
            { id: generateId(), text: '', isCorrect: true },
            { id: generateId(), text: '', isCorrect: false },
          ],
        }
      : { correctAnswer: '' }),
  }
}

export function getQuestionInitialState(defaultValue?: QuizQuestion) {
  return {
    type: defaultValue?.type ?? QuestionType.MultipleChoice,
    prompt: defaultValue?.prompt ?? '',
    code: defaultValue?.code ?? '',
    choices: defaultValue?.choices ?? DEFAULT_CHOICES,
    correctAnswerId: getInitialCorrectAnswerId(defaultValue?.choices),
    shortAnswer: defaultValue?.correctAnswer ?? '',
  }
}
