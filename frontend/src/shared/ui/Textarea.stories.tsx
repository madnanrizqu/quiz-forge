import type { Meta, StoryObj } from '@storybook/react-vite'

import { Textarea } from './Textarea'
import { Label } from './Label'

const meta = {
  title: 'Design System/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    placeholder: 'Type your answer here...',
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="w-[22.5rem]">
      <Label className="mb-2" htmlFor="story-textarea-default">
        Answer
      </Label>
      <Textarea {...args} id="story-textarea-default" />
    </div>
  ),
}

export const WithDefaultValue: Story = {
  render: (args) => (
    <div className="w-[22.5rem]">
      <Label className="mb-2" htmlFor="story-textarea-prefilled">
        Answer
      </Label>
      <Textarea
        {...args}
        defaultValue="This is a pre-filled answer that demonstrates how the textarea looks with content."
        id="story-textarea-prefilled"
      />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <div className="w-[22.5rem]">
      <Label className="mb-2" htmlFor="story-textarea-disabled">
        Answer
      </Label>
      <Textarea {...args} id="story-textarea-disabled" />
    </div>
  ),
}