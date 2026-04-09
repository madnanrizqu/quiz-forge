import { createFileRoute } from '@tanstack/react-router'

import { Badge, QuestionCard, Text } from '../components/ui'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <main className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 md:py-14">
      <section className="rounded-xl bg-surface-container-low p-6 md:p-8">
        <Text className="m-0" tone="on-surface-variant" variant="label-small">
          About
        </Text>
        <Text asChild className="mb-0 mt-2" variant="display-h1">
          <h1>Sapphire Architectural Design System</h1>
        </Text>
        <Text
          className="mb-0 mt-4 max-w-4xl"
          tone="on-surface-variant"
          variant="body-standard"
        >
          This starter is intentionally rebuilt around structural clarity:
          layered surfaces, restrained accents, and typography that treats UI as
          technical editorial space.
        </Text>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <QuestionCard
          title="North star"
          description="The blueprint metaphor drives spacing, depth, and hierarchy across every component."
        >
          <Badge>Architectural Blueprint</Badge>
        </QuestionCard>

        <QuestionCard
          title="Depth without noise"
          description="Elevation relies on soft ambient shadow and ghost outlines, not harsh borders."
        >
          <Badge>Ambient Layering</Badge>
        </QuestionCard>

        <QuestionCard
          title="Interaction model"
          description="Primary actions own the gradient; supportive actions remain ghost-style and contextual."
        >
          <Badge>Action Hierarchy</Badge>
        </QuestionCard>

        <QuestionCard
          title="Tokenized foundation"
          description="Color, radius, shadows, and typography flow from DESIGN.md into Tailwind tokens."
        >
          <Badge>Design Tokens</Badge>
        </QuestionCard>
      </section>
    </main>
  )
}
