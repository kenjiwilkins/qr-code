import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
}

export default function Card({ children }: CardProps) {
  return (
    <div className={`bg-black/80 border border-green-500/30 rounded-lg p-6`}>
      {children}
    </div>
  )
}
