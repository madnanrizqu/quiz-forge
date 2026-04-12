import { useNavigate } from '@tanstack/react-router'
import { Button, Icon, Stepper, Text } from '@/shared/ui'
import { CodeSnippetInput, QuestionCard, QuestionType } from '@/entities/quiz'
import {
  BuilderQuestionHeader,
  BuilderQuestionPrompt,
  BuilderAnswerSection,
} from '@/entities/quiz/ui/build-quiz'
import { AppShell } from '@/widgets/app-shell'
import { BuilderHeaderDesktop, BottomNavMobile } from '@/widgets/header'
import { getQuizById } from '../model/mock-data'

interface BuilderQuestionsStepPageProps {
  quizId: string
}

export function BuilderQuestionsStepPage({
  quizId,
}: BuilderQuestionsStepPageProps) {
  const navigate = useNavigate()
  const quiz = getQuizById(quizId)

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
          <QuestionCard className="group relative">
            <BuilderQuestionHeader
              questionNumber={1}
              type={QuestionType.MultipleChoice}
            />

            <div className="space-y-10">
              <div className="space-y-6">
                <BuilderQuestionPrompt
                  defaultValue="What is the output of 'typeof null' in JavaScript?"
                />

                <CodeSnippetInput
                  defaultVisible
                  value="console.log(typeof null);"
                />
              </div>

              <BuilderAnswerSection
                questionType={QuestionType.MultipleChoice}
                choices={[
                  { id: '1', text: 'object', isCorrect: true },
                  { id: '2', text: 'null', isCorrect: false },
                ]}
                correctAnswerId="1"
              />
            </div>
          </QuestionCard>

          <QuestionCard className="group relative">
            <BuilderQuestionHeader
              questionNumber={2}
              type={QuestionType.ShortAnswer}
            />

            <div className="space-y-10">
              <div className="space-y-6">
                <BuilderQuestionPrompt />

                <CodeSnippetInput />
              </div>

              <BuilderAnswerSection
                questionType={QuestionType.ShortAnswer}
                choices={[]}
                shortAnswerValue=""
              />
            </div>
          </QuestionCard>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6">
          <Button
            variant="soft"
            size="lg"
            className="w-full py-4 rounded-3xl font-bold flex items-center justify-center gap-2 group h-auto bg-surface-container-high"
          >
            <Icon name="mi:add_circle" className="transition-transform" />
            Add Question
          </Button>
        </div>
      </main>
    </AppShell>
  )
}
