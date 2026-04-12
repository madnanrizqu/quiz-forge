import { Button, Icon, Text } from '@/shared/ui'
import { QuestionCard, CodeSnippetInput } from '@/entities/quiz'
import { AnswerSection } from '@/entities/quiz/ui/play-quiz'
import type { QuizPlayData } from '../model'

interface ActiveQuizStateProps {
  quizData: QuizPlayData
  answer: string
  onSetAnswer: (answer: string) => void
  onSubmit: () => void
}

export function ActiveQuizState({
  quizData,
  answer,
  onSetAnswer,
  onSubmit,
}: ActiveQuizStateProps) {
  const {
    questionNumber,
    totalQuestions,
    questionType,
    questionText,
    codeSnippet,
    options,
  } = quizData

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Text
              variant="headline-h2"
              tone="on-primary"
              className="font-bold m-0"
            >
              {String(questionNumber).padStart(2, '0')}
            </Text>
          </div>
          <div>
            <Text
              variant="body-standard"
              className="text-on-surface-variant"
            >
              Question {questionNumber} of {totalQuestions}
            </Text>
            <Text variant="label-small" className="text-outline uppercase">
              {questionType}
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
            {questionText}
          </Text>

          {codeSnippet && (
            <CodeSnippetInput disabled value={codeSnippet} />
          )}

          <AnswerSection
            questionType={questionType}
            options={options}
            answer={answer}
            onSetAnswer={onSetAnswer}
          />
        </div>
      </QuestionCard>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Button
            variant="ghost"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2"
          >
            <Icon name="mi:arrow_back" />
            Previous
          </Button>
          <Button
            variant="ghost"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2"
          >
            Next
            <Icon name="mi:arrow_forward" />
          </Button>
        </div>

        <Button variant="primary" size="lg" className="w-full sm:w-auto" onClick={onSubmit}>
          Submit Answers
        </Button>
      </div>
    </section>
  )
}
