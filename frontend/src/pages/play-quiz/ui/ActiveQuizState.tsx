import {
  Button,
  Icon,
  NotificationBar,
  SuccessCheckmark,
  Text,
} from '@/shared/ui'
import {
  CodeSnippetInput,
  PlayerAnswerSection,
  QuestionCard,
} from '@/entities/quiz'
import { useActiveQuiz } from '../model'

interface ActiveQuizStateProps {
  quizId: string
  attemptId: string
  onComplete: (answers: Record<string, string>) => void
}

export function ActiveQuizState({
  quizId,
  attemptId,
  onComplete,
}: ActiveQuizStateProps) {
  const {
    currentIndex,
    currentQuestion,
    isLastQuestion,
    allQuestionsAnswered,
    totalQuestions,
    answers,
    isLoading,
    error,
    submitAnswerState,
    handleSetAnswer,
    handlePrevious,
    handleNext,
    handlersSubmitAnswers,
  } = useActiveQuiz({ quizId, attemptId, onComplete })

  if (isLoading) {
    return (
      <section className="space-y-8">
        <div className="flex items-center justify-center py-20">
          <Text variant="body-standard" className="text-on-surface-variant">
            Loading questions...
          </Text>
        </div>
      </section>
    )
  }

  if (error !== null) {
    return (
      <section className="space-y-8">
        <div className="flex items-center justify-center py-20">
          <Text variant="body-standard" className="text-error">
            {error.message || 'Failed to load questions'}
          </Text>
        </div>
      </section>
    )
  }

  if (totalQuestions === 0) {
    return (
      <section className="space-y-8">
        <div className="flex items-center justify-center py-20">
          <Text variant="body-standard" className="text-on-surface-variant">
            No questions available
          </Text>
        </div>
      </section>
    )
  }

  return (
    <>
      {submitAnswerState.isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-surface-container-lowest rounded-2xl p-8 flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <Text variant="body-standard" tone="on-surface">
              Submitting answers...
            </Text>
          </div>
        </div>
      )}

      {submitAnswerState.isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-surface-container-lowest rounded-2xl p-8 flex flex-col items-center gap-4">
            <SuccessCheckmark size={48} className="text-success" />
            <Text variant="body-standard" tone="on-surface">
              All answers submitted!
            </Text>
          </div>
        </div>
      )}

      <section key={currentQuestion.questionId} className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Text
                variant="headline-h2"
                tone="on-primary"
                className="font-bold m-0"
              >
                {String(currentIndex + 1).padStart(2, '0')}
              </Text>
            </div>
            <div>
              <Text variant="body-standard" className="text-on-surface-variant">
                Question {currentIndex + 1} of {totalQuestions}
              </Text>
              <Text variant="label-small" className="text-outline uppercase">
                {currentQuestion.questionType}
              </Text>
            </div>
          </div>
        </div>

        <QuestionCard className="p-8 md:p-12">
          <div className="relative z-10 space-y-4">
            <Text
              variant="display-h1"
              className="text-on-surface tracking-tight leading-tight"
            >
              {currentQuestion.questionText}
            </Text>

            {currentQuestion.codeSnippet && (
              <CodeSnippetInput
                disabled
                defaultValue={currentQuestion.codeSnippet}
              />
            )}

            <PlayerAnswerSection
              questionType={currentQuestion.questionType}
              options={currentQuestion.options}
              answer={answers[currentQuestion.questionId] || ''}
              onSetAnswer={(answer) =>
                handleSetAnswer(String(currentQuestion.questionId), answer)
              }
            />
          </div>
        </QuestionCard>

        {submitAnswerState.submitError && (
          <NotificationBar
            variant="error"
            title="Submission failed"
            description={
              <div className="flex items-center gap-3">
                <span>{submitAnswerState.submitError}</span>
                <Button
                  size="sm"
                  onClick={handlersSubmitAnswers.handleRetryAnswers}
                >
                  Retry
                </Button>
              </div>
            }
          />
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Button
              variant="ghost"
              disabled={currentIndex === 0}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2"
              onClick={handlePrevious}
            >
              <Icon name="mi:arrow_back" />
              Previous
            </Button>
            <Button
              variant="ghost"
              disabled={isLastQuestion}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2"
              onClick={handleNext}
            >
              Next
              <Icon name="mi:arrow_forward" />
            </Button>
          </div>

          {isLastQuestion && (
            <Button
              variant="primary"
              size="lg"
              disabled={!allQuestionsAnswered || submitAnswerState.isSubmitting}
              className="w-full sm:w-auto"
              onClick={handlersSubmitAnswers.handleSubmitAnswers}
            >
              Submit Answers
            </Button>
          )}
        </div>
      </section>
    </>
  )
}
