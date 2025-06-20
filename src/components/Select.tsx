import type { ChangeEvent } from 'react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  initialValue?: string
  options: SelectOption[]
  onChange?: (value: string) => void
}

export default function Select({
  initialValue,
  options,
  onChange,
}: SelectProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <select
      value={initialValue || ''}
      onChange={handleChange}
      className="w-full bg-black/50 border border-green-500/30 rounded px-3 py-2 text-green-300 font-mono text-sm focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400/30 cursor-pointer"
    >
      {options.map(option => (
        <option
          key={option.value}
          value={option.value}
          className="bg-black text-green-300"
        >
          {option.label}
        </option>
      ))}
    </select>
  )
}
