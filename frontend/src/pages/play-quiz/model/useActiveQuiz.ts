import { useMemo, useState } from 'react'
import { useQuiz, toQuizPlayData } from '@/entities/quiz'
import type { QuizPlayData } from '@/entities/quiz'
import { createActiveQuizStore } from './store'
import { useSubmitAnswer } from '@/entities/quiz/api/attempt'

interface UseActiveQuizProps {
  quizId: string
  attemptId: string
  onComplete?: (answers: Record<string, string>) => void
}

interface SubmitAnswerState {
  isSubmitting: boolean
  submitError: string | null
  failedAnswerIds: Set<string>
  isSubmitted: boolean
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

  const [submitAnswerState, setSubmitAnswerState] = useState<SubmitAnswerState>({
    isSubmitting: false,
    submitError: null,
    failedAnswerIds: new Set(),
    isSubmitted: false,
  })

  const numericAttemptId = Number(attemptId)
  const submitAnswerMutation = useSubmitAnswer(numericAttemptId)

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

  const handleSubmitAnswers = async () => {
    setSubmitAnswerState((prev) => ({ ...prev, isSubmitting: true, submitError: null }))

    const answerEntries = Object.entries(answers).map(
      ([questionId, value]) => ({
        questionId: Number(questionId),
        value,
        id: questionId,
      }),
    )

    const results = await Promise.allSettled(
      answerEntries.map((entry) =>
        submitAnswerMutation.mutateAsync({
          questionId: entry.questionId,
          value: entry.value,
        }),
      ),
    )

    const failedIds = answerEntries
      .filter((_, index) => results[index].status === 'rejected')
      .map((entry) => entry.id)

    if (failedIds.length > 0) {
      setSubmitAnswerState((prev) => ({
        ...prev,
        isSubmitting: false,
        submitError: 'Failed to submit some answers. Click retry to try again.',
        failedAnswerIds: new Set(failedIds),
      }))
    } else {
      clearSession()
      setSubmitAnswerState((prev) => ({ ...prev, isSubmitting: false, isSubmitted: true }))
    }
  }

  const handleRetryAnswers = async () => {
    setSubmitAnswerState((prev) => ({ ...prev, isSubmitting: true, submitError: null }))

    const answerEntries = Object.entries(answers).map(
      ([questionId, value]) => ({
        questionId: Number(questionId),
        value,
        id: questionId,
      }),
    )

    const failedEntries = answerEntries.filter((entry) =>
      submitAnswerState.failedAnswerIds.has(entry.id),
    )

    if (failedEntries.length === 0) {
      clearSession()
      setSubmitAnswerState((prev) => ({ ...prev, isSubmitting: false, isSubmitted: true }))
      return
    }

    const results = await Promise.allSettled(
      failedEntries.map((entry) =>
        submitAnswerMutation.mutateAsync({
          questionId: entry.questionId,
          value: entry.value,
        }),
      ),
    )

    const remainingFailedIds = failedEntries
      .filter((_, index) => results[index].status === 'rejected')
      .map((entry) => entry.id)

    if (remainingFailedIds.length > 0) {
      setSubmitAnswerState((prev) => ({
        ...prev,
        isSubmitting: false,
        submitError: 'Failed to submit some answers. Click retry to try again.',
        failedAnswerIds: new Set(remainingFailedIds),
      }))
    } else {
      clearSession()
      setSubmitAnswerState((prev) => ({ ...prev, isSubmitting: false, isSubmitted: true }))
    }
  }

  const handlersSubmitAnswers = {
    handleSubmitAnswers,
    handleRetryAnswers,
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
    submitAnswerState,
    handleSetAnswer,
    handlePrevious,
    handleNext,
    handlersSubmitAnswers,
  }
}