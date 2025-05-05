'use client'

import { Input } from "@/components/ui/input"

interface QuantityInputProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export function QuantityInput({
  value,
  min = 1,
  max = 99,
  onChange,
}: QuantityInputProps) {

  const updateQuantity = (newValue: number) => {
    const clamped = Math.max(min, Math.min(max, newValue))
    onChange(clamped)
  }

  return (
    <div className="flex items-center">
      <Input
        type="number"
        value={value}
        onChange={(e) => updateQuantity(Number(e.target.value))}
        className="w-16 text-center bg-[var(--color-white)] border border-gray-300 rounded-md py-1 pl-2 pr-1"
        min={min}
        max={max}
      />
    </div>
  )
}
