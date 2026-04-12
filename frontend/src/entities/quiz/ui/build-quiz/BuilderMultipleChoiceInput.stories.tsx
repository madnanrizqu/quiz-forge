import type { Meta, StoryObj } from '@storybook/react-vite'

import { BuilderMultipleChoiceInput } from './BuilderMultipleChoiceInput'
import type { QuizChoice } from '../../model/types'

const mockChoices: QuizChoice[] = [
  { id: '1', text: 'Paris', isCorrect: false },
  { id: '2', text: 'London', isCorrect: false },
  { id: '3', text: 'Berlin', isCorrect: false },
]

const meta = {
  title: 'Entities/Quiz/Build Quiz/BuilderMultipleChoiceInput',
  component: BuilderMultipleChoiceInput,
  tags: ['autodocs'],
  args: {
    choices: mockChoices,
  },
} satisfies Meta<typeof BuilderMultipleChoiceInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithCorrectAnswerSelected: Story = {
  args: {
    choices: mockChoices,
    correctAnswerId: '1',
  },
}
