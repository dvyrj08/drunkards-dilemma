import React from 'react'

const EMOJI: Record<string, string> = {
  // mood
  radiant: '☀️', chill: '🧊', spicy: '🌶️', savage: '💀', classy: '🎩', adventurous: '🧭', melancholy: '🌧️',
  // place
  home: '🏠', bar: '🥃', club: '🕺', restaurant: '🍽️', "friend's place": '🛋️', outdoors: '🌿',
  // occasion
  'solo unwind': '🎧', 'date night': '🕯️', 'house party': '🎉', 'game night': '🎲', celebration: '🥂', 'pre-game': '⚡',
  // weather
  hot: '🔥', warm: '🌤️', cool: '🌬️', cold: '🌨️', rainy: '🌧️', snowy: '❄️', any: '🌀',
  // flavor
  'crisp/clean': '🫧', citrusy: '🍋', sweet: '🍯', smoky: '🌫️', 'herbal/botanical': '🌿', malty: '🌾', 'oaky/vanilla': '🪵',
  // strength
  light: '🪶', medium: '⚖️', strong: '💥',
  // budget
  budget: '💸', mid: '🎯', premium: '💎',
  // mixer
  bubbly: '🫧', citrus: '🍋', cola: '🥤', tonic: '💧', ginger: '🫚', none: '🖤',
}

export default function OptionChip({
  label, selected, onClick
}: { label: string; selected?: boolean; onClick?: () => void }) {
  const emoji = EMOJI[label]
  return (
    <button
      className={`chip ${selected ? 'chip-selected' : ''}`}
      onClick={onClick}
      type="button"
      aria-pressed={selected}
    >
      {emoji && <span className="text-base leading-none">{emoji}</span>}
      <span>{label}</span>
    </button>
  )
}
