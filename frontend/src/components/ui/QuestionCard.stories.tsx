import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from './Badge'
import { Button } from './Button'
import { QuestionCard } from './QuestionCard'

const meta = {
  title: 'Design System/QuestionCard',
  component: QuestionCard,
  tags: ['autodocs'],
  args: {
    title: 'How should users prioritize design systems?',
    description:
      'Choose the statement that best reflects long-term maintainability and velocity.',
  },
} satisfies Meta<typeof QuestionCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithActions: Story = {
  render: (args) => (
    <QuestionCard {...args}>
      <div className="flex flex-wrap items-center gap-3">
        <Badge>Difficulty: Medium</Badge>
        <Button variant="ghost" size="sm">
          Review
        </Button>
      </div>
    </QuestionCard>
  ),
}
