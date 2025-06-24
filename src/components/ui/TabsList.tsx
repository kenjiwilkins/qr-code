import type { ReactNode } from 'react'

interface TabsListProps {
  children: ReactNode
}

export default function TabsList({ children }: TabsListProps) {
  return (
    <div className="flex bg-green-900/20 border border-green-500/30 rounded-md p-1">
      {children}
    </div>
  )
}
