import * as React from 'react'
import { cn } from '@/core/utils/utils'

interface ColorOption {
  label: string
  value: string
}

interface ColorPickerProps {
  colors: ColorOption[]
  value: string
  onChange: (color: string) => void
  className?: string
}

export function ColorPicker({
  colors,
  value,
  onChange,
  className
}: ColorPickerProps) {
  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {colors.map(color => (
        <button
          key={color.value}
          type="button"
          className={cn(
            "w-5 h-5 rounded-full border border-gray-300 transition-transform", 
            value === color.value && "ring-2 ring-offset-1 ring-primary-main scale-110"
          )}
          style={{ backgroundColor: color.value }}
          onClick={() => onChange(color.value)}
          title={color.label}
        />
      ))}
    </div>
  )
}

export default ColorPicker