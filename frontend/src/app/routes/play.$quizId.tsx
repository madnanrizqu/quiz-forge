import { createFileRoute } from '@tanstack/react-router'

import { AppShell } from '@/widgets/app-shell'
import { PlayerHeaderDesktop } from '@/widgets/header'
import { MOCK_QUIZ_PLAY_PROPS, PlayQuizPage } from '@/pages/play-quiz'

export const Route = createFileRoute('/play/$quizId')({
  component: () => (
    <AppShell header={<PlayerHeaderDesktop progress={65} />} mobileNav={null}>
      <PlayQuizPage {...MOCK_QUIZ_PLAY_PROPS} />
    </AppShell>
  ),
})
