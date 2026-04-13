import type { StoreApi, UseBoundStore } from 'zustand'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface PlayQuizStore {
  currentIndex: number
  answers: Record<string, string>
  setCurrentIndex: (index: number) => void
  setAnswer: (questionId: string, answer: string) => void
  clearSession: () => void
}

export type ActiveQuizStoreApi = UseBoundStore<StoreApi<PlayQuizStore>>

const storeCache = new Map<string, ActiveQuizStoreApi>()

export function createActiveQuizStore(
  quizId: string,
  attemptId: string,
): ActiveQuizStoreApi {
  const key = `${quizId}-${attemptId}`

  if (!storeCache.has(key)) {
    const store = create<PlayQuizStore>()(
      persist(
        (set) => ({
          currentIndex: 0,
          answers: {},
          setCurrentIndex: (index) => set({ currentIndex: index }),
          setAnswer: (questionId, answer) =>
            set((state) => ({
              answers: { ...state.answers, [questionId]: answer },
            })),
          clearSession: () => {
            sessionStorage.removeItem(`quiz-play-${quizId}-${attemptId}`)
          },
        }),
        {
          name: `quiz-play-${quizId}-${attemptId}`,
          storage: createJSONStorage(() => sessionStorage),
        },
      ),
    )

    storeCache.set(key, store)
  }

  return storeCache.get(key)!
}
