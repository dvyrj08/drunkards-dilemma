import React from 'react'

export default function QuickPick({ onSkip }: { onSkip: () => void }) {
  return (
    <div className="flex justify-end">
      <button className="text-xs text-white/80 hover:text-white transition-colors" onClick={onSkip}>
        Skip the quiz →
      </button>
    </div>
  )
}
