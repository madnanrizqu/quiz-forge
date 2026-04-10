import { createFileRoute } from '@tanstack/react-router'

import { LoadQuizPage } from '@/pages/load-quiz'

export const Route = createFileRoute('/load-quiz/')({
  component: () => <LoadQuizPage />,
})
