import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './Button'
import { Icon } from './icons'

const meta = {
  title: 'Design System/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Create Quiz',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Cancel',
  },
}

export const Soft: Story = {
  args: {
    variant: 'soft',
  },
}

export const IconStory: Story = {
  name: 'Icon',
  args: {
    variant: 'icon',
    children: <Icon name="mi:add" />,
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Publish Blueprint',
  },
}

export const AsLink: Story = {
  args: {
    asChild: true,
  },
  render: (args) => (
    <Button {...args}>
      <a href="/about">Read blueprint details</a>
    </Button>
  ),
}
