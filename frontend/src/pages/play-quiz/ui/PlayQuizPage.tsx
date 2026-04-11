import { useState } from 'react'
import { AppShell } from '@/widgets/app-shell'
import { PlayerHeaderDesktop } from '@/widgets/header'
import { QuizState } from '@/entities/quiz'
import { MOCK_QUIZZES } from '../model'
import { ActiveQuizState } from './ActiveQuizState'
import { CompletedQuizState } from './CompletedQuizState'

interface PlayQuizPageProps {
  quizId: string
}

export function PlayQuizPage({ quizId }: PlayQuizPageProps) {
  const [quizState, setQuizState] = useState<QuizState>(QuizState.Active)
  const [score, setScore] = useState(0)
  const [answer, setAnswer] = useState('')
  const quizData = MOCK_QUIZZES[quizId]

  const handleSubmit = () => {
    setQuizState(QuizState.Completed)
    setScore(85)
  }

  return (
    <AppShell header={<PlayerHeaderDesktop progress={65} />} mobileNav={null}>
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 min-h-[calc(100vh-80px)] flex flex-col justify-center">
        {quizState === QuizState.Active && (
          <ActiveQuizState
            quizData={quizData}
            answer={answer}
            onSetAnswer={setAnswer}
            onSubmit={handleSubmit}
          />
        )}
        {quizState === QuizState.Completed && (
          <CompletedQuizState quizId={quizId} score={score} />
        )}
      </main>
    </AppShell>
  )
}