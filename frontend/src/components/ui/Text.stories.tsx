import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from './Text'

const meta = {
  title: 'Design System/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const TypographyScale: Story = {
  render: () => (
    <div className="space-y-3">
      <Text variant="display-h1">Display/H1 - Architectural clarity</Text>
      <Text variant="headline-h2">Headline/H2 - System section heading</Text>
      <Text variant="title-large">Title/Body Large - Featured content</Text>
      <Text variant="body-standard">
        Body/Standard - General UI text and descriptions.
      </Text>
      <Text variant="label-small">Label/Small - Metadata token</Text>
      <Text variant="micro">Micro - Code annotation reference</Text>
    </div>
  ),
}

export const AsChildHeading: Story = {
  render: () => (
    <Text asChild tone="on-surface" variant="display-h1">
      <h1 className="m-0">Polymorphic heading via asChild</h1>
    </Text>
  ),
}

export const AsChildLink: Story = {
  render: () => (
    <Text asChild tone="primary" variant="body-standard">
      <a className="no-underline" href="/about">
        Read design blueprint
      </a>
    </Text>
  ),
}
