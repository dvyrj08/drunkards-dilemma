import type { Brand, Answers } from '../types'
import brandsRaw from '../data/brands.json'

const brands = brandsRaw as Brand[]

const mixerBuckets: Record<string, string[]> = {
  bubbly: ['soda water', 'tonic', 'lemon-lime soda', 'ginger ale', 'ginger beer', 'prosecco'],
  citrus: ['lime juice', 'lemonade', 'orange juice', 'grapefruit soda', 'cranberry juice'],
  cola: ['cola'],
  tonic: ['tonic'],
  ginger: ['ginger ale', 'ginger beer'],
  none: ['none'],
}

const placeVibes: Record<string, string[]> = {
  'home':           ['cozy', 'smooth', 'approachable', 'social', 'easygoing'],
  'bar':            ['classic', 'bold', 'sleek', 'casual'],
  'club':           ['party', 'sleek', 'lux', 'trendy', 'bold'],
  'restaurant':     ['refined', 'classic', 'elegant', 'smooth'],
  "friend's place": ['social', 'easygoing', 'party', 'casual'],
  'outdoors':       ['beachy', 'refreshing', 'daytime', 'island', 'light'],
}

function scoreOne(b: Brand, answers: Answers): { score: number; maxScore: number } {
  let score = 0
  let maxScore = 0

  if (answers.budget !== undefined) {
    maxScore += 3
    if (b.priceTier === answers.budget) score += 3
  }

  if (answers.strength !== undefined) {
    maxScore += 3
    if (b.strength === answers.strength) score += 3
  }

  if (answers.mixerMood !== undefined) {
    maxScore += 3
    const allowed = mixerBuckets[answers.mixerMood] ?? []
    if (b.mixers.some(m => allowed.includes(m))) score += 3
  }

  if (answers.flavor !== undefined) {
    maxScore += 2
    const flavorStr = b.flavorNotes.join(' ').toLowerCase()
    const terms = answers.flavor.toLowerCase().split('/')
    if (b.flavorNotes.some(f => terms.includes(f.toLowerCase()))) score += 2
    else if (terms.some(t => flavorStr.includes(t.trim()))) score += 1
  }

  if (answers.occasion !== undefined) {
    maxScore += 2
    if (b.occasions.includes(answers.occasion)) score += 2
  }

  if (answers.weather !== undefined) {
    maxScore += 2
    if (b.weatherFits.includes(answers.weather) || b.weatherFits.includes('any')) score += 2
  }

  if (answers.mood !== undefined) {
    maxScore += 2
    const moodLow = answers.mood.toLowerCase()
    if (b.vibeTags.some(v => v.toLowerCase().includes(moodLow) || moodLow.includes(v.toLowerCase()))) {
      score += 2
    }
  }

  if (answers.place !== undefined) {
    maxScore += 2
    const tags = placeVibes[answers.place] ?? []
    if (tags.some(t => b.vibeTags.map(v => v.toLowerCase()).includes(t))) score += 2
  }

  return { score, maxScore }
}

export type ScoreResult = {
  winner?: Brand
  mixer: string
  alts: Brand[]
  confidence: number // 0–100
}

export function scoreBrands(answers: Answers): ScoreResult {
  const scored = brands.map(b => ({ brand: b, ...scoreOne(b, answers) }))
  scored.sort((a, b) => b.score - a.score)

  const top = scored[0]
  const winner = top?.brand

  const confidence = top && top.maxScore > 0
    ? Math.min(100, Math.round((top.score / top.maxScore) * 100))
    : 0

  let mixer = 'soda water'
  if (answers.mixerMood) {
    const allowed = mixerBuckets[answers.mixerMood] ?? []
    mixer = winner?.mixers.find(m => allowed.includes(m)) ?? winner?.mixers[0] ?? mixer
  } else if (winner?.mixers.length) {
    mixer = winner.mixers[0]
  }

  // Category-diverse alts: prefer different categories first, fill from top scores
  const candidates = scored.slice(1, 6)
  const alts: Brand[] = []
  const usedCats = new Set([winner?.category])
  for (const c of candidates) {
    if (alts.length >= 2) break
    if (!usedCats.has(c.brand.category)) { alts.push(c.brand); usedCats.add(c.brand.category) }
  }
  for (const c of candidates) {
    if (alts.length >= 2) break
    if (!alts.includes(c.brand)) alts.push(c.brand)
  }

  return { winner, mixer, alts, confidence }
}

export function wittyRationale(ans: Answers, brand: Brand, confidence: number): string {
  const name = brand.displayName

  if (confidence < 35) {
    return `${name} is the closest match, but your answers left room for interpretation. Answer more questions for a tighter result.`
  }

  const { mood, occasion, flavor, place, weather } = ans
  const pick = [
    mood && occasion  ? `${name} — ${mood} energy at a ${occasion} basically wrote the brief.`  : null,
    flavor && mood    ? `You said ${flavor} and ${mood}. ${name} fits both without trying.`      : null,
    place && occasion ? `${name} was built for ${place} + ${occasion}. Not subtle.`              : null,
    weather && flavor ? `${weather} weather, ${flavor} flavors — ${name} was the obvious call.`  : null,
    mood              ? `${mood} mood calls for ${name}. The numbers agree.`                     : null,
    occasion          ? `${name} is the right call for a ${occasion}.`                           : null,
    flavor            ? `You wanted ${flavor}. ${name} delivers.`                                : null,
    `${name} scored highest across everything you answered. Trust the process.`,
  ].filter(Boolean) as string[]

  return pick[0]
}
