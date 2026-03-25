import React from 'react'
import type { Brand } from '../types'

export default function DrinkRecipe({ brand, mixer }: { brand: Brand; mixer: string }) {
  const oz = brand.strength === 'light' ? '1.5oz' : brand.strength === 'strong' ? '2.5oz' : '2oz'
  const recipe = `${oz} ${brand.displayName} + ${mixer}, over ice`

  return (
    <div className="bg-white/5 rounded-xl p-4 space-y-1">
      <p className="text-xs text-white/50 uppercase tracking-widest">Recipe</p>
      <p className="text-base font-semibold">{recipe}</p>
    </div>
  )
}
