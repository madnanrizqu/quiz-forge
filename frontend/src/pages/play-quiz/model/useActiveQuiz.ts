import { useMemo } from 'react'
import { useQuiz, toQuizPlayData } from '@/entities/quiz'
import type { QuizPlayData } from '@/entities/quiz'
import { createActiveQuizStore } from './store'

interface UseActiveQuizProps {
  quizId: string
  attemptId: string
  onComplete?: (answers: Record<string, string>) => void
}

export function useActiveQuiz({
  quizId,
  attemptId,
  onComplete,
}: UseActiveQuizProps) {
  const { data, isLoading, error } = useQuiz(Number(quizId))
  const questions: QuizPlayData[] = useMemo(
    () => data?.questions.map((q) => toQuizPlayData(q, quizId)) ?? [],
    [data, quizId],
  )

  const store = useMemo(
    () => createActiveQuizStore(quizId, attemptId),
    [quizId, attemptId],
  )
  const { currentIndex, answers, setCurrentIndex, setAnswer, clearSession } =
    store()

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1
  const allQuestionsAnswered =
    questions.length > 0 &&
    questions.every(
      (q) => answers[q.questionId] && answers[q.questionId] !== '',
    )

  const handleSetAnswer = (questionId: string, answer: string) => {
    setAnswer(questionId, answer)
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleSubmit = () => {
    if (!onComplete) return

    clearSession()
    onComplete(answers)
  }

  const answeredCount = Object.keys(answers).filter(
    (k) => answers[k] !== '',
  ).length
  const progress =
    questions.length > 0
      ? Math.round((answeredCount / questions.length) * 100)
      : 0

  return {
    currentIndex,
    currentQuestion,
    isLastQuestion,
    allQuestionsAnswered,
    totalQuestions: questions.length,
    answers,
    progress,
    isLoading,
    error,
    handleSetAnswer,
    handlePrevious,
    handleNext,
    handleSubmit,
  }
}
