import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Icon,
  Input,
  Label,
  Stepper,
  Text,
  Textarea,
} from '@/shared/ui'
import { AppShell } from '@/widgets/app-shell'
import { BuilderHeaderDesktop, BottomNavMobile } from '@/widgets/header'
import { builderMetaSchema } from '@/entities/quiz'
import type { BuilderMetaFormData } from '@/entities/quiz'
import { mockQuizzes } from '../model/mock-data'

export function BuilderMetaStepPage() {
  const navigate = useNavigate()
  const quiz = mockQuizzes[0]

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BuilderMetaFormData>({
    resolver: zodResolver(builderMetaSchema),
    defaultValues: {
      title: quiz.title,
      description: quiz.description,
    },
  })

  const onSubmit = (data: BuilderMetaFormData) => {
    console.log('Form submitted:', data)
    navigate({
      to: '/build_quiz/$quizId',
      params: { quizId: quiz.id },
    })
  }

  return (
    <AppShell
      header={<BuilderHeaderDesktop showSaveQuiz={false} />}
      mobileNav={<BottomNavMobile />}
    >
      <main className="max-w-4xl mx-auto px-6 py-12 pb-32">
        <section className="mb-12">
          <div className="bg-surface-container-low p-8 rounded-2xl shadow-ambient space-y-6">
            <Stepper currentStep={1} totalSteps={2} />
            <Text variant="body-standard" tone="on-surface-variant">
              Start by giving your quiz a name and a brief description. Once you
              are done, we will move on to building your questions.
            </Text>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="title" className="block mb-2">
                  Quiz Title
                </Label>
                <Input
                  id="title"
                  className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 text-on-surface placeholder:text-outline/50 transition-all text-lg font-semibold"
                  placeholder="e.g. Advanced JavaScript Patterns"
                  {...register('title')}
                />
                {errors.title && (
                  <p className="text-error text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="description" className="block mb-2">
                  Quiz Description
                </Label>
                <Textarea
                  id="description"
                  className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 text-on-surface placeholder:text-outline/50 transition-all resize-none"
                  placeholder="Explain what this quiz covers..."
                  rows={3}
                  {...register('description')}
                />
                {errors.description && (
                  <p className="text-error text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </section>

        <div className="mt-12 flex flex-col items-center gap-6">
          <Button
            variant="primary"
            size="lg"
            className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 group"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            Next: Build Questions
            <Icon
              name="mi:arrow_forward"
              className="transition-transform group-hover:translate-x-1"
            />
          </Button>
        </div>
      </main>
    </AppShell>
  )
}
