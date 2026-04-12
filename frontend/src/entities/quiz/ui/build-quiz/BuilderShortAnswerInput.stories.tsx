import type { Meta, StoryObj } from '@storybook/react-vite'

import { BuilderShortAnswerInput } from './BuilderShortAnswerInput'

const meta = {
  title: 'Entities/Quiz/Build Quiz/BuilderShortAnswerInput',
  component: BuilderShortAnswerInput,
  tags: ['autodocs'],
} satisfies Meta<typeof BuilderShortAnswerInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
  args: {
    value: 'Paris',
  },
}
