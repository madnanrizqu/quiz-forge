import { Link } from '@tanstack/react-router'
import { Icon } from '@/shared/ui'

export function BottomNavMobile() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-white/80 backdrop-blur-xl shadow-bottom-nav md:hidden">
      <Link
        to="/"
        activeProps={{
          className:
            'flex flex-col items-center justify-center bg-primary-fixed text-primary-fixed-variant rounded-2xl px-6 py-2 transition-all no-underline',
        }}
        inactiveProps={{
          className:
            'flex flex-col items-center justify-center text-on-surface-variant px-6 py-2 hover:bg-surface-container transition-colors no-underline',
        }}
      >
        <Icon name="mi:edit_note" />
        <span className="text-xs font-medium">Builder</span>
      </Link>
      <Link
        to="/load-quiz"
        activeProps={{
          className:
            'flex flex-col items-center justify-center bg-primary-fixed text-primary-fixed-variant rounded-2xl px-6 py-2 transition-all no-underline',
        }}
        inactiveProps={{
          className:
            'flex flex-col items-center justify-center text-on-surface-variant px-6 py-2 hover:bg-surface-container transition-colors no-underline',
        }}
      >
        <Icon name="mi:play_circle" />
        <span className="text-xs font-medium">Player</span>
      </Link>
    </nav>
  )
}
