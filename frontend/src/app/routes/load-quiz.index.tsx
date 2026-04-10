import { createFileRoute } from '@tanstack/react-router'

import { AppShell } from '@/widgets/app-shell'
import { BuilderHeaderDesktop } from '@/widgets/header'
import { LoadQuizPage } from '@/pages/load-quiz'

export const Route = createFileRoute('/load-quiz/')({
  component: () => (
    <AppShell header={<BuilderHeaderDesktop />}>
      <LoadQuizPage />
    </AppShell>
  ),
})
