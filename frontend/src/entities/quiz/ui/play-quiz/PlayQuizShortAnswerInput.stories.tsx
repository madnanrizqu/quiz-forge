import type { Meta, StoryObj } from '@storybook/react-vite'

import { PlayQuizShortAnswerInput } from './PlayQuizShortAnswerInput'

const meta = {
  title: 'Entities/Quiz/Play Quiz/PlayQuizShortAnswerInput',
  component: PlayQuizShortAnswerInput,
  tags: ['autodocs'],
} satisfies Meta<typeof PlayQuizShortAnswerInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: '',
    onChange: () => {},
  },
}

export const WithValue: Story = {
  args: {
    value: 'User provided answer',
    onChange: () => {},
  },
}

export const Disabled: Story = {
  args: {
    value: 'Cannot edit this',
    onChange: () => {},
    disabled: true,
  },
}