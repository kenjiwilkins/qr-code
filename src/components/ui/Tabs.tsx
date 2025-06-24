import type { ReactNode } from 'react'

interface TabsProps {
  children: ReactNode
  defaultValue?: string
}

export default function Tabs({ children, defaultValue }: TabsProps) {
  return <div data-default-value={defaultValue}>{children}</div>
}
