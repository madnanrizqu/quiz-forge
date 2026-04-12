interface CodeBlockProps {
  code: string
}

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <div className="bg-surface-container-low p-4 rounded-xl font-mono text-sm text-primary border border-primary-fixed/30 overflow-x-auto">
      <pre className="m-0">{code}</pre>
    </div>
  )
}
