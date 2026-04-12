import type { Meta, StoryObj } from '@storybook/react-vite'

import { Select } from './Select'
import { Label } from './Label'

const meta = {
  title: 'Design System/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: (
      <>
        <option value="">Choose an option</option>
        <option value="option-a">Option A</option>
        <option value="option-b">Option B</option>
        <option value="option-c">Option C</option>
      </>
    ),
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="w-[22.5rem]">
      <Label className="mb-2" htmlFor="story-select-default">
        Select an option
      </Label>
      <Select {...args} id="story-select-default" />
    </div>
  ),
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'option-b',
  },
  render: (args) => (
    <div className="w-[22.5rem]">
      <Label className="mb-2" htmlFor="story-select-prefilled">
        Select an option
      </Label>
      <Select {...args} id="story-select-prefilled" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <div className="w-[22.5rem]">
      <Label className="mb-2" htmlFor="story-select-disabled">
        Select an option
      </Label>
      <Select {...args} id="story-select-disabled" />
    </div>
  ),
}
