import { useNavigate } from '@tanstack/react-router'
import {
  Button,
  Icon,
  Input,
  Label,
  Textarea,
} from '@/shared/ui'
import { AppShell } from '@/widgets/app-shell'
import { BuilderHeaderDesktop, BottomNavMobile } from '@/widgets/header'
import { mockQuizzes } from '../model/mock-data'

export function BuilderMetaStepPage() {
  const navigate = useNavigate()
  const quiz = mockQuizzes[0]

  return (
    <AppShell
      header={<BuilderHeaderDesktop showSaveQuiz />}
      mobileNav={<BottomNavMobile />}
    >
      <main className="max-w-4xl mx-auto px-6 py-12 pb-32">
        <section className="mb-12">
          <div className="bg-surface-container-high p-8 rounded-2xl shadow-ambient space-y-6">
            <div>
              <Label className="block mb-2">Quiz Title</Label>
              <Input
                className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 text-on-surface placeholder:text-outline/50 transition-all text-lg font-semibold"
                placeholder="e.g. Advanced JavaScript Patterns"
                defaultValue={quiz.title}
              />
            </div>
            <div>
              <Label className="block mb-2">Quiz Description</Label>
              <Textarea
                className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 text-on-surface placeholder:text-outline/50 transition-all resize-none"
                placeholder="Explain what this quiz covers..."
                rows={3}
                defaultValue={quiz.description}
              />
            </div>
          </div>
        </section>

        <div className="mt-12 flex flex-col items-center gap-6">
          <Button
            variant="soft"
            size="lg"
            className="w-full py-4 rounded-3xl font-bold flex items-center justify-center gap-2 group h-auto bg-surface-container-high"
            onClick={() => navigate({ to: '/build_quiz/$quizId', params: { quizId: quiz.id } })}
          >
            <Icon name="mi:add_circle" className="transition-transform" />
            Continue to Questions
          </Button>
        </div>
      </main>
    </AppShell>
  )
}