import React, { useState } from 'react'
import recipesRaw from '../data/cocktailRecipes.json'

type RecipeEntry = {
  ingredients: string[]
  method: string
}

const recipes = recipesRaw as Record<string, RecipeEntry>

export default function CocktailChips({ cocktails }: { cocktails: string[] }) {
  const [openChip, setOpenChip] = useState<string | null>(null)

  if (!cocktails?.length) return null

  const toggle = (name: string) => setOpenChip(prev => (prev === name ? null : name))

  const openRecipe = openChip ? recipes[openChip] : undefined

  return (
    <div className="space-y-2">
      <p className="text-xs text-white/50 uppercase tracking-widest">Try it as</p>
      <div className="flex flex-wrap gap-2">
        {cocktails.map(name => {
          const isOpen = openChip === name
          const hasRecipe = !!recipes[name]
          return (
            <span
              key={name}
              className={`chip text-sm ${hasRecipe ? 'cursor-pointer select-none' : ''}`}
              onClick={hasRecipe ? () => toggle(name) : undefined}
            >
              {name}
              {hasRecipe && (
                <span className="ml-1 text-white/50">{isOpen ? '▾' : '▸'}</span>
              )}
            </span>
          )
        })}
      </div>
      {openChip && openRecipe && (
        <div className="bg-white/5 rounded-xl p-3 mt-2 text-sm space-y-2">
          <p className="font-semibold text-white">{openChip}</p>
          <ul className="space-y-0.5 text-white/75">
            {openRecipe.ingredients.map((ing, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-white/40">•</span>
                <span>{ing}</span>
              </li>
            ))}
          </ul>
          <p className="text-white/60 italic">{openRecipe.method}</p>
        </div>
      )}
    </div>
  )
}
