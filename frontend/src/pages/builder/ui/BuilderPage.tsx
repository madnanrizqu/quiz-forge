import {
  Badge,
  Button,
  Icon,
  Input,
  Label,
  QuestionCard,
  Select,
  Radio,
  Textarea,
} from '@/shared/ui'
import { CodeBlock } from '@/entities/quiz'

export function BuilderPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 pb-32">
      {/* Quiz Meta Section */}
      <section className="mb-12">
        <div className="bg-surface-container-high p-8 rounded-2xl shadow-ambient space-y-6">
          <div>
            <Label className="block mb-2">Quiz Title</Label>
            <Input
              className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 text-on-surface placeholder:text-outline/50 transition-all text-lg font-semibold"
              placeholder="e.g. Advanced JavaScript Patterns"
            />
          </div>
          <div>
            <Label className="block mb-2">Quiz Description</Label>
            <Textarea
              className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 text-on-surface placeholder:text-outline/50 transition-all resize-none"
              placeholder="Explain what this quiz covers..."
              rows={3}
            />
          </div>
        </div>
      </section>

      {/* Question List */}
      <div className="space-y-8">
        {/* Question Card 1: Multiple Choice */}
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

        {/* Question Card 2: Short Answer */}
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
    </main>
  )
}
