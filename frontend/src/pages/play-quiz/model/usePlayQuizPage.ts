import { useCallback, useMemo, useState } from 'react'
import { QuizState, useQuiz } from '@/entities/quiz'
import type { QuizResultData } from '@/entities/quiz'
import { createActiveQuizStore } from './store'

interface UsePlayQuizPageProps {
  quizId: string
  attemptId: string
}

export function usePlayQuizPage({ quizId, attemptId }: UsePlayQuizPageProps) {
  const [quizState, setQuizState] = useState<QuizState>(QuizState.Active)
  const [quizResult, setQuizResult] = useState<QuizResultData | undefined>()

  const { data: quizQueryData } = useQuiz(Number(quizId))

  const store = useMemo(
    () => createActiveQuizStore(quizId, attemptId),
    [quizId, attemptId],
  )
  const { answers } = store()

  const totalQuestions = quizQueryData?.questions.length ?? 0

  const getProgress = useCallback(() => {
    const answeredCount = Object.keys(answers).filter(
      (k) => answers[k] !== '',
    ).length
    return totalQuestions > 0
      ? Math.round((answeredCount / totalQuestions) * 100)
      : 0
  }, [answers, totalQuestions])

  const handleComplete = useCallback((result: QuizResultData) => {
    setQuizResult(result)
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
