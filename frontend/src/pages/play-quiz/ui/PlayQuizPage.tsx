import { AppShell } from '@/widgets/app-shell'
import { PlayerHeaderDesktop } from '@/widgets/header'
import { QuizState } from '@/entities/quiz'
import { usePlayQuizPage } from '../model'
import { ActiveQuizState } from './ActiveQuizState'
import { CompletedQuizState } from './CompletedQuizState'

interface PlayQuizPageProps {
  quizId: string
  attemptId: string
}

export function PlayQuizPage({ quizId, attemptId }: PlayQuizPageProps) {
  const { quizState, quizResult, getProgress, handleComplete } =
    usePlayQuizPage({
      quizId,
      attemptId,
    })

  return (
    <AppShell
      header={<PlayerHeaderDesktop progress={getProgress()} />}
      mobileNav={null}
    >
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 min-h-[calc(100vh-80px)] flex flex-col justify-center">
        {quizState === QuizState.Active && (
          <ActiveQuizState
            quizId={quizId}
            attemptId={attemptId}
            onComplete={handleComplete}
          />
        )}
        {quizState === QuizState.Completed && quizResult && (
          <CompletedQuizState quizResult={quizResult} />
        )}
      </main>
    </AppShell>
  )
}
