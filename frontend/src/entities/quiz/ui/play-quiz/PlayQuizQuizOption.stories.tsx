import type { Meta, StoryObj } from '@storybook/react-vite'

import { PlayQuizQuizOption } from './PlayQuizQuizOption'

const meta = {
  title: 'Entities/Quiz/PlayQuiz/PlayQuizQuizOption',
  component: PlayQuizQuizOption,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PlayQuizQuizOption>

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
      <PlayQuizQuizOption {...args} label="Vertical Integration" value="1" />
      <PlayQuizQuizOption
        {...args}
        label="Scalability"
        value="2"
        defaultChecked
      />
      <PlayQuizQuizOption {...args} label="Redundancy" value="3" />
      <PlayQuizQuizOption {...args} label="Encapsulation" value="4" />
    </div>
  ),
}