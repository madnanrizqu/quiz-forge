import { createFileRoute } from '@tanstack/react-router'

import { AppShell } from '@/widgets/app-shell'
import { BuilderPage } from '@/pages/builder'

export const Route = createFileRoute('/')({
  component: () => (
    <AppShell showSaveQuiz>
      <BuilderPage />
    </AppShell>
  ),
})
