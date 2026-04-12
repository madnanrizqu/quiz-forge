import { useState } from 'react'
import { Icon, Textarea } from '@/shared/ui'

export interface CodeSnippetInputProps {
  value?: string
  onChange?: (value: string) => void
  defaultValue?: string
  defaultVisible?: boolean
  className?: string
}

export function CodeSnippetInput({
  value,
  onChange,
  defaultValue = '',
  defaultVisible = false,
  className,
}: CodeSnippetInputProps) {
  const isControlled = value !== undefined && onChange !== undefined
  const [internalVisible, setInternalVisible] = useState(defaultVisible)
  const [internalValue, setInternalValue] = useState(defaultValue)

  const currentValue = isControlled ? value : internalValue
  const handleChange = (newValue: string) => {
    if (isControlled) {
      onChange(newValue)
    } else {
      setInternalValue(newValue)
    }
  }

  const handleDelete = () => {
    handleChange('')
    setInternalVisible(false)
  }

  if (!internalVisible && !currentValue) {
    return (
      <button
        onClick={() => setInternalVisible(true)}
        className="flex items-center gap-2 text-primary font-medium text-body-standard mb-3 transition-all duration-300 hover:-translate-y-px cursor-pointer"
      >
        <Icon name="mi:code_blocks" size={18} aria-hidden="true" />
        Add Code Snippet
      </button>
    )
  }

  return (
    <div className={`code-snippet-container ${className ?? ''}`}>
      <div className="relative">
        <Textarea
          value={currentValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Paste or type your code snippet here..."
          className="w-full h-14 bg-surface-container-lowest border-none rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-primary/40 font-mono text-sm text-on-surface-variant placeholder:text-outline-variant outline outline-[1px] outline-ghost-border"
        />
        <button
          onClick={handleDelete}
          aria-label="Delete code snippet"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-error transition-colors cursor-pointer"
        >
          <Icon name="mi:delete" size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}