import type { Meta, StoryObj } from '@storybook/react-vite'

import { BuilderAnswerSection } from './BuilderAnswerSection'
import { QuestionType } from '../../model/types'
import type { QuizChoice } from '../../model/types'

const mockChoices: QuizChoice[] = [
  { id: '1', text: 'Paris', isCorrect: false },
  { id: '2', text: 'London', isCorrect: false },
  { id: '3', text: 'Berlin', isCorrect: false },
  { id: '4', text: 'Madrid', isCorrect: false },
]

const meta = {
  title: 'Entities/Quiz/Build Quiz/BuilderAnswerSection',
  component: BuilderAnswerSection,
  tags: ['autodocs'],
} satisfies Meta<typeof BuilderAnswerSection>

export default meta
type Story = StoryObj<typeof meta>

export const MultipleChoiceMode: Story = {
  args: {
    questionType: QuestionType.MultipleChoice,
    choices: mockChoices,
  },
}

export const MultipleChoiceWithCorrectAnswer: Story = {
  args: {
    questionType: QuestionType.MultipleChoice,
    choices: mockChoices,
    correctAnswerId: '1',
  },
}

export const ShortAnswerMode: Story = {
  args: {
    questionType: QuestionType.ShortAnswer,
    choices: [],
    shortAnswerValue: '',
  },
}

export const ShortAnswerWithValue: Story = {
  args: {
    questionType: QuestionType.ShortAnswer,
    choices: [],
    shortAnswerValue: 'Paris',
  },
}

export const MultipleChoiceDisabled: Story = {
  args: {
    questionType: QuestionType.MultipleChoice,
    choices: mockChoices,
    correctAnswerId: '1',
    disabled: true,
  },
}

export const ShortAnswerDisabled: Story = {
  args: {
    questionType: QuestionType.ShortAnswer,
    choices: [],
    shortAnswerValue: 'Paris',
    disabled: true,
  },
}
