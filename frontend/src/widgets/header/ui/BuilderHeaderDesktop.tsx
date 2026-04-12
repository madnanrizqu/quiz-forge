import { Link } from '@tanstack/react-router'
import { Button, Icon } from '@/shared/ui'

export interface BuilderHeaderDesktopProps {
  showSaveQuiz?: boolean
  showPrevious?: boolean
  onPrevious?: () => void
  showBuildNav?: boolean
  showPlayNav?: boolean
  onSaveQuiz?: () => void
}

export function BuilderHeaderDesktop({
  showSaveQuiz = false,
  showPrevious = false,
  onPrevious,
  showBuildNav = true,
  showPlayNav = true,
  onSaveQuiz,
}: BuilderHeaderDesktopProps) {
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
          {showBuildNav && (
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
          )}
          {showPlayNav && (
            <Link
              to="/load-quiz"
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
          )}
        </nav>

        {(showSaveQuiz || showPrevious) && (
          <div className="flex items-center gap-4">
            {showPrevious && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onPrevious}
                className="text-on-surface-variant hover:text-primary"
              >
                <Icon name="mi:arrow_back" size="sm" className="mr-1" />
                Previous
              </Button>
            )}
            {showSaveQuiz && (
              <Button
                size="sm"
                className="px-5 py-2.5 rounded-lg shadow-sm"
                onClick={onSaveQuiz}
              >
                Save Quiz
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
