import { Button, Icon, Input, Label, Text } from '@/shared/ui'
import { AppShell } from '@/widgets/app-shell'
import { BuilderHeaderDesktop } from '@/widgets/header'
import { useLoadQuiz } from '../model'

export function LoadQuizPage() {
  const { quizId, setQuizId, handleSubmit, isPending, error } = useLoadQuiz()

  return (
    <AppShell header={<BuilderHeaderDesktop />}>
      <main className="min-h-[calc(100vh-72px)] relative overflow-hidden flex items-center justify-center">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-fixed rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6">
          <div className="bg-primary-fixed rounded-xl p-4 mb-6 max-w-20 h-21.5">
            <Icon
              name="mi:play_circle"
              size={48}
              color="var(--on-primary-fixed)"
            />
          </div>

          <Text variant="display-h1" className="text-center mb-2">
            Play Quiz
          </Text>
          <Text
            variant="body-standard"
            tone="on-surface-variant"
            className="text-center mb-8"
          >
            Enter a quiz ID to join and play
          </Text>

          <div className="w-full bg-surface-container-lowest rounded-xl p-8 shadow-ambient">
            <div className="mb-6">
              <Label className="block mb-2">Quiz ID</Label>
              <Input
                placeholder="e.g. 123"
                value={quizId}
                onChange={(e) => setQuizId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                trailingIcon={<Icon name="mi:fingerprint" size={20} />}
              />
            </div>

            {error && (
              <Text
                variant="label-small"
                tone="on-surface"
                className="mb-4 text-error"
              >
                {error.message ||
                  'Failed to load quiz. Please check the quiz ID.'}
              </Text>
            )}

            <Button
              size="lg"
              className="w-full"
              onClick={handleSubmit}
              disabled={isPending || !quizId}
            >
              {isPending ? 'Loading...' : 'Load Quiz'}{' '}
              {!isPending && <Icon name="mi:arrow_forward" />}
            </Button>
          </div>

          <Text variant="micro" tone="on-surface-variant" className="mt-8">
            Don't have a quiz ID? Ask your quiz creator to share it with you.
          </Text>
        </div>
      </main>
    </AppShell>
  )
}
