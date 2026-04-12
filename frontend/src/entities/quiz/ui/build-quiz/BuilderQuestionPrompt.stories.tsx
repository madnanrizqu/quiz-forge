import type { Meta, StoryObj } from '@storybook/react-vite'

import { BuilderQuestionPrompt } from './BuilderQuestionPrompt'

const meta = {
  title: 'Entities/Quiz/Build Quiz/BuilderQuestionPrompt',
  component: BuilderQuestionPrompt,
  tags: ['autodocs'],
  args: {
    placeholder: 'Enter your question here...',
  },
} satisfies Meta<typeof BuilderQuestionPrompt>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
  args: {
    value: 'What is the capital of France?',
    onChange: () => {},
  },
}

export const Uncontrolled: Story = {
  args: {
    defaultValue: 'This is an uncontrolled input',
  },
}

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Type your question here...',
  },
}
