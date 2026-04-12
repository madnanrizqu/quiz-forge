import { useNavigate } from '@tanstack/react-router'
import { Button, Icon, Stepper, Text } from '@/shared/ui'
import { QuestionEditor } from '@/pages/builder'
import { AppShell } from '@/widgets/app-shell'
import { BuilderHeaderDesktop, BottomNavMobile } from '@/widgets/header'
import { getQuizById } from '../model/mock-data'
import { useQuestionList } from '../model/useQuestionList'

interface BuilderQuestionsStepPageProps {
  quizId: string
}

export function BuilderQuestionsStepPage({
  quizId,
}: BuilderQuestionsStepPageProps) {
  const navigate = useNavigate()
  const quiz = getQuizById(quizId)

  const { questions, handlers } = useQuestionList(quiz?.questions)

  if (!quiz) {
    return (
      <AppShell
        header={
          <BuilderHeaderDesktop
            showSaveQuiz
            showBuildNav={false}
            showPlayNav={false}
            showPrevious
          />
        }
        mobileNav={<BottomNavMobile />}
      >
        <main className="max-w-4xl mx-auto px-6 py-12">
          <p>Quiz not found</p>
        </main>
      </AppShell>
    )
  }

  return (
    <AppShell
      header={
        <BuilderHeaderDesktop
          showSaveQuiz
          showBuildNav={false}
          showPlayNav={false}
          showPrevious
          onPrevious={() => navigate({ to: '/' })}
        />
      }
      mobileNav={<BottomNavMobile />}
    >
      <main className="max-w-4xl mx-auto px-6 py-12 pb-32">
        <div className="mb-10 space-y-2">
          <Stepper currentStep={2} totalSteps={2} />
          <Text tone="on-surface-variant" variant="body-standard">
            Now that your quiz has a name and description, it&apos;s time to
            build your questions. Add multiple choice or short answer formats to
            challenge your learners.
          </Text>
        </div>

        <div className="space-y-8">
          {questions.map((question, index) => (
            <QuestionEditor
              key={question.id}
              defaultValue={question}
              onUpdate={(updated) =>
                handlers.handleQuestionUpdate(question.id, updated)
              }
              onDelete={() => handlers.handleQuestionDelete(question.id)}
              questionCount={questions.length}
              questionNumber={index + 1}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-6">
          <Button
            variant="soft"
            size="lg"
            className="w-full py-4 rounded-3xl font-bold flex items-center justify-center gap-2 group h-auto bg-surface-container-high"
            onClick={handlers.handleAddQuestion}
          >
            <Icon name="mi:add_circle" className="transition-transform" />
            Add Question
          </Button>
        </div>
      </main>
    </AppShell>
  )
}
