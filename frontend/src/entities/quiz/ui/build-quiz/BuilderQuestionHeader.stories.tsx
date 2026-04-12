import type { Meta, StoryObj } from '@storybook/react-vite'

import { BuilderQuestionHeader } from './BuilderQuestionHeader'
import { QuestionType } from '../../model/types'

const meta = {
  title: 'Entities/Quiz/Build Quiz/BuilderQuestionHeader',
  component: BuilderQuestionHeader,
  tags: ['autodocs'],
  args: {
    questionNumber: 1,
    type: QuestionType.MultipleChoice,
  },
} satisfies Meta<typeof BuilderQuestionHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MultipleChoiceSelected: Story = {
  args: {
    questionNumber: 1,
    type: QuestionType.MultipleChoice,
  },
}

export const ShortAnswerSelected: Story = {
  args: {
    questionNumber: 2,
    type: QuestionType.ShortAnswer,
  },
}

export const WithTypeChangeHandler: Story = {
  args: {
    questionNumber: 3,
    type: QuestionType.MultipleChoice,
    onTypeChange: (type) => console.log('Type changed to:', type),
  },
}
