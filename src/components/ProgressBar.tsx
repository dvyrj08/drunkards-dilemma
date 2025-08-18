import React from 'react'

export default function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step/total)*100)
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-white/70 mb-1">
        <span>Step {step} / {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-white" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
