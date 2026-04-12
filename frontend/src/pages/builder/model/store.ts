import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { QuizQuestion } from '@/entities/quiz'
import { createDefaultQuestion } from './questionDefaults'

export interface QuestionStore {
  questions: QuizQuestion[]
  updateQuestion: (id: string, updated: QuizQuestion) => void
  deleteQuestion: (id: string) => void
  addQuestion: () => void
}

export function createQuestionStore(quizId: string) {
  return create<QuestionStore>()(
    persist(
      (set) => ({
        questions: [createDefaultQuestion()],
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
      }),
      {
        name: `quiz-builder-questions-${quizId}`,
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
}