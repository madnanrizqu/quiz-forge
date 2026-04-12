import {
  useMutation,
  useQuery,
  useQueryClient,
  queryOptions,
} from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import { quizApiClient } from './client'
import type {
  CreateQuizPayload,
  QuizListResponse,
  QuizResponse,
  QuizWithQuestionsResponse,
  UpdateQuizPayload,
} from './types'

const QUIZ_KEY = 'quizzes'

export const quizKeys = {
  all: [QUIZ_KEY] as const,
  list: () => [...quizKeys.all, 'list'] as const,
  detail: (id: number) => [...quizKeys.all, 'detail', id] as const,
}

export const quizzesOptions = () =>
  queryOptions({
    queryKey: quizKeys.list(),
    queryFn: () => quizApiClient.get<QuizListResponse[]>('/quizzes'),
  })

export const quizOptions = (id: number) =>
  queryOptions({
    queryKey: quizKeys.detail(id),
    queryFn: () =>
      quizApiClient.get<QuizWithQuestionsResponse>(`/quizzes/${id}`),
    enabled: Number.isInteger(id) && id > 0,
  })

export function useQuizzes(options?: object) {
  return useQuery({
    ...quizzesOptions(),
    ...options,
  })
}

export function useQuiz(id: number, options?: object) {
  return useQuery({
    ...quizOptions(id),
    ...options,
  })
}

export function useCreateQuiz(
  options?: UseMutationOptions<QuizResponse, Error, CreateQuizPayload>,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateQuizPayload) =>
      quizApiClient.post<QuizResponse>('/quizzes', payload),
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: quizKeys.all })
      options?.onSuccess?.(...args)
    },
  })
}

export function useUpdateQuiz(
  id: number,
  options?: UseMutationOptions<QuizResponse, Error, UpdateQuizPayload>,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateQuizPayload) =>
      quizApiClient.patch<QuizResponse>(`/quizzes/${id}`, payload),
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: quizKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: quizKeys.list() })
      options?.onSuccess?.(...args)
    },
  })
}
