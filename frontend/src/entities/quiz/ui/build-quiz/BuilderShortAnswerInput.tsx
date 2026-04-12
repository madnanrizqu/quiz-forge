import { Input, Label } from '@/shared/ui'

export interface BuilderShortAnswerInputProps {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
}

export function BuilderShortAnswerInput({
  value,
  onChange,
  disabled,
}: BuilderShortAnswerInputProps) {
  return (
    <div>
      <Label className="block mb-2">Correct Answer</Label>
      <Input
        className="w-full bg-surface-container-low border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/40 text-on-surface"
        placeholder="Type the literal answer here..."
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
      />
    </div>
  )
}
