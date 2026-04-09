import { Link, Outlet } from '@tanstack/react-router'

import { Badge, Button, Text } from '@/shared/ui'

export function AppShell() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <header className="sticky top-0 z-50 bg-surface/80 px-4 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between py-4">
          <Link to="/" className="no-underline">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-xl bg-primary-gradient" />
              <div>
                <Text className="m-0" variant="title-large">
                  Sapphire Architectural
                </Text>
                <Text
                  className="m-0"
                  tone="on-surface-variant"
                  variant="label-small"
                >
                  Quiz Builder
                </Text>
              </div>
            </div>
          </Link>

          <nav className="flex items-center gap-3">
            <Link
              to="/"
              className="rounded-lg px-3 py-2 text-body-standard font-medium text-on-surface-variant no-underline transition-all duration-300 hover:bg-surface-container-low hover:text-on-surface"
              activeProps={{
                className:
                  'rounded-lg bg-surface-container-low px-3 py-2 text-body-standard font-semibold text-on-surface no-underline',
              }}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="rounded-lg px-3 py-2 text-body-standard font-medium text-on-surface-variant no-underline transition-all duration-300 hover:bg-surface-container-low hover:text-on-surface"
              activeProps={{
                className:
                  'rounded-lg bg-surface-container-low px-3 py-2 text-body-standard font-semibold text-on-surface no-underline',
              }}
            >
              About
            </Link>
            <Badge>Blueprint Mode</Badge>
          </nav>
        </div>
      </header>

      <Outlet />

      <footer className="px-4 pb-10 pt-8">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-xl bg-surface-container-low px-5 py-4">
          <Text
            className="m-0"
            tone="on-surface-variant"
            variant="body-standard"
          >
            Structured for fast iteration and consistent UI decisions.
          </Text>
          <Button variant="ghost" size="sm">
            Design System v1
          </Button>
        </div>
      </footer>
    </div>
  )
}
