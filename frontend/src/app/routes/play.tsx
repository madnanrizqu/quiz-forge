import { createFileRoute } from '@tanstack/react-router'

import { AppShell } from '@/widgets/app-shell'
import { PlayerPage } from '@/pages/player'

export const Route = createFileRoute('/play')({
  component: () => (
    <AppShell>
      <PlayerPage />
    </AppShell>
  ),
})