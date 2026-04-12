import type { Meta, StoryObj } from '@storybook/react-vite'

import { Stepper } from './Stepper'

const meta = {
  title: 'Design System/Stepper',
  component: Stepper,
  tags: ['autodocs'],
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

export const Step1Of2: Story = {
  args: {
    currentStep: 1,
    totalSteps: 2,
  },
}

export const Step2Of2: Story = {
  args: {
    currentStep: 2,
    totalSteps: 2,
  },
}

export const Step1Of3: Story = {
  args: {
    currentStep: 1,
    totalSteps: 3,
  },
}

export const Step2Of3: Story = {
  args: {
    currentStep: 2,
    totalSteps: 3,
  },
}

export const Step3Of3: Story = {
  args: {
    currentStep: 3,
    totalSteps: 3,
  },
}