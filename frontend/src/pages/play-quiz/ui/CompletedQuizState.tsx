import { useEffect } from 'react'
import { Button, Icon, Text } from '@/shared/ui'
import type { QuizResultData, QuestionResult } from '@/entities/quiz'
import { calculatePerformance } from '../model'
import { useConfetti } from '@/shared/lib/hooks'

interface CompletedQuizStateProps {
  quizResult: QuizResultData
  onPlayAgain?: () => void
}

function QuestionReviewItem({
  question,
  isEven,
}: {
  question: QuestionResult
  isEven: boolean
}) {
  return (
    <div
      className={`flex items-center justify-between p-6 md:p-8 rounded-2xl transition-transform hover:translate-x-1 ${
        isEven ? 'bg-surface-container-lowest' : 'bg-surface-container-low'
      }`}
    >
      <div className="flex-1 pr-4">
        <Text
          variant="label-small"
          className="text-on-surface-variant uppercase tracking-widest mb-2 block"
        >
          Question {String(question.questionNumber).padStart(2, '0')}
        </Text>
        <Text
          variant="title-large"
          className="text-on-surface leading-snug"
        >
          {question.questionText}
        </Text>
      </div>
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-full shrink-0 ${
          question.isCorrect
            ? 'bg-emerald-50 text-emerald-700'
            : 'bg-error/10 text-error'
        }`}
      >
        <Icon
          name={question.isCorrect ? 'mi:check_circle' : 'mi:cancel'}
          size={20}
        />
        <Text variant="body-standard" className="font-bold">
          {question.isCorrect ? 'Correct' : 'Incorrect'}
        </Text>
      </div>
    </div>
  )
}

export function CompletedQuizState({
  quizResult,
  onPlayAgain,
}: CompletedQuizStateProps) {
  const {
    quizTitle,
    score,
    totalQuestions,
    timeSpent,
    tabSwitches,
    pastes,
    questions,
  } = quizResult

  const { percentage } = calculatePerformance(score, totalQuestions)

  const { fire } = useConfetti()

  useEffect(() => {
    fire()
  }, [fire])

  return (
    <section className="relative space-y-12 md:space-y-16">

      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center p-4 bg-surface-container rounded-full">
          <Icon name="mi:emoji_events" size={40} className="text-primary" />
        </div>

        <Text variant="display-h1" className="text-on-surface">
          Quiz Complete!
        </Text>

        <Text
          variant="body-standard"
          tone="on-surface-variant"
          className="max-w-lg mx-auto"
        >
          Great effort! You&apos;ve successfully finished the {quizTitle}.
        </Text>

        <div className="relative inline-block mt-8">
          <div className="flex flex-col items-center justify-center bg-surface-container-lowest p-10 md:p-12 rounded-3xl shadow-ambient border-2 border-primary/5">
            <Text
              variant="display-h1"
              className="text-primary tracking-tighter"
              style={{ fontSize: '5rem', lineHeight: 1 }}
            >
              {percentage}%
            </Text>
            <Text
              variant="label-small"
              className="text-on-surface-variant uppercase tracking-widest mt-2"
            >
              Final Score
            </Text>
          </div>
        </div>

        {(tabSwitches > 0 || pastes > 0) && (
          <div className="flex flex-wrap justify-center items-center gap-3 mt-8">
            <Text
              variant="label-small"
              className="text-on-surface-variant uppercase tracking-widest mr-2"
            >
              Proctoring Log:
            </Text>
            {tabSwitches > 0 && (
              <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full">
                <Icon name="mi:construction" size={16} />
                <Text variant="body-standard" className="font-bold">
                  {tabSwitches} tab switches
                </Text>
              </div>
            )}
            {pastes > 0 && (
              <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full">
                <Icon name="mi:construction" size={16} />
                <Text variant="body-standard" className="font-bold">
                  {pastes} pastes
                </Text>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="bg-surface-container-low p-6 rounded-2xl">
          <Text
            variant="body-standard"
            className="text-on-surface-variant mb-1 block"
          >
            Correct Answers
          </Text>
          <Text variant="headline-h2" className="text-on-surface">
            {score} / {totalQuestions}
          </Text>
        </div>

        <div className="bg-surface-container-low p-6 rounded-2xl">
          <Text
            variant="body-standard"
            className="text-on-surface-variant mb-1 block"
          >
            Time Spent
          </Text>
          <div className="flex items-center gap-2">
            <Icon name="mi:timer" size={24} className="text-on-surface-variant" />
            <Text variant="headline-h2" className="text-on-surface">
              {timeSpent}
            </Text>
          </div>
        </div>
      </div>

      {questions.length > 0 && (
        <div className="space-y-6">
          <Text variant="headline-h2" className="text-on-surface px-2">
            Question Review
          </Text>

          <div className="flex flex-col gap-6">
            {questions.map((question, index) => (
              <QuestionReviewItem
                key={question.questionNumber}
                question={question}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 md:mt-20 flex flex-col md:flex-row items-center justify-center gap-6">
        <Button
          variant="primary"
          size="lg"
          className="w-full md:w-auto px-10"
          onClick={onPlayAgain}
        >
          Retry Quiz
        </Button>
      </div>
    </section>
  )
}
