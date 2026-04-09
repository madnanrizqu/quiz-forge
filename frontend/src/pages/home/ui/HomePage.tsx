import { Badge, Button, Input, Label, QuestionCard, Text } from '@/shared/ui'

export function HomePage() {
  return (
    <main className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-12 pt-10 md:gap-8 md:pt-14">
      <section className="rounded-xl bg-surface-container-low p-6 md:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge>Editorial Authority</Badge>
          <Badge>No-Line Rule</Badge>
          <Badge>Tailwind First</Badge>
        </div>
        <Text asChild className="m-0 max-w-4xl" variant="display-h1">
          <h1>Build quizzes with architectural clarity.</h1>
        </Text>
        <Text
          className="mb-0 mt-4 max-w-3xl"
          tone="on-surface-variant"
          variant="body-standard"
        >
          Sapphire Architectural creates structure through tonal hierarchy,
          gradient emphasis, and deliberate spacing so complex quiz authoring
          stays easy to scan and fast to ship.
        </Text>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Label className="mb-2" htmlFor="question-title">
              New Question
            </Label>
            <Input
              id="question-title"
              placeholder="What should this question measure?"
            />
          </div>
          <Button size="lg">Create Question</Button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <QuestionCard
          title="Information hierarchy"
          description="Use surface and surface-container-low transitions instead of hard divider lines."
        >
          <div className="flex gap-2">
            <Badge>Surface</Badge>
            <Badge>Container Low</Badge>
          </div>
        </QuestionCard>

        <QuestionCard
          title="Primary actions"
          description="Reserve gradient buttons for key progression actions to preserve visual authority."
        >
          <div className="flex gap-3">
            <Button size="sm">Save Draft</Button>
            <Button variant="ghost" size="sm">
              Preview
            </Button>
          </div>
        </QuestionCard>

        <QuestionCard
          title="Typography pair"
          description="Headlines in Plus Jakarta Sans and body copy in Inter keep technical content readable."
        />

        <QuestionCard
          title="Motion language"
          description="Cards use transition-all duration-300 with subtle hover lift for perceived responsiveness."
        />
      </section>
    </main>
  )
}
