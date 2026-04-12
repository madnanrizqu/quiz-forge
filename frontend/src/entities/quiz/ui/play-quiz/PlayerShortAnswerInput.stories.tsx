import type { Meta, StoryObj } from '@storybook/react-vite'

import { PlayerShortAnswerInput } from './PlayerShortAnswerInput'

const meta = {
  title: 'Entities/Quiz/Play Quiz/PlayerShortAnswerInput',
  component: PlayerShortAnswerInput,
  tags: ['autodocs'],
} satisfies Meta<typeof PlayerShortAnswerInput>

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
