import React from 'react'
import type { Brand } from '../types'
import BrandLogo from './BrandLogo'
import { logoPropsFor } from '../lib/logoMap'

const catClass: Record<NonNullable<Brand['category']>, string> = {
  whiskey: 'grad-whiskey',
  bourbon: 'grad-bourbon',
  scotch:  'grad-scotch',
  vodka:   'grad-vodka',
  gin:     'grad-gin',
  rum:     'grad-rum',
  tequila: 'grad-tequila',
  mezcal:  'grad-mezcal',
  liqueur: 'grad-liqueur',
  cider:   'grad-cider',
  beer:    'grad-beer',
}

export default function ResultsCard({
  brand, mixer, rationale, onRetake, alts
}: {
  brand?: Brand
  mixer: string
  rationale: string
  onRetake: ()=>void
  alts: Brand[]
}) {
  const grad = brand ? catClass[brand.category] : 'bg-white/10'
  return (
    <div className={`rounded-2xl overflow-hidden shadow-lg`}>
      <div className={`p-5 ${grad}`}>
        <div className="flex items-start justify-between">
          <div className="brand-lockup">
       <BrandLogo
  {...logoPropsFor(brand?.id, brand?.displayName)}
  name={brand?.displayName || ''}
  size={64}
  className="logo-chip"
  priority="simple"
/>

            <div>
              <h2 className="text-2xl font-extrabold drop-shadow-sm">{brand?.displayName || 'No Match Found'}</h2>
              <p className="text-white/90">{rationale}</p>
            </div>
          </div>
          {brand?.category && (
            <span className="category-pill">{brand.category}</span>
          )}
        </div>
      </div>

      <div className="card !rounded-t-none space-y-4">
        <div className="bg-white/5 rounded-xl p-4">
          <p className="text-sm text-white/80">Mixer</p>
          <p className="text-lg font-semibold">{mixer}</p>
        </div>

        {alts.length > 0 && (
          <div>
            <p className="text-sm text-white/80 mb-2">Also try</p>
            <div className="flex flex-wrap gap-2">
              {alts.map(a => { const lp = logoPropsFor(a.id, a.displayName); return (
                <span key={a.id} className="chip flex items-center gap-2">
                  <BrandLogo {...lp} name={a.displayName} size={18} />
                  {a.displayName}
                </span>
              )})}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button className="btn btn-primary" onClick={onRetake}>Retake</button>
          <button
            className="btn"
            onClick={()=>{
              const text = `${brand?.displayName} + ${mixer} — via Drunkard's Dilemma`
              navigator.clipboard.writeText(text)
            }}
          >Share</button>
        </div>

        <p className="text-xs text-white/60 pt-2">18+/21+ only. Please drink responsibly.</p>
      </div>
    </div>
  )
}
