import React from 'react'
import OptionChip from './OptionChip'

export default function StepCard({
  title,
  options,
  value,
  onChange,
  onRandomize,
  onSkip
}: {
  title: string
  options: string[]
  value?: string
  onChange: (v: string)=>void
  onRandomize: ()=>void
  onSkip: ()=>void
}) {
  return (
    <div className="card space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <button className="chip" onClick={onRandomize}>Randomize</button>
          <button className="chip" onClick={onSkip}>Skip</button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map(opt => (
          <OptionChip
            key={opt}
            label={opt}
            selected={value === opt}
            onClick={()=> onChange(opt)}
          />
        ))}
      </div>
    </div>
  )
}
