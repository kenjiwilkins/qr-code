import type { ChangeEvent } from 'react'

interface TextAreaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'onChange' | 'value'
  > {
  value?: string
  onChange?: (value: string) => void
}

export default function TextArea({
  value,
  onChange,
  rows = 4,
  ...props
}: TextAreaProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <textarea
      value={value || ''}
      onChange={handleChange}
      rows={rows}
      className="w-full bg-black/50 border border-green-500/30 rounded px-3 py-2 text-green-300 font-mono text-sm focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400/30 resize-none"
      {...props}
    />
  )
}
