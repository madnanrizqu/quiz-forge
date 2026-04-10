import { createFileRoute } from '@tanstack/react-router'

import { PlayQuizPage } from '@/pages/play-quiz'

export const Route = createFileRoute('/play/$quizId')({
  component: () => <PlayQuizPage quizId={Route.useParams().quizId} />,
})
