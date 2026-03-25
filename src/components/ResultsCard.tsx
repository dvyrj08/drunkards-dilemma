import React, { useState } from 'react'
import type { Brand } from '../types'
import BrandLogo from './BrandLogo'
import { logoPropsFor } from '../lib/logoMap'

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
  tennessee: 'Tennessee Whiskey',
}

export default function ResultsCard({
  brand, mixer, rationale, onRetake, alts, confidence
}: {
  brand?: Brand
  mixer: string
  rationale: string
  onRetake: () => void
  alts: Brand[]
  confidence: number
}) {
  const grad = brand ? catClass[brand.category] : 'bg-white/10'
  const [copied, setCopied] = useState(false)

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg">
      {/* ── Hero: big centered brand logo + name + tagline ── */}
      <div className={`${grad} px-5 pt-8 pb-6 flex flex-col items-center text-center gap-3`}>
        {brand?.category && (
          <span className="category-pill self-end -mt-4">{catLabel[brand.category] ?? brand.category}</span>
        )}
        <BrandLogo
          {...logoPropsFor(brand?.id)}
          name={brand?.displayName || ''}
          size={110}
          className="logo-chip shadow-2xl"
        />
        <div>
          <h2 className="text-3xl font-extrabold drop-shadow-sm">{brand?.displayName || 'No Match Found'}</h2>
          <p className="text-white/85 text-sm mt-1 max-w-xs mx-auto">{rationale}</p>
        </div>
      </div>

      {/* ── Details ── */}
      <div className="card !rounded-t-none space-y-4">
        <div className="bg-white/5 rounded-xl p-4">
          <p className="text-sm text-white/60">Mixer</p>
          <p className="text-lg font-semibold">{mixer}</p>
        </div>

        {alts.length > 0 && (
          <div>
            <p className="text-sm text-white/60 mb-2">{confidence < 40 ? 'Close race — worth exploring:' : 'Want something different?'}</p>
            <div className="flex flex-wrap gap-2">
              {alts.map(a => {
                const lp = logoPropsFor(a.id)
                return (
                  <span key={a.id} className="chip flex items-center gap-2">
                    <BrandLogo {...lp} name={a.displayName} size={26} className="flex-shrink-0" />
                    {a.displayName}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button className="btn btn-primary" onClick={onRetake}>Retake</button>
          <button
            className="btn"
            onClick={async () => {
              const text = `${brand?.displayName} + ${mixer} — via Drunkard's Dilemma`
              try {
                await navigator.clipboard.writeText(text)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              } catch {
                setCopied(false)
                alert('Copy failed — your browser blocked clipboard access.')
              }
            }}
          >
            {copied ? 'Copied!' : 'Share'}
          </button>
        </div>
      </div>
    </div>
  )
}
