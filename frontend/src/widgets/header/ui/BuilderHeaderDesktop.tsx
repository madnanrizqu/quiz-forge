import { Link } from '@tanstack/react-router'
import { Button } from '@/shared/ui'

export interface BuilderHeaderDesktopProps {
  showSaveQuiz?: boolean
}

export function BuilderHeaderDesktop({ showSaveQuiz = false }: BuilderHeaderDesktopProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md h-15">
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
            activeProps={{
              className:
                'text-primary border-b-2 border-primary pb-1 no-underline',
            }}
            inactiveProps={{
              className:
                'text-on-surface-variant hover:text-on-surface transition-colors pb-1 no-underline',
            }}
          >
            Build
          </Link>
          <Link
            to="/play"
            activeProps={{
              className:
                'text-primary border-b-2 border-primary pb-1 no-underline',
            }}
            inactiveProps={{
              className:
                'text-on-surface-variant hover:text-on-surface transition-colors pb-1 no-underline',
            }}
          >
            Play
          </Link>
        </nav>

        {showSaveQuiz && (
          <div className="flex items-center gap-4">
            <Button size="sm" className="px-5 py-2.5 rounded-lg shadow-sm">
              Save Quiz
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
