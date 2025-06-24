import type { ChangeEvent } from 'react'

interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
  > {
  value?: number
  onChange?: (value: number) => void
  placeholder?: string
  min?: number
  max?: number
}

export default function NumberInput({
  value,
  onChange,
  placeholder,
  min,
  max,
}: NumberInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(e.target.value, 10)
    if (!isNaN(numValue) && onChange) {
      onChange(numValue)
    }
  }

  return (
    <input
      type="number"
      value={value || ''}
      onChange={handleChange}
      placeholder={placeholder}
      min={min}
      max={max}
      step={1}
      className="w-full bg-black/50 border border-green-500/30 rounded px-3 py-2 text-green-300 font-mono text-sm focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400/30"
    />
  )
}
