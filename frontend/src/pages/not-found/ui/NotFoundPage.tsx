import { Link } from '@tanstack/react-router'
import { Button, Icon, Text } from '@/shared/ui'
import { AppShell } from '@/widgets/app-shell'
import { BuilderHeaderDesktop } from '@/widgets/header'

export function NotFoundPage() {
  return (
    <AppShell header={<BuilderHeaderDesktop />}>
      <main className="min-h-[calc(100vh-72px)] relative overflow-hidden flex items-center justify-center">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-fixed rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center max-w-lg w-full px-6 py-12 text-center">
          <h1 className="font-display text-9xl md:text-[12rem] font-bold tracking-tighter text-on-surface opacity-10 select-none absolute -top-16 md:-top-24 left-1/2 -translate-x-1/2">
            404
          </h1>

          <div className="relative z-10 flex flex-col items-center mt-8">
            <div className="mb-8 p-4 bg-surface-container-lowest rounded-xl shadow-ambient">
              <Icon name="mi:architecture" size={48} color="var(--primary)" />
            </div>

            <Text variant="headline-h2" className="mb-4">
              Page Not Found
            </Text>

            <Text
              variant="body-standard"
              tone="on-surface-variant"
              className="max-w-md mb-12"
            >
              The page you're looking for isn't in our web app or has been moved
              to a new url
            </Text>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" asChild>
                <Link to="/">
                  <Icon name="mi:construction" size={20} className="mr-2" />
                  <span>Return to Build</span>
                </Link>
              </Button>

              <Button variant="ghost" size="lg" asChild>
                <Link to="/load-quiz">
                  <Icon name="mi:play_circle" size={20} className="mr-2" />
                  <span>Back to Play</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  )
}
