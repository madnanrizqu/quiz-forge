import { useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { createQuestionStore } from './store'
import type { QuestionStore } from './store'
import { validateQuestion, validateQuestions } from './questionValidation'
import { useCreateQuestion } from '@/entities/quiz/api'
import { QuestionType } from '@/entities/quiz'
import type { QuizQuestion } from '@/entities/quiz'
import type { CreateQuestionPayload } from '@/entities/quiz/api'

function toApiPayload(
  question: QuizQuestion,
  position: number,
): CreateQuestionPayload {
  const type = question.type === QuestionType.MultipleChoice ? 'mcq' : 'short'

  let options: string[] | undefined
  let correctAnswer: string | number | undefined

  if (question.type === QuestionType.MultipleChoice && question.choices) {
    options = question.choices.map((c) => c.text)
    const correctChoice = question.choices.find((c) => c.isCorrect)
    correctAnswer = correctChoice ? question.choices.indexOf(correctChoice) : 0
  } else {
    correctAnswer = question.correctAnswer
  }

  return {
    type,
    prompt: question.prompt,
    options,
    correctAnswer,
    position,
  }
}

export function useQuestionList(quizId: string, numericQuizId: number) {
  const navigate = useNavigate()
  const store = useMemo(() => createQuestionStore(quizId), [quizId])

  const questions = store((state: QuestionStore) => state.questions)
  const validationErrors = store(
    (state: QuestionStore) => state.validationErrors,
  )
  const isSubmitting = store((state: QuestionStore) => state.isSubmitting)
  const submitError = store((state: QuestionStore) => state.submitError)
  const updateQuestion = store((state: QuestionStore) => state.updateQuestion)
  const deleteQuestion = store((state: QuestionStore) => state.deleteQuestion)
  const addQuestion = store((state: QuestionStore) => state.addQuestion)
  const setValidationErrors = store(
    (state: QuestionStore) => state.setValidationErrors,
  )
  const setIsSubmitting = store((state: QuestionStore) => state.setIsSubmitting)
  const setSubmitError = store((state: QuestionStore) => state.setSubmitError)
  const markQuestionAsCreated = store(
    (state: QuestionStore) => state.markQuestionAsCreated,
  )

  const createQuestion = useCreateQuestion(numericQuizId)

  const handleQuestionUpdate = (
    id: string,
    updated: Parameters<typeof updateQuestion>[1],
  ) => {
    const currentErrors = store.getState().validationErrors
    updateQuestion(id, updated)

    const errorsForThisQuestion = currentErrors.filter(
      (e) => e.questionId === id,
    )
    if (errorsForThisQuestion.length > 0) {
      const questionNumber = errorsForThisQuestion[0].questionNumber
      const stillInvalid = validateQuestion(updated, questionNumber)
      if (!stillInvalid) {
        const remainingErrors = store
          .getState()
          .validationErrors.filter((e) => e.questionId !== id)
        setValidationErrors(remainingErrors)
      }
    }
  }

  const handleQuestionDelete = (id: string) => {
    if (questions.length > 1) {
      deleteQuestion(id)
    }
  }

  const handleAddQuestion = () => {
    addQuestion()
  }

  const submit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const questionsToCreate = questions
        .map((q, index) => ({ question: q, index }))
        .filter(({ question }) => question.apiId === undefined)

      if (questionsToCreate.length === 0) {
        navigate({ to: '/load-quiz' })
        return
      }

      const results = await Promise.all(
        questionsToCreate.map(async ({ question, index }) => {
          const payload = toApiPayload(question, index)
          try {
            const created = await createQuestion.mutateAsync(payload)
            return { success: true, question, created }
          } catch (error) {
            const questionNumber = questions.indexOf(question) + 1
            return {
              success: false,
              question,
              error,
              questionNumber,
            }
          }
        }),
      )

      const failed = results.filter((r) => !r.success)
      const succeeded = results.filter((r) => r.success)

      if (failed.length > 0) {
        const failedNumbers = failed
          .map((r) => `Question ${r.questionNumber}`)
          .join(', ')
        setSubmitError(
          `Failed to submit: ${failedNumbers}. ${succeeded.length} question(s) submitted successfully.`,
        )

        succeeded.forEach((r) => {
          markQuestionAsCreated(r.question.id, r.created!.id)
        })
      } else {
        // TODO: replace with real toast
        setTimeout(() => {
          alert('Success! All questions created!')
          navigate({ to: '/load-quiz' })
        }, 1500)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitQuiz = () => {
    const result = validateQuestions(questions)
    setValidationErrors(result.errors)

    if (!result.isValid) {
      return
    }

    submit()
  }

  return {
    store,
    questions,
    validationErrors,
    isSubmitting,
    submitError,
    handlers: {
      handleQuestionUpdate,
      handleQuestionDelete,
      handleAddQuestion,
      setValidationErrors,
      setIsSubmitting,
      setSubmitError,
      markQuestionAsCreated,
      handleSubmitQuiz,
    },
  }
}
