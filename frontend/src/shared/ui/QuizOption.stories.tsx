import type { Meta, StoryObj } from '@storybook/react-vite'

import { QuizOption } from './QuizOption'

const meta = {
  title: 'Design System/QuizOption',
  component: QuizOption,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof QuizOption>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Scalability',
    name: 'quiz',
  },
}

export const Selected: Story = {
  args: {
    label: 'Scalability',
    name: 'quiz',
    defaultChecked: true,
  },
}

export const MultipleChoice: Story = {
  args: {
    label: 'Scalability',
    name: 'quiz',
  },
  render: (args) => (
    <div className="flex flex-col gap-3 w-96">
      <QuizOption {...args} label="Vertical Integration" value="1" />
      <QuizOption {...args} label="Scalability" value="2" defaultChecked />
      <QuizOption {...args} label="Redundancy" value="3" />
      <QuizOption {...args} label="Encapsulation" value="4" />
    </div>
  ),
}
