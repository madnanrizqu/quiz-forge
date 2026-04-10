import { createFileRoute } from '@tanstack/react-router'

import { AppShell } from '@/widgets/app-shell'
import { BuilderHeaderDesktop } from '@/widgets/header'
import { PlayerPage } from '@/pages/player'

export const Route = createFileRoute('/play/')({
  component: () => (
    <AppShell header={<BuilderHeaderDesktop />}>
      <PlayerPage />
    </AppShell>
  ),
})
