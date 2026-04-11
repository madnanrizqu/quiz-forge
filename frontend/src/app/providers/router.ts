import { createRouter as createTanStackRouter } from '@tanstack/react-router'

import { routeTree } from '@/app/routeTree.gen'

function getRouter() {
  return createTanStackRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
  })
}

export const router = getRouter()

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
