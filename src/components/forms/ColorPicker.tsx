import { useState } from 'react'
import { ChromePicker } from 'react-color'

interface ColorPickerProps {
  color?: string
  onChange?: (color: string) => void
}

export default function ColorPicker({
  color = '#ffffff',
  onChange,
}: ColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false)

  const handleClick = () => {
    setShowPicker(!showPicker)
  }
  const handleClose = () => {
    setShowPicker(false)
  }

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="bg-black/50 hover:bg-white/10 border border-green-500/30 rounded px-3 py-2 text-green-300 font-mono text-sm focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400/30 cursor-pointer"
      >
        {'> Pick_Color'}
      </button>
      {showPicker && (
        <div className="absolute top-full left-0 z-50 mt-2">
          <div className="fixed inset-0" onClick={handleClose} />
          <ChromePicker
            color={color}
            onChangeComplete={colorResult => {
              if (onChange) {
                onChange(colorResult.hex)
              }
            }}
            className="bg-black/50 border border-green-500/30 rounded shadow-lg"
          />
        </div>
      )}
    </div>
  )
}
