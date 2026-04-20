import React from 'react'

export default function OptionChip({
  label, selected, dimmed, onClick
}: { label: string; selected?: boolean; dimmed?: boolean; onClick?: () => void }) {
  return (
    <button
      className={`chip ${selected ? 'chip-selected' : ''}`}
      style={{ opacity: dimmed ? 0.45 : 1, transition: 'opacity 0.15s, transform 0.15s' }}
      onClick={onClick}
      type="button"
      aria-pressed={selected}
    >
      <span>{label}</span>
    </button>
  )
}
