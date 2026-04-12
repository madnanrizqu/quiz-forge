import { useMemo } from 'react'
import { useQuiz, toQuizPlayData } from '@/entities/quiz'
import type { QuizPlayData } from '@/entities/quiz'
import { createActiveQuizStore } from './store'

interface UseActiveQuizProps {
  quizId: string
  attemptId: string
  onComplete: (answers: Record<string, string>) => void
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
    clearSession()
    onComplete(answers)
  }

  return {
    currentIndex,
    currentQuestion,
    isLastQuestion,
    totalQuestions: questions.length,
    answers,
    isLoading,
    error,
    handleSetAnswer,
    handlePrevious,
    handleNext,
    handleSubmit,
  }
}
