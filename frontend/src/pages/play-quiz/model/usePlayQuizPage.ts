import { useCallback, useMemo, useState } from 'react'
import { QuizState, useQuiz } from '@/entities/quiz'
import { createActiveQuizStore } from './store'
import { MOCK_QUIZ_RESULTS } from './mock-data'

interface UsePlayQuizPageProps {
  quizId: string
  attemptId: string
}

export function usePlayQuizPage({ quizId, attemptId }: UsePlayQuizPageProps) {
  const [quizState, setQuizState] = useState<QuizState>(QuizState.Active)

  const { data: quizQueryData } = useQuiz(Number(quizId))

  const store = useMemo(
    () => createActiveQuizStore(quizId, attemptId),
    [quizId, attemptId],
  )
  const { answers } = store()

  const quizResult = MOCK_QUIZ_RESULTS[quizId] as
    | (typeof MOCK_QUIZ_RESULTS)[string]
    | undefined
  const totalQuestions = quizQueryData?.questions.length ?? 0

  const getProgress = useCallback(() => {
    const answeredCount = Object.keys(answers).filter(
      (k) => answers[k] !== '',
    ).length
    return totalQuestions > 0
      ? Math.round((answeredCount / totalQuestions) * 100)
      : 0
  }, [answers, totalQuestions])

  const handleComplete = useCallback(() => {
    setQuizState(QuizState.Completed)
  }, [])

  return {
    quizState,
    setQuizState,
    quizResult,
    getProgress,
    handleComplete,
  }
}
