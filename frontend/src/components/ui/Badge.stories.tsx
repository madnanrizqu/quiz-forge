import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from './Badge'

const meta = {
  title: 'Design System/Badge',
  component: Badge,
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Metadata',
  },
}

export const Status: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge>Draft</Badge>
      <Badge>Needs Review</Badge>
      <Badge>Published</Badge>
    </div>
  ),
}

export const AsLink: Story = {
  render: () => (
    <Badge asChild>
      <a className="no-underline" href="/about">
        Learn more
      </a>
    </Badge>
  ),
}
