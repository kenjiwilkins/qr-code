import type { ReactNode } from 'react'

interface TabsTriggerProps {
  children: ReactNode
  value: string
}

export default function TabsTrigger({ children, value }: TabsTriggerProps) {
  return (
    <button
      className="flex-1 px-3 py-2 text-sm font-mono text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded transition-colors"
      data-value={value}
    >
      {children}
    </button>
  )
}
