import type { Meta, StoryObj } from '@storybook/react-vite'

import { PlayerMultipleChoiceInput } from './PlayerMultipleChoiceInput'
import type { QuizOptionData } from '../../model/types'

const mockOptions: QuizOptionData[] = [
  { id: '1', label: 'Vertical Integration' },
  { id: '2', label: 'Scalability' },
  { id: '3', label: 'Redundancy' },
  { id: '4', label: 'Encapsulation' },
]

const meta = {
  title: 'Entities/Quiz/Play Quiz/PlayerMultipleChoiceInput',
  component: PlayerMultipleChoiceInput,
  tags: ['autodocs'],
} satisfies Meta<typeof PlayerMultipleChoiceInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: mockOptions,
    value: '',
    onChange: () => {},
  },
}

export const WithSelection: Story = {
  args: {
    options: mockOptions,
    value: '2',
    onChange: () => {},
  },
}

export const MultipleOptions: Story = {
  args: {
    options: [
      { id: 'a', label: 'Option A' },
      { id: 'b', label: 'Option B' },
      { id: 'c', label: 'Option C' },
      { id: 'd', label: 'Option D' },
    ],
    value: '',
    onChange: () => {},
  },
}
