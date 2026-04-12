import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { QuizQuestion, QuestionValidationError } from '@/entities/quiz'
import { createDefaultQuestion } from './questionDefaults'

export interface QuestionStore {
  questions: QuizQuestion[]
  validationErrors: QuestionValidationError[]
  updateQuestion: (id: string, updated: QuizQuestion) => void
  deleteQuestion: (id: string) => void
  addQuestion: () => void
  setValidationErrors: (errors: QuestionValidationError[]) => void
  clearValidationErrors: () => void
}

export function createQuestionStore(quizId: string) {
  return create<QuestionStore>()(
    persist(
      (set) => ({
        questions: [createDefaultQuestion()],
        validationErrors: [],
        updateQuestion: (id, updated) =>
          set((state) => ({
            questions: state.questions.map((q) => (q.id === id ? updated : q)),
          })),
        deleteQuestion: (id) =>
          set((state) => ({
            questions: state.questions.filter((q) => q.id !== id),
          })),
        addQuestion: () =>
          set((state) => ({
            questions: [...state.questions, createDefaultQuestion()],
          })),
        setValidationErrors: (errors) =>
          set(() => ({
            validationErrors: errors,
          })),
        clearValidationErrors: () =>
          set(() => ({
            validationErrors: [],
          })),
      }),
      {
        name: `quiz-builder-questions-${quizId}`,
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
}