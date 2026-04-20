import React from 'react'
import type { Brand } from '../types'

const catGradients: Record<string, string> = {
  whiskey:   'linear-gradient(135deg, #8a4b14, #c87b2f)',
  tennessee: 'linear-gradient(135deg, #8a4b14, #c87b2f)',
  bourbon:   'linear-gradient(135deg, #a15818, #e2a55b)',
  scotch:    'linear-gradient(135deg, #6b512b, #b18a52)',
  vodka:     'linear-gradient(135deg, #3a3f4b, #8a93a6)',
  gin:       'linear-gradient(135deg, #0a6f5a, #4ec8a3)',
  rum:       'linear-gradient(135deg, #4b2c0f, #a16d2b)',
  tequila:   'linear-gradient(135deg, #a1c935, #ffd66b)',
  mezcal:    'linear-gradient(135deg, #2b5b3c, #84a98c)',
  liqueur:   'linear-gradient(135deg, #6a2352, #c77dff)',
  cider:     'linear-gradient(135deg, #5fa42d, #c5e478)',
  beer:      'linear-gradient(135deg, #c58a1e, #ffe08a)',
}

interface StoryCardProps {
  brand: Brand
  mixer: string
  rationale: string
  logoSrc: string
}

// Rendered off-screen at 1080x1920, captured by html2canvas
export default function StoryCard({ brand, mixer, rationale, logoSrc }: StoryCardProps) {
  const catGrad = catGradients[brand.category] ?? 'linear-gradient(135deg, #333, #555)'

  return (
    <div
      id="story-card-root"
      style={{
        position: 'fixed',
        top: '-9999px',
        left: '-9999px',
        width: 1080,
        height: 1920,
        fontFamily: '"DM Sans", -apple-system, sans-serif',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}
    >
      {/* Dither-style background: grid lines + radial glow */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          radial-gradient(ellipse at 50% 45%, rgba(180,20,20,.35) 0%, transparent 60%),
          repeating-linear-gradient(
            0deg, transparent, transparent 3px,
            rgba(220,36,36,.04) 3px, rgba(220,36,36,.04) 4px
          ),
          repeating-linear-gradient(
            90deg, transparent, transparent 3px,
            rgba(220,36,36,.04) 3px, rgba(220,36,36,.04) 4px
          )
        `,
        background: '#0a0808',
      }}/>

      {/* Category color wash — top half */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '52%',
        background: catGrad,
        opacity: 0.22,
      }}/>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, transparent 35%, rgba(0,0,0,.85) 100%)',
      }}/>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        height: '100%', display: 'flex', flexDirection: 'column',
      }}>

        {/* TOP ZONE — logo centered */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 24,
        }}>
          <div style={{
            fontSize: 28, fontWeight: 600, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,.45)',
          }}>
            Tonight I'm drinking
          </div>
          <img
            src={logoSrc}
            crossOrigin="anonymous"
            style={{
              width: 260, height: 260, borderRadius: 40,
              background: 'rgba(255,255,255,.08)',
              padding: 14, objectFit: 'contain',
            }}
            alt={brand.displayName}
          />
        </div>

        {/* BOTTOM ZONE — glass panel */}
        <div style={{
          background: 'rgba(0,0,0,.5)',
          borderTop: '1px solid rgba(255,255,255,.12)',
          padding: '56px 64px 72px',
        }}>
          {/* Brand name */}
          <div style={{
            fontSize: 80, fontWeight: 800, color: 'white',
            letterSpacing: '-.04em', lineHeight: 0.95, marginBottom: 20,
          }}>
            {brand.displayName}
          </div>

          {/* Serve */}
          <div style={{
            fontSize: 40, fontWeight: 600,
            color: 'rgba(220,36,36,.9)', marginBottom: 36,
          }}>
            + {mixer}
          </div>

          {/* Rationale */}
          <div style={{
            fontSize: 32, color: 'rgba(255,255,255,.55)',
            lineHeight: 1.45, marginBottom: 48,
            fontStyle: 'italic',
          }}>
            "{rationale}"
          </div>

          {/* Detail pills */}
          <div style={{ display: 'flex', gap: 18, marginBottom: 56 }}>
            {[
              ['Category', brand.category],
              ['ABV', `${brand.abv}%`],
              ['Price', brand.priceTier],
            ].map(([k, v]) => (
              <div key={k} style={{
                flex: 1, background: 'rgba(255,255,255,.07)',
                borderRadius: 24, padding: '20px 24px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 20, color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 8 }}>{k}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'white', textTransform: 'capitalize' }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Branding */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 52, height: 52, background: '#dc2424',
                borderRadius: 14, display: 'flex', alignItems: 'center',
                justifyContent: 'center', overflow: 'hidden',
              }}>
                <img src="/logo.svg" alt="" style={{ width: 36, height: 36, objectFit: 'contain' }} />
              </div>
              <span style={{ fontSize: 28, fontWeight: 700, color: 'rgba(255,255,255,.5)' }}>
                Drunkard's Dilemma
              </span>
            </div>
            <span style={{ fontSize: 22, color: 'rgba(255,255,255,.25)' }}>
              drunkards-dilemma.vercel.app
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
