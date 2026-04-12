import { createFileRoute } from '@tanstack/react-router'

import { BuilderQuestionsStepPage } from '@/pages/builder'

export const Route = createFileRoute('/build_quiz/$quizId')({
  component: () => <BuilderQuestionsStepPage quizId={Route.useParams().quizId} />,
})