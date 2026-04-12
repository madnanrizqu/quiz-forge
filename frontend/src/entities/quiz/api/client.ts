import type { AxiosError } from 'axios'
import { BaseApiClient, ApiError } from '@/shared/api'
import type { ApiClient } from '@/shared/api'

const BASE_URL = import.meta.env.VITE_QUIZ_API_URL || 'http://localhost:4000'
const TOKEN = import.meta.env.VITE_QUIZ_API_TOKEN || 'dev-token'

class QuizApiClient extends BaseApiClient {
  constructor() {
    super(BASE_URL, {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    })

    this.instance.interceptors.response.use(
      (res) => res,
      (err) => this.handleError(err),
    )
  }

  private handleError(err: AxiosError): Promise<never> {
    const body = err.response?.data
    const message = this.parseErrorMessage(body, err.message)
    const status = err.response?.status ?? 0
    return Promise.reject(new ApiError(message, status, body))
  }

  private parseErrorMessage(body: unknown, fallback: string): string {
    if (
      typeof body === 'object' &&
      body !== null &&
      'error' in body &&
      typeof (body as Record<string, unknown>).error === 'string'
    ) {
      return (body as Record<string, unknown>).error as string
    }
    return fallback || 'Request failed'
  }
}

export const quizApiClient: ApiClient = new QuizApiClient()
