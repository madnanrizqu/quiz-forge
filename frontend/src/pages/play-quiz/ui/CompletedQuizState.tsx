import { Text } from '@/shared/ui'

interface CompletedQuizStateProps {
  quizId: string
  score: number
}

export function CompletedQuizState({ quizId, score }: CompletedQuizStateProps) {
  return (
    <section className="space-y-8">
      <div className="text-center py-12">
        <Text variant="display-h1" className="text-on-surface mb-4">
          Quiz Completed!
        </Text>
        <Text variant="body-standard" className="text-on-surface-variant">
          Quiz ID: {quizId}
        </Text>
        <Text variant="headline-h2" className="mt-8">
          Score: {score}
        </Text>
      </div>
    </section>
  )
}