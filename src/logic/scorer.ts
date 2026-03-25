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
    maxScore += 2
    if (b.priceTier === answers.budget) score += 2
  }

  if (answers.strength !== undefined) {
    maxScore += 2
    if (b.strength === answers.strength) score += 2
  }

  if (answers.mixerMood !== undefined) {
    maxScore += 2
    const allowed = mixerBuckets[answers.mixerMood] ?? []
    if (b.mixers.some(m => allowed.includes(m))) score += 2
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
    if (b.weatherFits.includes(answers.weather)) score += 2
    else if (b.weatherFits.includes('any')) score += 1
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
  const second = scored[1]
  const winner = top?.brand

  // Gap-based confidence: how far ahead is the winner vs the next candidate?
  // Tight race = low confidence, clear winner = high confidence
  const confidence = top && top.score > 0
    ? Math.min(100, Math.round(((top.score - (second?.score ?? 0)) / top.score) * 100))
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

function rnd<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }

export function wittyRationale(ans: Answers, brand: Brand): string {
  const name = brand.displayName
  const { mood, occasion, flavor, place, weather, strength, budget } = ans

  // Build a pool of valid lines based on what was answered
  const pool: string[] = []

  if (mood && occasion) {
    pool.push(
      `${mood} + ${occasion} is a specific combo. ${name} matched it best.`,
      `A ${mood} person at a ${occasion} tends to land on ${name}. The pattern checks out.`,
      `${mood} energy at a ${occasion} pointed pretty clearly at ${name}.`,
      `${name} tends to fit ${mood} + ${occasion} better than most alternatives.`,
    )
  }

  if (flavor && mood) {
    pool.push(
      `${flavor} flavor and ${mood} energy. ${name} scored highest on both.`,
      `${mood} and ${flavor} together? ${name} is usually the answer to that combination.`,
      `${name} tends to suit ${mood} people who want ${flavor}. Fits your profile.`,
      `${flavor} + ${mood} is a specific ask. ${name} came closest.`,
    )
  }

  if (place && occasion) {
    pool.push(
      `${name} tends to work well at a ${place} ${occasion}. Strong overlap with your answers.`,
      `${place} + ${occasion} narrowed it down pretty fast. ${name} came out on top.`,
      `For a ${place} ${occasion}, ${name} scored higher than any alternative.`,
    )
  }

  if (weather && flavor) {
    pool.push(
      `${weather} weather and ${flavor} notes tend to point toward ${name}.`,
      `${name} fits ${weather} conditions and ${flavor} preference better than the competition.`,
      `${weather} outside, ${flavor} preference — ${name} matched both.`,
    )
  }

  if (mood && place) {
    pool.push(
      `${mood} energy in a ${place} setting. ${name} tends to fit that combination.`,
      `${name} scored well for ${mood} vibes in a ${place}. Hard to argue with the numbers.`,
      `${mood} at a ${place} usually points somewhere like ${name}.`,
    )
  }

  if (occasion && flavor) {
    pool.push(
      `${flavor} flavors at a ${occasion} — ${name} matched that pairing well.`,
      `${name} fits ${flavor} preference at a ${occasion} better than most on the list.`,
      `${occasion} + ${flavor} is a fairly specific ask. ${name} came closest.`,
    )
  }

  if (strength) {
    pool.push(
      `You wanted ${strength}. ${name} fits that well without overdelivering.`,
      `${name} sits in the ${strength} range and scored well across your other answers too.`,
      `${strength} strength plus everything else you picked. ${name} checked the most boxes.`,
    )
  }

  if (budget) {
    pool.push(
      `${budget === 'budget' ? `${name} sits in the budget range without sacrificing much.` :
        budget === 'premium' ? `You went premium. ${name} is a solid pick at that tier.` :
        `Mid-range and ${name} is a reasonable combo — good value without compromise.`}`,
    )
  }

  if (weather && mood) {
    pool.push(
      `${weather} weather tends to pair with ${mood} energy in a specific way. ${name} fit both.`,
      `${mood} in ${weather} weather is a recognizable pattern. ${name} matches it well.`,
    )
  }

  if (mood) {
    pool.push(
      `${mood} was your vibe. ${name} scored highest for that.`,
      `${name} came out on top for ${mood} energy. Make of that what you will.`,
      `${name} matched ${mood} best out of everything in the list.`,
    )
  }

  if (occasion) {
    pool.push(
      `${name} tends to work well for a ${occasion}. Scored well across your answers.`,
      `${name} comes up often for ${occasion} — scored highest for yours too.`,
      `For a ${occasion}, ${name} fit the profile better than the alternatives.`,
    )
  }

  if (flavor) {
    pool.push(
      `You wanted ${flavor}. ${name} matched that best.`,
      `${flavor} was the preference. ${name} fit it along with your other answers.`,
      `${name} leans ${flavor} and scored well overall. Good fit.`,
    )
  }

  if (place) {
    pool.push(
      `${name} tends to suit a ${place} setting. Scored well for your answers.`,
      `${place} crowd generally leans toward ${name}. Your other answers agreed.`,
    )
  }

  // Always-valid fallbacks
  pool.push(
    `${name} scored highest. You can argue with the vibes, not the math.`,
    `The quiz had a lot of options. ${name} scored best for yours.`,
    `${name} came out ahead. Everything else was close but not quite.`,
    `Out of everything on the shelf, ${name} fit your answers best.`,
    `Your answers pointed toward ${name} more than anything else. So here we are.`,
    `${name} kept scoring across every dimension you answered. Hard to ignore that.`,
    `Not every quiz has a clear winner. This one did. It's ${name}.`,
    `${name} won the points tally. Unanimously, actually.`,
  )

  return rnd(pool)
}
