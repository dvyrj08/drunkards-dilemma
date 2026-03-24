import React, { useMemo, useState } from 'react'
import ProgressBar from './components/ProgressBar'
import StepCard from './components/StepCard'
import ResultsCard from './components/ResultsCard'
import FooterLegal from './components/FooterLegal'
import type { Answers } from './types'
import { scoreBrands, wittyRationale } from './logic/scorer'

const steps = [
  { key: 'mood', title: 'Mood right now?', options: ['radiant','chill','spicy','savage','classy','adventurous','melancholy'] },
  { key: 'place', title: 'Where are you?', options: ['home','bar','club','restaurant','friend’s place','outdoors'] },
  { key: 'occasion', title: 'What’s the occasion?', options: ['solo unwind','date night','house party','game night','celebration','pre-game'] },
  { key: 'weather', title: 'Weather vibe?', options: ['hot','warm','cool','cold','rainy','snowy','any'] },
  { key: 'flavor', title: 'Flavor lane?', options: ['crisp/clean','citrusy','sweet','smoky','herbal/botanical','malty','oaky/vanilla','spicy'] },
  { key: 'strength', title: 'Strength target?', options: ['light','medium','strong'] },
  { key: 'budget', title: 'Budget?', options: ['budget','mid','premium'] },
  { key: 'mixerMood', title: 'Mixer mood?', options: ['bubbly','citrus','cola','tonic','ginger','none'] },
] as const

type StepKey = typeof steps[number]['key']

export default function App() {
  const [answers, setAnswers] = useState<Answers>({})
  const [i, setI] = useState(0)
  const total = steps.length

  const current = steps[i]

  const setAnswer = (key: StepKey, value?: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  const randomizeCurrent = () => {
    const idx = Math.floor(Math.random() * current.options.length)
    setAnswer(current.key as StepKey, current.options[idx])
  }

  const skipCurrent = () => {
    setAnswer(current.key as StepKey, undefined) // neutral
    setI(Math.min(total, i+1))
  }

  const rollTheDice = async () => {
    // auto-randomize all answers with a quick spin and jump to results
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      const step = steps[stepIdx]
      // spin a few times
      for (let spin = 0; spin < 6; spin++) {
        const rand = step.options[Math.floor(Math.random()*step.options.length)]
        setAnswers(prev => ({ ...prev, [step.key]: rand }))
        await new Promise(r => setTimeout(r, 80))
      }
    }
    setI(total) // go to results
  }

  const done = i >= total

  const { winner, mixer, alts } = useMemo(()=> {
    return scoreBrands(answers)
  }, [answers])

  const rationale = useMemo(()=> {
    return winner ? wittyRationale(answers, winner) : 'We overthought it. Pick any whiskey and call it a character arc.'
  }, [answers, winner])

  return (
    <main className="min-h-screen max-w-md mx-auto px-4 py-6 space-y-6">
      <header className="header-bar">
        <div className="header-left">
          <img src="/logo.svg" alt="Drunkard's Dilemma" className="w-9 h-9" />
          <div>
            <h1 className="text-xl font-extrabold leading-tight">Drunkard’s Dilemma</h1>
            <p className="text-white/70 text-xs">You answer. We enable. Responsibly.</p>
          </div>
        </div>

      </header>

      {!done ? (
        <>
          <ProgressBar step={i+1} total={total} />

          <StepCard
            title={current.title}
            options={current.options as string[]}
            value={(answers as any)[current.key]}
            onChange={(v)=> setAnswer(current.key as StepKey, v)}
            onRandomize={randomizeCurrent}
            onSkip={skipCurrent}
          />

          <div className="flex gap-3 justify-between">
            <button
              className="btn"
              onClick={()=> setI(Math.max(0, i-1))}
              disabled={i===0}
            >Back</button>

            <button
              className="btn btn-primary"
              onClick={()=> setI(Math.min(total, i+1))}
            >Next</button>
          </div>
        </>
      ) : (
        <ResultsCard
          brand={winner}
          mixer={mixer}
          rationale={rationale}
          alts={alts}
          onRetake={()=> { setAnswers({}); setI(0) }}
        />
      )}

      <FooterLegal />
    </main>
  )
}
