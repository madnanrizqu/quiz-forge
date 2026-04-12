import type { Meta, StoryObj } from '@storybook/react-vite'

import { PlayerQuizOption } from './PlayerQuizOption'

const meta = {
  title: 'Entities/Quiz/Play Quiz/PlayerQuizOption',
  component: PlayerQuizOption,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PlayerQuizOption>

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
      <PlayerQuizOption {...args} label="Vertical Integration" value="1" />
      <PlayerQuizOption
        {...args}
        label="Scalability"
        value="2"
        defaultChecked
      />
      <PlayerQuizOption {...args} label="Redundancy" value="3" />
      <PlayerQuizOption {...args} label="Encapsulation" value="4" />
    </div>
  ),
}
