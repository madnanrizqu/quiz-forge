import type { Meta, StoryObj } from '@storybook/react-vite'

import { PlayQuizCodeBlock } from './PlayQuizCodeBlock'

const meta = {
  title: 'Entities/Quiz/Play Quiz/PlayQuizCodeBlock',
  component: PlayQuizCodeBlock,
  tags: ['autodocs'],
} satisfies Meta<typeof PlayQuizCodeBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    code: 'const greeting = "Hello, World!";',
  },
}

export const LongCode: Story = {
  args: {
    code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log(result);`,
  },
}