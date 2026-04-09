import type { Meta, StoryObj } from '@storybook/react-vite'

import { Icon } from './Icon'

const meta = {
  title: 'Design System/Icons',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'mi:add',
        'mi:delete',
        'mi:add_circle',
        'mi:edit_note',
        'mi:play_circle',
        'svg:chevron_down',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    size: 'md',
    name: 'mi:add',
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const MaterialAdd: Story = {
  name: 'Material/Add',
  args: {
    name: 'mi:add',
  },
}

export const MaterialDelete: Story = {
  name: 'Material/Delete',
  args: {
    name: 'mi:delete',
  },
}

export const MaterialAddCircle: Story = {
  name: 'Material/AddCircle',
  args: {
    name: 'mi:add_circle',
  },
}

export const MaterialEditNote: Story = {
  name: 'Material/EditNote',
  args: {
    name: 'mi:edit_note',
  },
}

export const MaterialPlayCircle: Story = {
  name: 'Material/PlayCircle',
  args: {
    name: 'mi:play_circle',
  },
}

export const SvgChevronDown: Story = {
  name: 'SVG/ChevronDown',
  args: {
    name: 'svg:chevron_down',
  },
}

export const AllIcons: Story = {
  args: {
    name: 'mi:add',
  },
  render: () => (
    <div className="flex flex-wrap gap-8">
      <div className="flex flex-col items-center gap-2">
        <Icon name="mi:add" size="lg" />
        <span className="text-xs text-on-surface-variant">mi:add</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="mi:delete" size="lg" />
        <span className="text-xs text-on-surface-variant">mi:delete</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="mi:add_circle" size="lg" />
        <span className="text-xs text-on-surface-variant">mi:add_circle</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="mi:edit_note" size="lg" />
        <span className="text-xs text-on-surface-variant">mi:edit_note</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="mi:play_circle" size="lg" />
        <span className="text-xs text-on-surface-variant">mi:play_circle</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="svg:chevron_down" size="lg" />
        <span className="text-xs text-on-surface-variant">svg:chevron_down</span>
      </div>
    </div>
  ),
}

export const SizeVariants: Story = {
  args: {
    name: 'mi:add',
  },
  render: () => (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-2">
        <Icon name="mi:add" size="sm" />
        <span className="text-xs text-on-surface-variant">sm (16px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="mi:add" size="md" />
        <span className="text-xs text-on-surface-variant">md (20px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="mi:add" size="lg" />
        <span className="text-xs text-on-surface-variant">lg (24px)</span>
      </div>
    </div>
  ),
}
