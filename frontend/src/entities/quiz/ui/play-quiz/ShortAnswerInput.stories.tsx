import type { Meta, StoryObj } from '@storybook/react-vite'

import { ShortAnswerInput } from './ShortAnswerInput'

const meta = {
  title: 'Entities/Quiz/ShortAnswerInput',
  component: ShortAnswerInput,
  tags: ['autodocs'],
} satisfies Meta<typeof ShortAnswerInput>

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
