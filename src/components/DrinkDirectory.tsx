import React, { useState, useMemo } from 'react'
import type { Brand } from '../types'
import brandsRaw from '../data/brands.json'
import BrandLogo from './BrandLogo'
import CocktailChips from './CocktailChips'
import { logoPropsFor } from '../lib/logoMap'

const brands = brandsRaw as Brand[]

const catClass: Record<NonNullable<Brand['category']>, string> = {
  whiskey:   'grad-whiskey',
  tennessee: 'grad-whiskey',
  bourbon:   'grad-bourbon',
  scotch:    'grad-scotch',
  vodka:     'grad-vodka',
  gin:       'grad-gin',
  rum:       'grad-rum',
  tequila:   'grad-tequila',
  mezcal:    'grad-mezcal',
  liqueur:   'grad-liqueur',
  cider:     'grad-cider',
  beer:      'grad-beer',
}

const catLabel: Partial<Record<NonNullable<Brand['category']>, string>> = {
  tennessee: 'Tennessee',
}

const strengthOrder = ['light', 'medium', 'strong'] as const
const priceTierOrder = ['budget', 'mid', 'premium'] as const

const allCategories = Array.from(new Set(brands.map(b => b.category))).sort()

export default function DrinkDirectory({ onBack }: { onBack: () => void }) {
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState<string>('all')
  const [filterPrice, setFilterPrice] = useState<string>('all')
  const [filterStrength, setFilterStrength] = useState<string>('all')
  const [selected, setSelected] = useState<Brand | null>(null)

  const filtered = useMemo(() => {
    return brands.filter(b => {
      if (filterCat !== 'all' && b.category !== filterCat) return false
      if (filterPrice !== 'all' && b.priceTier !== filterPrice) return false
      if (filterStrength !== 'all' && b.strength !== filterStrength) return false
      if (search && !b.displayName.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [search, filterCat, filterPrice, filterStrength])

  if (selected) {
    const lp = logoPropsFor(selected.id)
    const grad = catClass[selected.category]
    return (
      <div className="space-y-4">
        <button
          className="btn text-sm text-white bg-black/40 backdrop-blur-sm border border-white/20 hover:bg-black/60 transition-colors"
          onClick={() => setSelected(null)}
        >
          ← Back to Directory
        </button>
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <div className={`${grad} px-5 pt-8 pb-6 flex flex-col items-center text-center gap-3`}>
            <span className="category-pill self-end -mt-4">
              {catLabel[selected.category] ?? selected.category}
            </span>
            <BrandLogo {...lp} name={selected.displayName} size={96} className="logo-chip shadow-2xl" />
            <div>
              <h2 className="text-2xl font-extrabold drop-shadow-sm">{selected.displayName}</h2>
              <p className="text-white/70 text-sm mt-1">{selected.abv}% ABV</p>
            </div>
          </div>
          <div className="card !rounded-t-none space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Price</p>
                <p className="font-semibold capitalize">{selected.priceTier}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Strength</p>
                <p className="font-semibold capitalize">{selected.strength}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-xs text-white/50 uppercase tracking-widest mb-2">Flavor Notes</p>
              <div className="flex flex-wrap gap-2">
                {selected.flavorNotes.map(f => (
                  <span key={f} className="chip text-sm capitalize">{f}</span>
                ))}
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-xs text-white/50 uppercase tracking-widest mb-2">Vibe</p>
              <div className="flex flex-wrap gap-2">
                {selected.vibeTags.map(v => (
                  <span key={v} className="chip text-sm capitalize">{v}</span>
                ))}
              </div>
            </div>
            {selected.mixers.length > 0 && (
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-xs text-white/50 uppercase tracking-widest mb-2">Mixers</p>
                <div className="flex flex-wrap gap-2">
                  {selected.mixers.map(m => (
                    <span key={m} className="chip text-sm">{m}</span>
                  ))}
                </div>
              </div>
            )}
            {selected.cocktails.length > 0 && (
              <CocktailChips cocktails={selected.cocktails} />
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          className="btn text-sm text-white bg-black/40 backdrop-blur-sm border border-white/20 hover:bg-black/60 transition-colors"
          onClick={onBack}
        >
          ← Back
        </button>
        <h2 className="text-xl font-extrabold">All Drinks</h2>
        <span className="text-white/70 text-sm">{filtered.length} of {brands.length}</span>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search brands…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full bg-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/50 outline-none focus:bg-white/20 transition-colors"
      />

      {/* Category filter */}
      <div>
        <p className="text-xs text-white/70 uppercase tracking-widest mb-2">Category</p>
        <div className="flex flex-wrap gap-2">
          <button
            className={`chip text-sm ${filterCat === 'all' ? 'bg-white/25' : ''}`}
            onClick={() => setFilterCat('all')}
          >
            All
          </button>
          {allCategories.map(cat => (
            <button
              key={cat}
              className={`chip text-sm capitalize ${filterCat === cat ? 'bg-white/25' : ''}`}
              onClick={() => setFilterCat(cat)}
            >
              {catLabel[cat as Brand['category']] ?? cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price + Strength filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <p className="text-xs text-white/70 uppercase tracking-widest mb-2">Price</p>
          <div className="flex flex-wrap gap-2">
            <button
              className={`chip text-sm ${filterPrice === 'all' ? 'bg-white/25' : ''}`}
              onClick={() => setFilterPrice('all')}
            >
              All
            </button>
            {priceTierOrder.map(tier => (
              <button
                key={tier}
                className={`chip text-sm capitalize ${filterPrice === tier ? 'bg-white/25' : ''}`}
                onClick={() => setFilterPrice(tier)}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <p className="text-xs text-white/70 uppercase tracking-widest mb-2">Strength</p>
          <div className="flex flex-wrap gap-2">
            <button
              className={`chip text-sm ${filterStrength === 'all' ? 'bg-white/25' : ''}`}
              onClick={() => setFilterStrength('all')}
            >
              All
            </button>
            {strengthOrder.map(s => (
              <button
                key={s}
                className={`chip text-sm capitalize ${filterStrength === s ? 'bg-white/25' : ''}`}
                onClick={() => setFilterStrength(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-white/40 text-center py-8">No brands match your filters.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filtered.map(brand => {
            const lp = logoPropsFor(brand.id)
            const grad = catClass[brand.category]
            return (
              <button
                key={brand.id}
                className="rounded-2xl overflow-hidden text-left hover:scale-[1.02] transition-transform active:scale-[0.98]"
                onClick={() => setSelected(brand)}
              >
                <div className={`${grad} px-3 pt-4 pb-3 flex flex-col items-center text-center gap-2`}>
                  <BrandLogo {...lp} name={brand.displayName} size={56} className="logo-chip shadow-lg" />
                  <p className="text-sm font-bold leading-tight line-clamp-2">{brand.displayName}</p>
                </div>
                <div className="bg-white/5 px-3 py-2 space-y-1">
                  <span className="text-xs text-white/50 capitalize">
                    {catLabel[brand.category] ?? brand.category}
                  </span>
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span>{brand.abv}% ABV</span>
                    <span className="capitalize">{brand.priceTier}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {['light', 'medium', 'strong'].map(s => (
                      <span
                        key={s}
                        className={`h-1 flex-1 rounded-full ${
                          brand.strength === 'light' && s === 'light' ? 'bg-white/60' :
                          brand.strength === 'medium' && (s === 'light' || s === 'medium') ? 'bg-white/60' :
                          brand.strength === 'strong' ? 'bg-white/60' :
                          'bg-white/15'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
