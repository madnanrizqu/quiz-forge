import { useState } from 'react'
import { Input, Label } from '@/shared/ui'

export interface BuilderQuestionPromptProps {
  value?: string
  onChange?: (value: string) => void
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
}

export function BuilderQuestionPrompt({
  value,
  onChange,
  defaultValue = '',
  placeholder = 'Enter your question here...',
  disabled,
}: BuilderQuestionPromptProps) {
  const isControlled = value !== undefined && onChange !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)

  const currentValue = isControlled ? value : internalValue
  const handleChange = (newValue: string) => {
    if (isControlled) {
      onChange(newValue)
    } else {
      setInternalValue(newValue)
    }
  }

  return (
    <div>
      <Label className="block mb-2">Question Prompt</Label>
      <Input
        className="w-full bg-surface-container-low border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/40 text-on-surface font-medium"
        placeholder={placeholder}
        value={currentValue}
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  )
}
