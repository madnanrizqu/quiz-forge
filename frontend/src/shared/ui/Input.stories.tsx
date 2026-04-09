import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from './Input'
import { Label } from './Label'

const meta = {
  title: 'Design System/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    placeholder: 'Question title',
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="w-[22.5rem]">
      <Label className="mb-2" htmlFor="story-input-default">
        Question title
      </Label>
      <Input {...args} id="story-input-default" />
    </div>
  ),
}

export const Prefilled: Story = {
  render: (args) => (
    <div className="w-[22.5rem]">
      <Label className="mb-2" htmlFor="story-input-prefilled">
        Question title
      </Label>
      <Input
        {...args}
        defaultValue="Design review quiz"
        id="story-input-prefilled"
      />
    </div>
  ),
}
