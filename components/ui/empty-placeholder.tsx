import type { ReactNode } from "react"

interface EmptyPlaceholderProps {
  icon?: ReactNode
  title: string
  description: string
  children?: ReactNode
}

export function EmptyPlaceholder({ icon, title, description, children }: EmptyPlaceholderProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        {icon && <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">{icon}</div>}
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mt-2 mb-4 text-sm text-muted-foreground">{description}</p>
        {children}
      </div>
    </div>
  )
}
