import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useStartAttempt } from '@/entities/quiz'

interface UseLoadQuizProps {
  onSuccess?: (attemptId: number, quizId: number) => void
  initialQuizId?: string | number
}

function parseQuizId(value: string | number | undefined): string {
  if (value === undefined || value === null) return ''
  return String(value)
}

export function useLoadQuiz({ onSuccess, initialQuizId }: UseLoadQuizProps = {}) {
  const navigate = useNavigate()
  const startAttempt = useStartAttempt()

  const [quizId, setQuizId] = useState(parseQuizId(initialQuizId))

  const loadQuiz = async (numericQuizId: number) => {
    try {
      const result = await startAttempt.mutateAsync({ quizId: numericQuizId })
      const attemptId = result.id
      navigate({
        to: '/play/$quizId/attempt/$attemptId',
        params: { quizId: String(numericQuizId), attemptId: String(attemptId) },
      })
      onSuccess?.(attemptId, numericQuizId)
    } catch {
      // error handled by startAttempt.error
    }
  }

  const handleSubmit = () => {
    const numericQuizId = Number(quizId)
    if (numericQuizId > 0) {
      loadQuiz(numericQuizId)
    }
  }

  return {
    quizId,
    setQuizId,
    handleSubmit,
    isPending: startAttempt.isPending,
    error: startAttempt.error,
  }
}
