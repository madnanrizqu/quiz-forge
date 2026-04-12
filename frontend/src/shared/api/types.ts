export interface ApiClient {
  get: <T>(url: string) => Promise<T>
  post: <T>(url: string, data?: unknown) => Promise<T>
  patch: <T>(url: string, data?: unknown) => Promise<T>
  delete: (url: string) => Promise<void>
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown,
  ) {
    super(message)
  }
}
