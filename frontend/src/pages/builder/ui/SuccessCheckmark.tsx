interface SuccessCheckmarkProps {
  size?: number
  className?: string
}

export function SuccessCheckmark({ size = 48, className }: SuccessCheckmarkProps) {
  return (
    <svg
      className={className}
      style={{ width: size, height: size }}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="animate-circle"
        cx="26"
        cy="26"
        r="24"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
      <path
        className="animate-check"
        d="M14 27l8 8 16-16"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
