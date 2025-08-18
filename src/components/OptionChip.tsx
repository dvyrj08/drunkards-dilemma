import React from 'react'

export default function OptionChip({
  label, selected, onClick
}: { label: string; selected?: boolean; onClick?: () => void }) {
  return (
    <button
      className={`chip ${selected ? 'chip-selected' : ''}`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  )
}
