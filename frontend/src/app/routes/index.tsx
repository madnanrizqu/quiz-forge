import { createFileRoute } from '@tanstack/react-router'

import { BuilderPage } from '@/pages/builder'

export const Route = createFileRoute('/')({
  component: () => <BuilderPage />,
})
