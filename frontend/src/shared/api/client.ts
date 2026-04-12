import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { ApiClient } from './types'

export class BaseApiClient implements ApiClient {
  protected instance: AxiosInstance

  constructor(
    protected baseURL: string,
    protected headers: Record<string, string> = {},
  ) {
    this.instance = axios.create({ baseURL, headers })
  }

  async get<T>(url: string): Promise<T> {
    return this.instance.get(url).then((r) => r.data)
  }

  async post<T>(url: string, data?: unknown): Promise<T> {
    return this.instance.post(url, data).then((r) => r.data)
  }

  async patch<T>(url: string, data?: unknown): Promise<T> {
    return this.instance.patch(url, data).then((r) => r.data)
  }

  async delete(url: string): Promise<void> {
    await this.instance.delete(url)
  }
}
