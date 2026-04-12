import type { Meta, StoryObj } from '@storybook/react-vite'

import { CodeSnippetInput } from './CodeSnippetInput'

const meta = {
  title: 'Entities/Quiz/CodeSnippetInput',
  component: CodeSnippetInput,
  tags: ['autodocs'],
} satisfies Meta<typeof CodeSnippetInput>

export default meta
type Story = StoryObj<typeof meta>

export const UncontrolledHidden: Story = {
  args: {
    defaultVisible: false,
  },
}

export const UncontrolledVisible: Story = {
  args: {
    defaultVisible: true,
  },
}

export const UncontrolledWithCode: Story = {
  args: {
    defaultVisible: true,
    defaultValue: 'console.log("Hello, World!");',
  },
}

export const Controlled: Story = {
  args: {
    value: 'const fibonacci = (n) => { /* ... */ };',
    onChange: (value: string) => console.log('Code changed:', value),
  },
}