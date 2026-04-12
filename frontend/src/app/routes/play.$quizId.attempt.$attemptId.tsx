import { createFileRoute } from '@tanstack/react-router'

import { PlayQuizPage } from '@/pages/play-quiz'

export const Route = createFileRoute('/play/$quizId/attempt/$attemptId')({
  component: () => (
    <PlayQuizPage
      quizId={Route.useParams().quizId}
      attemptId={Route.useParams().attemptId}
    />
  ),
})
