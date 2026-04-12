import { useCallback, useState } from 'react'
import type { QuizQuestion } from '@/entities/quiz'
import { createDefaultQuestion } from './questionDefaults'

export function useQuestionList(initialQuestions?: QuizQuestion[]) {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => {
    if (initialQuestions && initialQuestions.length > 0) {
      return initialQuestions
    }
    return [createDefaultQuestion()]
  })

  const handleQuestionUpdate = useCallback(
    (id: string, updated: QuizQuestion) => {
      setQuestions((prev) => prev.map((q) => (q.id === id ? updated : q)))
    },
    [],
  )

  const handleQuestionDelete = useCallback((id: string) => {
    setQuestions((prev) => {
      const filtered = prev.filter((q) => q.id !== id)
      return filtered.length > 0 ? filtered : [createDefaultQuestion()]
    })
  }, [])

  const handleAddQuestion = useCallback(() => {
    setQuestions((prev) => [...prev, createDefaultQuestion()])
  }, [])

  return {
    questions,
    handlers: {
      handleQuestionUpdate,
      handleQuestionDelete,
      handleAddQuestion,
    },
  }
}
