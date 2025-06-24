import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface CardContentProps {
  children: ReactNode
  className?: string
}

export default function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={twMerge('space-y-4 pt-6 p-4', className)}>{children}</div>
  )
}
