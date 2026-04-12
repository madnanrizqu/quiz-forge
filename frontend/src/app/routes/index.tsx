import { createFileRoute } from '@tanstack/react-router'

import { BuilderMetaStepPage } from '@/pages/builder'

export const Route = createFileRoute('/')({
  component: () => <BuilderMetaStepPage />,
})
