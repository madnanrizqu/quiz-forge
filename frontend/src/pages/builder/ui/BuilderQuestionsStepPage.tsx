import { useNavigate } from '@tanstack/react-router'
import {
  Badge,
  Button,
  Icon,
  Input,
  Label,
  Select,
  Radio,
} from '@/shared/ui'
import { CodeBlock, QuestionCard } from '@/entities/quiz'
import { AppShell } from '@/widgets/app-shell'
import { BuilderHeaderDesktop, BottomNavMobile } from '@/widgets/header'
import { getQuizById } from '../model/mock-data'

interface BuilderQuestionsStepPageProps {
  quizId: string
}

export function BuilderQuestionsStepPage({ quizId }: BuilderQuestionsStepPageProps) {
  const navigate = useNavigate()
  const quiz = getQuizById(quizId)

  if (!quiz) {
    return (
      <AppShell
        header={<BuilderHeaderDesktop showSaveQuiz />}
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
      header={<BuilderHeaderDesktop showSaveQuiz />}
      mobileNav={<BottomNavMobile />}
    >
      <main className="max-w-4xl mx-auto px-6 py-12 pb-32">
        <div className="space-y-8">
          <QuestionCard className="group relative">
            <div className="flex justify-between items-start mb-6">
              <Badge className="bg-primary-fixed text-on-primary-fixed-variant font-bold uppercase tracking-wider text-xs">
                Question 01
              </Badge>
              <Select>
                <option>Multiple Choice</option>
                <option>Short Answer</option>
              </Select>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="block mb-2">Question Prompt</Label>
                <Input
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/40 text-on-surface font-medium"
                  defaultValue="What is the output of 'typeof null' in JavaScript?"
                />
              </div>

              <CodeBlock code="console.log(typeof null);" />

              <div className="space-y-3">
                <Label className="block mb-2">Answer Choices</Label>
                <div className="flex items-center gap-4 group/option">
                  <Radio name="q1" defaultChecked />
                  <Input
                    className="flex-1 bg-surface-container-low h-12 text-sm font-medium"
                    defaultValue="object"
                  />
                  <Button variant="icon" size="icon">
                    <Icon name="mi:delete" />
                  </Button>
                </div>
                <div className="flex items-center gap-4 group/option">
                  <Radio name="q1" />
                  <Input
                    className="flex-1 bg-surface-container-low h-12 text-sm font-medium"
                    defaultValue="null"
                  />
                  <Button variant="icon" size="icon">
                    <Icon name="mi:delete" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-primary font-semibold text-sm -ml-2"
                >
                  <Icon name="mi:add" size="sm" className="mr-2" />
                  Add Choice
                </Button>
              </div>
            </div>
          </QuestionCard>

          <QuestionCard className="group relative">
            <div className="flex justify-between items-start mb-6">
              <Badge className="bg-primary-fixed text-on-primary-fixed-variant font-bold uppercase tracking-wider text-xs">
                Question 02
              </Badge>
              <Select defaultValue="Short Answer">
                <option>Multiple Choice</option>
                <option>Short Answer</option>
              </Select>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="block mb-2">Question Prompt</Label>
                <Input
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/40 text-on-surface"
                  placeholder="Enter your question here..."
                />
              </div>

              <div>
                <Label className="block mb-2">Correct Answer</Label>
                <Input
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/40 text-on-surface"
                  placeholder="Type the literal answer here..."
                />
              </div>
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

        <div className="mt-8 flex justify-start">
          <Button
            variant="ghost"
            size="md"
            onClick={() => navigate({ to: '/' })}
          >
            <Icon name="mi:arrow_back" size="sm" className="mr-2" />
            Back to Quiz Details
          </Button>
        </div>
      </main>
    </AppShell>
  )
}