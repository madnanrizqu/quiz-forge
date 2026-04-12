import type { Meta, StoryObj } from '@storybook/react-vite'

import { CodeBlock } from './CodeBlock'

const meta = {
  title: 'Entities/Quiz/Play Quiz/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
} satisfies Meta<typeof CodeBlock>

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
