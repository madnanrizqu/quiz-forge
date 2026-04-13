import { useNavigate } from '@tanstack/react-router'
import { Button, Icon, NotificationBar, Stepper, SuccessCheckmark, Text } from '@/shared/ui'
import { QuestionEditor, ValidationErrorList } from '@/pages/builder'
import { AppShell } from '@/widgets/app-shell'
import { BuilderHeaderDesktop, BottomNavMobile } from '@/widgets/header'
import { useQuestionList } from '../model/useQuestionList'

interface BuilderQuestionsStepPageProps {
  quizId: string
}

export function BuilderQuestionsStepPage({
  quizId,
}: BuilderQuestionsStepPageProps) {
  const navigate = useNavigate()
  const numericQuizId = parseInt(quizId, 10)

  const {
    questions,
    validationErrors,
    isSubmitting,
    isSuccess,
    submitError,
    isPublishing,
    publishError,
    isLoading,
    handlers,
  } = useQuestionList(quizId, numericQuizId)

  return (
    <AppShell
      header={
        <BuilderHeaderDesktop
          showSubmitQuiz
          showBuildNav={false}
          showPlayNav={false}
          showPrevious
          onPrevious={() => navigate({ to: '/' })}
          onSubmitQuiz={handlers.handleSubmitQuiz}
          disabled={Boolean(publishError)}
        />
      }
      mobileNav={<BottomNavMobile />}
    >
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-surface-container-lowest rounded-2xl p-8 flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      )}

      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-surface-container-lowest rounded-2xl p-8 flex flex-col items-center gap-4">
            {isSuccess ? (
              <>
                <SuccessCheckmark size={48} className="text-success" />
                <Text variant="body-standard" tone="on-surface">
                  All questions submitted!
                </Text>
              </>
            ) : isPublishing ? (
              <>
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <Text variant="body-standard" tone="on-surface">
                  Publishing quiz...
                </Text>
              </>
            ) : (
              <>
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <Text variant="body-standard" tone="on-surface">
                  Submitting questions...
                </Text>
              </>
            )}
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-6 py-12 pb-32">
        <div className="mb-10 space-y-6">
          <Stepper currentStep={2} totalSteps={2} />
          <Text tone="on-surface-variant" variant="body-standard">
            Now that your quiz has a name and description, it&apos;s time to
            build your questions. Add multiple choice or short answer formats to
            challenge your learners.
          </Text>
          {validationErrors.length > 0 && (
            <NotificationBar
              variant="error"
              title="Questions need attention"
              description={<ValidationErrorList errors={validationErrors} />}
            />
          )}
          {submitError && (
            <NotificationBar
              variant="error"
              title="Submission failed"
              description={submitError}
            />
          )}
          {publishError && (
            <NotificationBar
              variant="error"
              title="Publish failed"
              description={
                <div className="flex items-center gap-3">
                  <span>{publishError}</span>
                  <Button size="sm" onClick={handlers.handlePublishRetry}>
                    Retry
                  </Button>
                </div>
              }
            />
          )}
        </div>

        <div className="space-y-8">
          {questions.map((question, index) => (
            <QuestionEditor
              disabled={Boolean(publishError)}
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
            disabled={Boolean(publishError)}
          >
            <Icon name="mi:add_circle" className="transition-transform" />
            Add Question
          </Button>
        </div>
      </main>
    </AppShell>
  )
}
