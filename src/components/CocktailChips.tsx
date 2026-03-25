import React from 'react'

export default function CocktailChips({ cocktails }: { cocktails: string[] }) {
  if (!cocktails?.length) return null

  return (
    <div className="space-y-2">
      <p className="text-xs text-white/50 uppercase tracking-widest">Try it as</p>
      <div className="flex flex-wrap gap-2">
        {cocktails.map(name => (
          <span key={name} className="chip text-sm">
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}
