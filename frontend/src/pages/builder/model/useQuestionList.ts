import { useMemo } from 'react'
import { createQuestionStore } from './store'
import type { QuestionStore } from './store'

export function useQuestionList(quizId: string) {
  const store = useMemo(() => createQuestionStore(quizId), [quizId])

  const questions = store((state: QuestionStore) => state.questions)
  const updateQuestion = store((state: QuestionStore) => state.updateQuestion)
  const deleteQuestion = store((state: QuestionStore) => state.deleteQuestion)
  const addQuestion = store((state: QuestionStore) => state.addQuestion)

  const handleQuestionUpdate = (id: string, updated: Parameters<typeof updateQuestion>[1]) => {
    updateQuestion(id, updated)
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
    handlers: {
      handleQuestionUpdate,
      handleQuestionDelete,
      handleAddQuestion,
    },
  }
}