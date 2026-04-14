/// <reference types="@cloudflare/workers-types" />

export const onRequest: PagesFunction<{ QUIZ_API_URL: string; QUIZ_API_TOKEN: string }> = async (context) => {
  const url = new URL(context.request.url)
  const backendPath = url.pathname.replace('/api/', '/')
  const backendUrl = `${context.env.QUIZ_API_URL}${backendPath}${url.search}`

  const headers = new Headers(context.request.headers)
  headers.set('Authorization', `Bearer ${context.env.QUIZ_API_TOKEN}`)

  return fetch(backendUrl, {
    method: context.request.method,
    headers,
    body: context.request.body,
  })
}