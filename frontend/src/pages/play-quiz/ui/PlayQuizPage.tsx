import { useState } from 'react'
import { Button, Icon, QuestionCard, Text } from '@/shared/ui'
import { AnswerSection, CodeBlock } from '@/entities/quiz'
import { AppShell } from '@/widgets/app-shell'
import { PlayerHeaderDesktop } from '@/widgets/header'
import { MOCK_QUIZZES } from '../model'

interface PlayQuizPageProps {
  quizId: string
}

export function PlayQuizPage({ quizId }: PlayQuizPageProps) {
  const [answer, setAnswer] = useState('')
  const quizData = MOCK_QUIZZES[quizId]

  if (!quizData) {
    return <div>Quiz not found</div>
  }

  const {
    questionNumber,
    totalQuestions,
    questionType,
    questionText,
    codeSnippet,
    options,
  } = quizData

  return (
    <AppShell header={<PlayerHeaderDesktop progress={65} />} mobileNav={null}>
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 min-h-[calc(100vh-80px)] flex flex-col justify-center">
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

              {codeSnippet && <CodeBlock code={codeSnippet} />}

              <AnswerSection
                questionType={questionType}
                options={options}
                answer={answer}
                onSetAnswer={setAnswer}
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

            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Submit Answers
            </Button>
          </div>
        </section>
      </main>
    </AppShell>
  )
}
