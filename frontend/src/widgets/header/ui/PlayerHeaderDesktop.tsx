import { Link } from '@tanstack/react-router'
import { Icon, ProgressBar, Text } from '@/shared/ui'

export interface PlayerHeaderDesktopProps {
  progress: number
}

export function PlayerHeaderDesktop({ progress }: PlayerHeaderDesktopProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md h-15">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-on-surface no-underline"
        >
          QuizForge
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <Text variant="label-small" className="text-on-surface-variant">
              Progress
            </Text>
            <div className="flex items-center gap-3">
              <ProgressBar value={progress} />
              <span className="text-sm font-bold text-on-surface">
                {progress}%
              </span>
            </div>
          </div>

          <button
            type="button"
            className="bg-surface-container-high p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-low transition-colors size-9"
          >
            <Icon name="mi:timer" className="block" />
          </button>
        </div>
      </div>
    </header>
  )
}
