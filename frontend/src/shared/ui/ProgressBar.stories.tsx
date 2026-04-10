import type { Meta, StoryObj } from '@storybook/react-vite'

import { ProgressBar } from './ProgressBar'

const meta = {
  title: 'Design System/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const ZeroPercent: Story = {
  args: {
    value: 0,
  },
}

export const FiftyPercent: Story = {
  args: {
    value: 50,
  },
}

export const Full: Story = {
  args: {
    value: 100,
  },
}
