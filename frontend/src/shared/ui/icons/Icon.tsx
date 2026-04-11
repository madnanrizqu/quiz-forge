import { cx } from '@/shared/lib'
import { chevronDown } from './svgs/chevronDown'

type IconSize = 'sm' | 'md' | 'lg'

const sizeMap: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
}

const iconRegistry = {
  'mi:add': { kind: 'material' as const, name: 'add' },
  'mi:delete': { kind: 'material' as const, name: 'delete' },
  'mi:add_circle': { kind: 'material' as const, name: 'add_circle' },
  'mi:edit_note': { kind: 'material' as const, name: 'edit_note' },
  'mi:play_circle': { kind: 'material' as const, name: 'play_circle' },
  'mi:fingerprint': { kind: 'material' as const, name: 'fingerprint' },
  'mi:arrow_forward': { kind: 'material' as const, name: 'arrow_forward' },
  'mi:arrow_back': { kind: 'material' as const, name: 'arrow_back' },
  'mi:timer': { kind: 'material' as const, name: 'timer' },
  'mi:architecture': { kind: 'material' as const, name: 'architecture' },
  'mi:construction': { kind: 'material' as const, name: 'construction' },
  'mi:emoji_events': { kind: 'material' as const, name: 'emoji_events' },
  'mi:check_circle': { kind: 'material' as const, name: 'check_circle' },
  'mi:cancel': { kind: 'material' as const, name: 'cancel' },
  'svg:chevron_down': { kind: 'svg' as const, ...chevronDown },
}

export type IconName = keyof typeof iconRegistry

export interface IconProps {
  name: IconName
  size?: IconSize | number
  className?: string
  color?: string
}

export function Icon({ name, size = 'md', className, color }: IconProps) {
  const pixelSize = typeof size === 'number' ? size : sizeMap[size]
  const entry = iconRegistry[name]

  if (entry.kind === 'material') {
    return (
      <span
        className={cx('material-symbols-outlined', className)}
        style={{
          fontSize: pixelSize,
          lineHeight: 1,
          color,
        }}
      >
        {entry.name}
      </span>
    )
  }

  return (
    <svg
      className={cx('fill-current', className)}
      style={{ width: pixelSize, height: pixelSize, color }}
      viewBox={entry.viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={entry.path} />
    </svg>
  )
}
