import type {
  QuizQuestion,
  ValidationResult,
  QuestionValidationError,
} from '@/entities/quiz'
import { QuestionType } from '@/entities/quiz'

const fieldLabelMap: Record<string, string> = {
  prompt: 'Empty question prompt',
  choices: 'Empty multiple choice or less than 2',
  'correct answer': 'Empty short answer',
  code: 'Empty code snippet',
}

function getFieldLabel(field: string): string {
  return fieldLabelMap[field] ?? field
}

function getInvalidFields(question: QuizQuestion): string[] {
  const invalidFields: string[] = []

  if (!question.prompt.trim()) {
    invalidFields.push(getFieldLabel('prompt'))
  }

  if (question.code === '') {
    invalidFields.push(getFieldLabel('code'))
  }

  if (question.type === QuestionType.MultipleChoice) {
    if (!question.choices || question.choices.length < 2) {
      invalidFields.push(getFieldLabel('choices'))
    } else {
      const emptyChoices = question.choices.filter((c) => !c.text.trim())
      if (emptyChoices.length > 0) {
        invalidFields.push(getFieldLabel('choices'))
      }
    }
  }

  if (question.type === QuestionType.ShortAnswer) {
    if (!question.correctAnswer || question.correctAnswer.trim() === '') {
      invalidFields.push(getFieldLabel('correct answer'))
    }
  }

  return invalidFields
}

export function validateQuestion(
  question: QuizQuestion,
  questionNumber: number,
): QuestionValidationError | null {
  const invalidFields = getInvalidFields(question)

  if (invalidFields.length > 0) {
    return {
      questionId: question.id,
      questionNumber,
      invalidFields,
    }
  }

  return null
}

export function validateQuestions(questions: QuizQuestion[]): ValidationResult {
  const errors: QuestionValidationError[] = []

  questions.forEach((question, index) => {
    const error = validateQuestion(question, index + 1)
    if (error) {
      errors.push(error)
    }
  })

  return {
    isValid: errors.length === 0,
    errors,
  }
}
