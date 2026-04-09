import { Link, Outlet } from '@tanstack/react-router'
import { Button, Icon } from '@/shared/ui'

export function AppShell() {
  return (
    <div className="min-h-screen bg-[#F9F9FF] text-on-surface">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-ghost-border">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-on-surface no-underline"
          >
            QuizForge
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <Link
              to="/"
              className="text-primary border-b-2 border-primary pb-1 no-underline"
            >
              Build
            </Link>
            <Link
              to="/"
              className="text-on-surface-variant hover:text-on-surface transition-colors pb-1 no-underline"
            >
              Play
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button size="sm" className="px-5 py-2.5 rounded-lg shadow-sm">
              Save Quiz
            </Button>
          </div>
        </div>
      </header>

      <Outlet />

      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-white/80 backdrop-blur-xl shadow-[0_-8px_30px_rgba(0,0,0,0.04)] md:hidden">
        <Link
          to="/"
          className="flex flex-col items-center justify-center bg-primary-fixed text-primary-fixed-variant rounded-2xl px-6 py-2 transition-all no-underline"
        >
          <Icon name="mi:edit_note" />
          <span className="text-xs font-medium">Builder</span>
        </Link>
        <Link
          to="/"
          className="flex flex-col items-center justify-center text-on-surface-variant px-6 py-2 hover:bg-surface-container transition-colors no-underline"
        >
          <Icon name="mi:play_circle" />
          <span className="text-xs font-medium">Player</span>
        </Link>
      </nav>
    </div>
  )
}
