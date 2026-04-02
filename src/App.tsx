import React, { useMemo, useState } from 'react'
import Dither from './components/Dither'
import ProgressBar from './components/ProgressBar'
import StepCard from './components/StepCard'
import ResultsCard from './components/ResultsCard'
import FooterLegal from './components/FooterLegal'
import QuickPick from './components/QuickPick'
import DrinkDirectory from './components/DrinkDirectory'
import type { Answers } from './types'
import { scoreBrands, wittyRationale, pickMixer } from './logic/scorer'

const steps = [
  { key: 'mood',      title: 'Mood right now?',        options: ['radiant','chill','spicy','savage','classy','adventurous','melancholy'] },
  { key: 'place',     title: 'Where are you?',          options: ['home','bar','club','restaurant',"friend's place",'outdoors'] },
  { key: 'occasion',  title: "What's the occasion?",    options: ['solo unwind','date night','house party','game night','celebration','pre-game'] },
  { key: 'weather',   title: 'Weather vibe?',           options: ['hot','warm','cool','cold','rainy','snowy','any'] },
  { key: 'flavor',    title: 'Flavor lane?',            options: ['crisp/clean','citrusy','sweet','smoky','herbal/botanical','malty','oaky/vanilla','spicy'] },
  { key: 'strength',  title: 'Strength target?',        options: ['light','medium','strong'] },
  { key: 'budget',    title: 'Budget?',                 options: ['budget','mid','premium'] },
  { key: 'mixerMood', title: 'Mixer mood?',             options: ['bubbly','citrus','cola','tonic','ginger','none'] },
] as const

type StepKey = typeof steps[number]['key']
type Phase = 'quiz' | 'results' | 'directory'

export default function App() {
  const [phase, setPhase]       = useState<Phase>('quiz')
  const [step, setStep]         = useState(0)
  const [answers, setAnswers]   = useState<Answers>({})
  const [resultIndex, setResultIndex] = useState(0)

  const total   = steps.length
  const current = steps[step]

  const setAnswer = (key: StepKey, value?: string) =>
    setAnswers(prev => ({ ...prev, [key]: value }))

  const advance = () => {
    if (step >= total - 1) setPhase('results')
    else setStep(s => s + 1)
  }

  const skip = () => {
    setAnswer(current.key, undefined)
    advance()
  }

  const randomize = () => {
    const opts = current.options as readonly string[]
    setAnswer(current.key, opts[Math.floor(Math.random() * opts.length)])
  }

  const retake = () => {
    setAnswers({})
    setStep(0)
    setPhase('quiz')
    setResultIndex(0)
  }

  const handleSkipQuiz = () => {
    setAnswers({})
    setResultIndex(0)
    setPhase('results')
  }

  const { ranked, alts, confidence } = useMemo(() => scoreBrands(answers), [answers])
  const reroll = () => setResultIndex(i => (i + 1) % ranked.length)
  const winner = ranked[resultIndex]?.brand
  const mixer  = useMemo(() => pickMixer(winner, answers), [winner, answers])

  const rationale = useMemo(
    () => winner
      ? wittyRationale(answers, winner)
      : 'Nothing matched cleanly. Pick any whiskey and call it a character arc.',
    [answers, winner]
  )

  return (
    <>
    <div className="fixed inset-0 -z-10">
      <Dither
        waveColor={[1, 0.1411764705882353, 0.1411764705882353]}
        enableMouseInteraction={true}
        mouseRadius={0.3}
        colorNum={4}
        waveAmplitude={0.3}
        waveFrequency={3}
        waveSpeed={0.05}
        pixelSize={2}
      />
    </div>
    <main className="min-h-screen max-w-md mx-auto px-4 py-6 space-y-6">
      <header className="header-bar">
        <button className="header-left hover:opacity-75 transition-opacity" onClick={retake}>
          <img src="/logo.svg" alt="Drunkard's Dilemma" className="w-9 h-9" />
          <div>
            <h1 className="text-xl font-extrabold leading-tight">Drunkard's Dilemma</h1>
            <p className="text-white/50 text-xs">You answer. We suggest. You decide.</p>
          </div>
        </button>
        <button
          className="btn text-sm text-white/70 hover:text-white transition-colors"
          onClick={() => setPhase('directory')}
        >
          Browse
        </button>
      </header>

      {phase === 'directory' ? (
        <DrinkDirectory onBack={() => setPhase('quiz')} />
      ) : phase === 'quiz' ? (
        <>
          {step === 0 && <QuickPick onSkip={handleSkipQuiz} />}
          <ProgressBar step={step + 1} total={total} />
          <div key={step} className="step-enter">
            <StepCard
              title={current.title}
              options={current.options as string[]}
              value={(answers as Record<string, string | undefined>)[current.key]}
              onChange={v => setAnswer(current.key, v)}
              onRandomize={randomize}
              onSkip={skip}
            />
          </div>
          <div className="flex gap-3 items-center">
            <button
              className="btn text-white/40 hover:text-white/70 transition-colors disabled:opacity-20"
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              ← Back
            </button>
            <button className="btn btn-primary flex-1 text-base" onClick={advance}>
              {step === total - 1 ? 'See my drink →' : 'Next →'}
            </button>
          </div>
        </>
      ) : (
        <ResultsCard
          brand={winner}
          mixer={mixer}
          rationale={rationale}
          alts={alts}
          confidence={confidence}
          onRetake={retake}
          onReroll={reroll}
        />
      )}

      <FooterLegal />
    </main>
    </>
  )
}
