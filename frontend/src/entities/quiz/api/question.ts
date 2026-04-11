import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import { quizApiClient } from './client'
import type {
  CreateQuestionPayload,
  QuestionResponse,
  UpdateQuestionPayload,
} from './types'
import { quizKeys } from './quiz'

export function useCreateQuestion(
  quizId: number,
  options?: UseMutationOptions<QuestionResponse, Error, CreateQuestionPayload>,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateQuestionPayload) =>
      quizApiClient.post<QuestionResponse>(
        `/quizzes/${quizId}/questions`,
        payload,
      ),
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: quizKeys.detail(quizId) })
      options?.onSuccess?.(...args)
    },
  })
}

export function useUpdateQuestion(
  questionId: number,
  quizId: number,
  options?: UseMutationOptions<QuestionResponse, Error, UpdateQuestionPayload>,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateQuestionPayload) =>
      quizApiClient.patch<QuestionResponse>(
        `/questions/${questionId}`,
        payload,
      ),
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: quizKeys.detail(quizId) })
      options?.onSuccess?.(...args)
    },
  })
}

export function useDeleteQuestion(
  questionId: number,
  quizId: number,
  options?: UseMutationOptions<void, Error, void>,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => quizApiClient.delete(`/questions/${questionId}`),
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: quizKeys.detail(quizId) })
      options?.onSuccess?.(...args)
    },
  })
}
