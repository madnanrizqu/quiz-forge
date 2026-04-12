import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { QuizQuestion, QuestionValidationError } from '@/entities/quiz'
import { createDefaultQuestion } from './questionDefaults'

export interface QuestionStore {
  questions: QuizQuestion[]
  validationErrors: QuestionValidationError[]
  isSubmitting: boolean
  isSuccess: boolean
  submitError: string | null
  updateQuestion: (id: string, updated: QuizQuestion) => void
  deleteQuestion: (id: string) => void
  addQuestion: () => void
  setValidationErrors: (errors: QuestionValidationError[]) => void
  clearValidationErrors: () => void
  markQuestionAsCreated: (id: string, apiId: number) => void
  setIsSubmitting: (isSubmitting: boolean) => void
  setIsSuccess: (isSuccess: boolean) => void
  setSubmitError: (error: string | null) => void
  clearSubmitError: () => void
  clearSession: () => void
}

export type QuestionStoreApi = ReturnType<typeof createQuestionStore>

export function createQuestionStore(quizId: string) {
  return create<QuestionStore>()(
    persist(
      (set) => ({
        questions: [createDefaultQuestion()],
        validationErrors: [],
        isSubmitting: false,
        isSuccess: false,
        submitError: null,
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
        markQuestionAsCreated: (id, apiId) =>
          set((state) => ({
            questions: state.questions.map((q) =>
              q.id === id ? { ...q, apiId } : q,
            ),
          })),
        setIsSubmitting: (isSubmitting) =>
          set(() => ({
            isSubmitting,
          })),
        setIsSuccess: (isSuccess) =>
          set(() => ({
            isSuccess,
          })),
        setSubmitError: (error) =>
          set(() => ({
            submitError: error,
          })),
        clearSubmitError: () =>
          set(() => ({
            submitError: null,
          })),
        clearSession: () => {
          sessionStorage.removeItem(`quiz-builder-questions-${quizId}`)
        },
      }),
      {
        name: `quiz-builder-questions-${quizId}`,
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  )
}
