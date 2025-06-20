import type { ReactNode } from 'react'

interface CardTitleProps {
  children: ReactNode
}

export default function CardTitle({ children }: CardTitleProps) {
  return <h3 className={'text-green-300 font-mono'}>{children}</h3>
}
