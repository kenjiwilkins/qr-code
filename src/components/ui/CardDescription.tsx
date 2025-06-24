import type { ReactNode } from 'react'

interface CardDescriptionProps {
  children: ReactNode
}

export default function CardDescription({ children }: CardDescriptionProps) {
  return <p className="text-green-500/70 font-mono text-sm">{children}</p>
}
