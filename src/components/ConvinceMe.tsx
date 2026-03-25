import React, { useState } from 'react'
import BrandLogo from './BrandLogo'
import { logoPropsFor } from '../lib/logoMap'
import type { Brand } from '../types'

const PRICE: Record<Brand['priceTier'], string> = {
  budget: '$',
  mid: '$$',
  premium: '$$$',
}

const CAT_LABEL: Partial<Record<Brand['category'], string>> = {
  tennessee: 'Tennessee Whiskey',
}

export default function ConvinceMe({ brand }: { brand: Brand }) {
  const [open, setOpen] = useState(false)
  const lp = logoPropsFor(brand.id)

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label={open ? 'Hide details' : 'Tap for details'}
        className="hover:opacity-80 transition-opacity relative"
      >
        <BrandLogo {...lp} name={brand.displayName} size={110} className="logo-chip shadow-2xl" />
        <span className="absolute -bottom-1 -right-1 text-xs bg-white/10 rounded-full px-1.5 py-0.5 text-white/50">
          {open ? '▲' : 'ℹ'}
        </span>
      </button>

      {open && (
        <div className="w-full bg-black/25 rounded-xl p-4 space-y-3 text-sm text-left">
          <div className="flex justify-between items-center">
            <span className="text-white/50">ABV</span>
            <span className="font-semibold">{brand.abv}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/50">Price</span>
            <span className="font-semibold">{PRICE[brand.priceTier]}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/50">Style</span>
            <span className="font-semibold capitalize">{CAT_LABEL[brand.category] ?? brand.category}</span>
          </div>
          <div>
            <p className="text-white/50 mb-1">Flavor Notes</p>
            <p className="font-medium capitalize">{brand.flavorNotes.join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  )
}
