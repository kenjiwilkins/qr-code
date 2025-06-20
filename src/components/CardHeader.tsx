import type { ReactNode } from 'react'

interface CardHeaderProps {
  children: ReactNode
}

export default function CardHeader({ children }: CardHeaderProps) {
  return <div className={`pb-4 border-b border-green-500/20`}>{children}</div>
}
