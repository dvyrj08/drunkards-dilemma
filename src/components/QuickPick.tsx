import React from 'react'

export default function QuickPick({ onSkip }: { onSkip: () => void }) {
  return (
    <div className="flex justify-end">
      <button className="text-xs text-white/35 hover:text-white/60 transition-colors" onClick={onSkip}>
        Skip the quiz →
      </button>
    </div>
  )
}
