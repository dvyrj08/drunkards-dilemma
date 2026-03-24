import type { Brand, Answers } from '../types'
import brandsRaw from '../data/brands.json'

const brands = brandsRaw as Brand[]

const mixerBuckets: Record<string,string[]> = {
  bubbly: ['soda water','tonic','lemon-lime soda','ginger ale','ginger beer','prosecco'],
  citrus: ['lime juice','lemonade','orange juice','grapefruit soda','cranberry juice'],
  cola: ['cola'],
  tonic: ['tonic'],
  ginger: ['ginger ale','ginger beer'],
  none: ['none']
}

export function scoreBrands(answers: Answers) {
  // Filter + score
  const scored = brands.map(b => {
    let score = 0

    // budget/price
    if (answers.budget && b.priceTier === answers.budget) score += 3
    // strength
    if (answers.strength && b.strength === answers.strength) score += 3
    // flavor notes fuzzy match
    if (answers.flavor) {
      if (b.flavorNotes.join(' ').toLowerCase().includes(answers.flavor.toLowerCase())) score += 2
    }
    // occasion
    if (answers.occasion && b.occasions.includes(answers.occasion)) score += 2
    // weather
    if (answers.weather && (b.weatherFits.includes(answers.weather) || b.weatherFits.includes('any'))) score += 2
    // vibe from mood
    if (answers.mood) {
      const match = b.vibeTags.some(v => answers.mood!.toLowerCase().includes(v.toLowerCase()) || v.toLowerCase().includes(answers.mood!.toLowerCase()))
      if (match) score += 2
    }
    // place (light heuristic)
    if (answers.place) {
      const map: Record<string,string[]> = {
        home: ['cozy','smooth','approachable','dessert'],
        bar: ['classic','bold','sleek'],
        club: ['party','sleek','lux','trendy'],
        restaurant: ['refined','classic','evening'],
        "friend’s place": ['social','easygoing','party'],
        outdoors: ['beachy','refreshing','daytime','island']
      }
      const tags = map[answers.place] || []
      if (tags.length && b.vibeTags.some(v => tags.includes(v))) score += 2
    }

    // mixer compatibility
    if (answers.mixerMood) {
      const allowed = mixerBuckets[answers.mixerMood] || []
      if (b.mixers.some(m => allowed.includes(m))) score += 3
    }

    return { brand: b, score }
  })

  // ensure at least some diversity by category then sort
  scored.sort((a,b)=> b.score - a.score)

  // pick top
  const top = scored.slice(0,5)
  const winner = top[0]?.brand

  // mixer suggestion based on mood intersect
  let mixer = 'soda water'
  if (answers.mixerMood) {
    const allowed = mixerBuckets[answers.mixerMood] || []
    const first = winner?.mixers.find(m=> allowed.includes(m))
    if (first) mixer = first
    else if (winner?.mixers.length) mixer = winner.mixers[0]
  } else if (winner?.mixers.length) {
    mixer = winner.mixers[0]
  }

  // 2 alternates
  const alts = top.slice(1,3).map(s=>s.brand)

  return { winner, mixer, alts, scored }
}

export function wittyRationale(ans: Answers, brand: Brand) {
  const name = brand.displayName
  const mood = ans.mood
  const occasion = ans.occasion
  const flavor = ans.flavor
  const place = ans.place
  const weather = ans.weather

  const templates = [
    mood && occasion ? `${name} — because ${mood} energy at a ${occasion} is a vibe.` : null,
    flavor && mood ? `You said ${flavor} and ${mood}. ${name} heard you loud and clear.` : null,
    place && occasion ? `${name} fits ${place} + ${occasion} like it was made for it.` : null,
    weather && flavor ? `${weather} weather, ${flavor} flavors — ${name} was the obvious call.` : null,
    mood ? `${mood} mood? ${name} doesn't miss for that energy.` : null,
    occasion ? `For a ${occasion}, ${name} just makes sense.` : null,
    flavor ? `You wanted ${flavor}. ${name} delivers.` : null,
    `${name} scored highest across your answers. Trust the algorithm.`,
  ].filter(Boolean) as string[]

  return templates[0]
}
