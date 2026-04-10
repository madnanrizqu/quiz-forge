export interface AppShellProps {
  children: React.ReactNode
  header: React.ReactNode
  mobileNav?: React.ReactNode
}

export function AppShell({ children, header, mobileNav }: AppShellProps) {
  return (
    <div className="min-h-screen bg-surface-base text-on-surface">
      {header}

      {children}

      {mobileNav}
    </div>
  )
}
