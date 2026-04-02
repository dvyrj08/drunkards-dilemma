import React from 'react'

const MILESTONES = [
  'Warming up…',
  'Getting somewhere…',
  'Dialing in…',
  'Halfway there.',
  'Narrowing it down…',
  'Almost got you.',
  'Last stretch…',
  'Final call.',
]

export default function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100)
  const label = MILESTONES[step - 1] ?? `Step ${step}`
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-white/80">{label}</span>
        <span className="text-xs text-white/75">{step} / {total}</span>
      </div>
      <div
        className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Quiz progress: ${label}`}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, background: 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))' }}
        />
      </div>
    </div>
  )
}
