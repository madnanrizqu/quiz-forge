import { useMemo, useState } from 'react'
import { useQuiz, toQuizPlayData } from '@/entities/quiz'
import type { QuizPlayData } from '@/entities/quiz'

interface UseActiveQuizProps {
  quizId: string
  attemptId: string
  onComplete: (answers: Record<string, string>) => void
}

export function useActiveQuiz({ quizId, attemptId: _attemptId, onComplete }: UseActiveQuizProps) {
  const { data, isLoading, error } = useQuiz(Number(quizId))
  const questions: QuizPlayData[] = useMemo(
    () => data?.questions.map((q) => toQuizPlayData(q, quizId)) ?? [],
    [data, quizId],
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1

  const handleSetAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handleSubmit = () => {
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