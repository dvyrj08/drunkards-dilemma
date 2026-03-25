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
      `${name} saw "${mood}" and "${occasion}" and said "that's my cue."`,
      `A ${mood} person at a ${occasion} ordered ${name}. You're that person.`,
      `${mood} + ${occasion} is a specific vibe. ${name} is the specific answer.`,
      `${name} doesn't ask questions. It just shows up for ${mood} energy at a ${occasion}.`,
      `You walked into a ${occasion} feeling ${mood}. ${name} was already waiting.`,
    )
  }

  if (flavor && mood) {
    pool.push(
      `${flavor} flavor, ${mood} energy. ${name} clocked both without breaking a sweat.`,
      `You said ${flavor}. You said ${mood}. ${name} said "obviously."`,
      `${name} is what ${mood} people reach for when they want ${flavor}. It's not complicated.`,
      `${flavor} and ${mood} sounds like a personality. ${name} is the drink version of it.`,
    )
  }

  if (place && occasion) {
    pool.push(
      `${name} at a ${place} ${occasion}? That's not a recommendation, that's a law.`,
      `${place} + ${occasion} is a formula. ${name} is the answer.`,
      `Everyone at a ${place} ${occasion} eventually ends up with ${name}. Skip the journey.`,
      `You picked ${place} and ${occasion}. ${name} picked you.`,
    )
  }

  if (weather && flavor) {
    pool.push(
      `${weather} weather and ${flavor} notes? ${name} is embarrassingly on-theme.`,
      `${name} was literally designed for ${weather} + ${flavor}. Or at least it should've been.`,
      `${weather} outside, ${flavor} inside — ${name} bridges that gap with zero effort.`,
    )
  }

  if (mood && place) {
    pool.push(
      `Feeling ${mood} at a ${place}? ${name} is the move before you even sit down.`,
      `${name} matches ${mood} energy in a ${place} setting. The algorithm doesn't lie.`,
      `A ${mood} person in a ${place} reaches for ${name}. Every time.`,
    )
  }

  if (occasion && flavor) {
    pool.push(
      `${flavor} flavors at a ${occasion} hit different. ${name} knows this.`,
      `You wanted ${flavor} for a ${occasion}. ${name} RSVPed before you asked.`,
      `${name} is the ${flavor} choice that also makes sense for a ${occasion}. Rare combo.`,
    )
  }

  if (strength) {
    pool.push(
      `You asked for ${strength}. ${name} doesn't exaggerate. It delivers exactly that.`,
      `${strength} and ${name} in the same sentence is just redundant. In a good way.`,
      `${name} hits ${strength} like it was born to. Because it was.`,
    )
  }

  if (budget) {
    pool.push(
      `${budget === 'budget' ? `${name} doesn't make you choose between broke and good taste.` :
        budget === 'premium' ? `You said premium. ${name} didn't flinch.` :
        `Mid-range and ${name}? Honestly the sweet spot.`}`,
    )
  }

  if (weather && mood) {
    pool.push(
      `${weather} weather brings out the ${mood} in people. ${name} brings out the best in both.`,
      `${mood} in ${weather} weather is a specific kind of mood. ${name} gets it.`,
    )
  }

  if (mood) {
    pool.push(
      `${mood} was your vibe. ${name} matched it without being asked.`,
      `The data says ${name}. The ${mood} energy agrees.`,
      `${name} is what happens when ${mood} meets a good bottle.`,
    )
  }

  if (occasion) {
    pool.push(
      `There's a right drink for a ${occasion}. This is it.`,
      `${name} has been the answer to "${occasion}" since before you asked.`,
      `A ${occasion} without ${name} is just an event. Think about it.`,
    )
  }

  if (flavor) {
    pool.push(
      `You wanted ${flavor}. ${name} doesn't mess around with that.`,
      `${flavor} was the brief. ${name} aced it.`,
      `If ${flavor} is what you're after, ${name} is the shortest path there.`,
    )
  }

  if (place) {
    pool.push(
      `${name} fits a ${place} like it was designed for it.`,
      `${place} crowd tends to end up with ${name}. Now you know why.`,
    )
  }

  // Always-valid fallbacks with personality
  pool.push(
    `${name} scored highest. You can argue with the vibes, not the math.`,
    `The quiz had a lot of options. ${name} won anyway.`,
    `${name}. Everything else was a close second.`,
    `Out of everything on the shelf, ${name} fit your answers best. We checked twice.`,
    `Turns out your taste is ${name}. Could be worse.`,
    `${name} kept showing up across every answer you gave. Hard to ignore that.`,
    `Your answers basically spelled out ${name}. So here we are.`,
    `${name} won the vote. Unanimously, actually.`,
  )

  return rnd(pool)
}
