import type { Meta, StoryObj } from '@storybook/react-vite'

import { PlayerAnswerSection } from './PlayerAnswerSection'
import { QuestionType } from '../../model/types'
import type { QuizOptionData } from '../../model/types'

const mockOptions: QuizOptionData[] = [
  { id: '1', label: 'Vertical Integration' },
  { id: '2', label: 'Scalability' },
  { id: '3', label: 'Redundancy' },
  { id: '4', label: 'Encapsulation' },
]

const meta = {
  title: 'Entities/Quiz/Play Quiz/PlayerAnswerSection',
  component: PlayerAnswerSection,
  tags: ['autodocs'],
} satisfies Meta<typeof PlayerAnswerSection>

export default meta
type Story = StoryObj<typeof meta>

export const ShortAnswer: Story = {
  args: {
    questionType: QuestionType.ShortAnswer,
    options: [],
    answer: '',
    onSetAnswer: () => {},
  },
}

export const MultipleChoice: Story = {
  args: {
    questionType: QuestionType.MultipleChoice,
    options: mockOptions,
    answer: '',
    onSetAnswer: () => {},
  },
}

export const MultipleChoiceWithSelection: Story = {
  args: {
    questionType: QuestionType.MultipleChoice,
    options: mockOptions,
    answer: '2',
    onSetAnswer: () => {},
  },
}
