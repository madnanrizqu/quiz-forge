import { useMemo } from 'react'
import { createQuestionStore } from './store'
import type { QuestionStore } from './store'
import { validateQuestion } from './questionValidation'

export function useQuestionList(quizId: string) {
  const store = useMemo(() => createQuestionStore(quizId), [quizId])

  const questions = store((state: QuestionStore) => state.questions)
  const validationErrors = store((state: QuestionStore) => state.validationErrors)
  const updateQuestion = store((state: QuestionStore) => state.updateQuestion)
  const deleteQuestion = store((state: QuestionStore) => state.deleteQuestion)
  const addQuestion = store((state: QuestionStore) => state.addQuestion)
  const setValidationErrors = store((state: QuestionStore) => state.setValidationErrors)

  const handleQuestionUpdate = (id: string, updated: Parameters<typeof updateQuestion>[1]) => {
    const currentErrors = store.getState().validationErrors
    updateQuestion(id, updated)

    const errorsForThisQuestion = currentErrors.filter((e) => e.questionId === id)
    if (errorsForThisQuestion.length > 0) {
      const questionNumber = errorsForThisQuestion[0].questionNumber
      const stillInvalid = validateQuestion(updated, questionNumber)
      if (!stillInvalid) {
        const remainingErrors = store.getState().validationErrors.filter((e) => e.questionId !== id)
        setValidationErrors(remainingErrors)
      }
    }
  }

  const handleQuestionDelete = (id: string) => {
    if (questions.length > 1) {
      deleteQuestion(id)
    }
  }

  const handleAddQuestion = () => {
    addQuestion()
  }

  return {
    questions,
    validationErrors,
    handlers: {
      handleQuestionUpdate,
      handleQuestionDelete,
      handleAddQuestion,
      setValidationErrors,
    },
  }
}