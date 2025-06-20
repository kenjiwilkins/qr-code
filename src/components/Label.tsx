import type { ReactNode } from 'react'

interface LabelProps {
  children: ReactNode
  htmlFor?: string
}

export default function Label({ children, htmlFor }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-green-300 font-mono text-sm block mb-2"
    >
      {children}
    </label>
  )
}
