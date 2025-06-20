import type { ReactNode, ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        'bg-green-600/20 hover:bg-green-600/30 border border-green-500/50 rounded px-4 py-2 text-green-300 font-mono text-sm focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400/30 cursor-pointer transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
