import React from 'react'
import type { QuickPickMood } from '../types'

const MOODS: { value: QuickPickMood; emoji: string; label: string }[] = [
  { value: 'radiant',     emoji: '☀️',  label: 'Radiant' },
  { value: 'chill',       emoji: '🧊',  label: 'Chill' },
  { value: 'spicy',       emoji: '🌶️', label: 'Spicy' },
  { value: 'savage',      emoji: '💀',  label: 'Savage' },
  { value: 'classy',      emoji: '🎩',  label: 'Classy' },
  { value: 'adventurous', emoji: '🧭',  label: 'Adventurous' },
  { value: 'melancholy',  emoji: '🌧️', label: 'Melancholy' },
]

export default function QuickPick({ onPick }: { onPick: (mood: QuickPickMood) => void }) {
  return (
    <div className="card space-y-3">
      <p className="text-xs text-white/40 uppercase tracking-widest">Feeling lucky? Pick a vibe and skip the quiz</p>
      <div className="flex flex-wrap gap-2">
        {MOODS.map(m => (
          <button
            key={m.value}
            className="chip flex items-center gap-1.5"
            onClick={() => onPick(m.value)}
          >
            <span>{m.emoji}</span>
            <span>{m.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
