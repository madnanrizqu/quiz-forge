import type { Meta, StoryObj } from '@storybook/react-vite'

import { Radio } from './Radio'

const meta = {
  title: 'Design System/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    name: 'story-radio',
  },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2 cursor-pointer">
        <Radio {...args} value="option-a" />
        Option A
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <Radio {...args} value="option-b" />
        Option B
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <Radio {...args} value="option-c" />
        Option C
      </label>
    </div>
  ),
}

export const Checked: Story = {
  args: {
    defaultChecked: true,
    value: 'option-a',
  },
  render: (args) => (
    <label className="flex items-center gap-2 cursor-pointer">
      <Radio {...args} />
      Selected option
    </label>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2 cursor-not-allowed opacity-50">
        <Radio {...args} value="disabled-unchecked" />
        Disabled unchecked
      </label>
      <label className="flex items-center gap-2 cursor-not-allowed opacity-50">
        <Radio {...args} value="disabled-checked" defaultChecked />
        Disabled checked
      </label>
    </div>
  ),
}
