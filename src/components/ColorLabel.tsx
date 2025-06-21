interface ColorLabelProps {
  color: string
}

export default function ColorLabel({ color }: ColorLabelProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-4 h-4 rounded border border-green-500/30"
        style={{ backgroundColor: color }}
      />
      <span className="text-green-300 font-mono text-sm">{color}</span>
    </div>
  )
}
