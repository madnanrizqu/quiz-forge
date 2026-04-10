import { createFileRoute } from '@tanstack/react-router'

import { AppShell } from '@/widgets/app-shell'
import { BuilderHeaderDesktop, BottomNavMobile } from '@/widgets/header'
import { BuilderPage } from '@/pages/builder'

export const Route = createFileRoute('/')({
  component: () => (
    <AppShell header={<BuilderHeaderDesktop showSaveQuiz />} mobileNav={<BottomNavMobile />}>
      <BuilderPage />
    </AppShell>
  ),
})
