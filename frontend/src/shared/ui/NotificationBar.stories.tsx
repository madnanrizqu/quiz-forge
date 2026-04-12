import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './Button'
import { NotificationBar } from './NotificationBar'

const meta = {
  title: 'Design System/NotificationBar',
  component: NotificationBar,
  tags: ['autodocs'],
  args: {
    title: 'Quiz Published',
    description: 'Your quiz has been successfully published.',
    variant: 'success',
  },
} satisfies Meta<typeof NotificationBar>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {}

export const Error: Story = {
  args: {
    title: 'Failed to Save Changes',
    description: 'Could not save your changes. Please try again.',
    variant: 'error',
  },
}

export const Warning: Story = {
  args: {
    title: 'Unsaved Changes',
    description: 'You have unsaved changes that will be lost.',
    variant: 'warning',
  },
}

export const Info: Story = {
  args: {
    title: 'Quiz Draft Saved',
    description: 'Your progress has been auto-saved.',
    variant: 'info',
  },
}

export const WithCustomComponent: Story = {
  args: {
    title: 'Failed to Save Changes',
    variant: 'warning',
    description: (
      <div className="flex items-center gap-2">
        <span>Could not save your changes.</span>
        <Button
          variant="soft"
          size="sm"
          onClick={() => console.log('Retry clicked')}
        >
          Retry
        </Button>
      </div>
    ),
  },
}
