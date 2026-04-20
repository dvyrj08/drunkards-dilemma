import React from 'react'
import OptionChip from './OptionChip'

export default function StepCard({
  title,
  options,
  value,
  onChange,
  onRandomize,
  onSkip,
  advancing,
}: {
  title: string
  options: string[]
  value?: string
  onChange: (v: string) => void
  onRandomize: () => void
  onSkip: () => void
  advancing?: boolean
}) {
  return (
    <div className="card space-y-5">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-2xl font-extrabold leading-tight">{title}</h2>
        <div className="flex gap-3 shrink-0 pt-1">
          <button
            className="text-xs text-white/35 hover:text-white/70 transition-colors"
            onClick={onRandomize}
          >
            Random
          </button>
          <button
            className="text-xs text-white/35 hover:text-white/70 transition-colors"
            onClick={onSkip}
          >
            Skip →
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map(opt => (
          <OptionChip
            key={opt}
            label={opt}
            selected={value === opt}
            dimmed={advancing && value !== opt}
            onClick={() => onChange(opt)}
          />
        ))}
      </div>
    </div>
  )
}
