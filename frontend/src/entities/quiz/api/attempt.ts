import { useMutation } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import { quizApiClient } from './client'
import type {
  AnswerPayload,
  AttemptWithQuizResponse,
  OkResponse,
  StartAttemptPayload,
  SubmitResponse,
  TrackEventPayload,
} from './types'

export function useStartAttempt(
  options?: UseMutationOptions<AttemptWithQuizResponse, Error, StartAttemptPayload>
) {
  return useMutation({
    mutationFn: (payload: StartAttemptPayload) =>
      quizApiClient.post<AttemptWithQuizResponse>('/attempts', payload),
    ...options,
  })
}

export function useSubmitAnswer(
  attemptId: number,
  options?: UseMutationOptions<OkResponse, Error, AnswerPayload>
) {
  return useMutation({
    mutationFn: (payload: AnswerPayload) =>
      quizApiClient.post<OkResponse>(`/attempts/${attemptId}/answer`, payload),
    ...options,
  })
}

export function useSubmitAttempt(
  attemptId: number,
  options?: UseMutationOptions<SubmitResponse, Error, void>
) {
  return useMutation({
    mutationFn: () => quizApiClient.post<SubmitResponse>(`/attempts/${attemptId}/submit`),
    ...options,
  })
}

export function useTrackEvent(
  attemptId: number,
  options?: UseMutationOptions<OkResponse, Error, TrackEventPayload>
) {
  return useMutation({
    mutationFn: (payload: TrackEventPayload) =>
      quizApiClient.post<OkResponse>(`/attempts/${attemptId}/events`, payload),
    ...options,
  })
}
