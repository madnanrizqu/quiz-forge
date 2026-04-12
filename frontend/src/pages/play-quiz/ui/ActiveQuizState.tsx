import { useState } from 'react'
import { Button, Icon, Text } from '@/shared/ui'
import {
  CodeSnippetInput,
  PlayerAnswerSection,
  QuestionCard,
} from '@/entities/quiz'
import { MOCK_QUIZZES } from '../model'

interface ActiveQuizStateProps {
  quizId: string
  onComplete: (answers: Record<string, string>) => void
}

export function ActiveQuizState({ quizId, onComplete }: ActiveQuizStateProps) {
  const questions = MOCK_QUIZZES[quizId]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1

  const handleSetAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handleSubmit = () => {
    onComplete(answers)
  }

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
              {String(currentIndex + 1).padStart(2, '0')}
            </Text>
          </div>
          <div>
            <Text variant="body-standard" className="text-on-surface-variant">
              Question {currentIndex + 1} of {questions.length}
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
            answer={answers[currentQuestion.quizId] || ''}
            onSetAnswer={(answer) =>
              handleSetAnswer(currentQuestion.quizId, answer)
            }
          />
        </div>
      </QuestionCard>

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
            className="w-full sm:w-auto"
            onClick={handleSubmit}
          >
            Submit Answers
          </Button>
        )}
      </div>
    </section>
  )
}
