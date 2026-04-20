import React, { useMemo, useState, useRef, useEffect } from 'react'
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
type Phase = 'quiz' | 'thinking' | 'results' | 'directory'

export default function App() {
  const [phase, setPhase]       = useState<Phase>('quiz')
  const [step, setStep]         = useState(0)
  const [answers, setAnswers]   = useState<Answers>({})
  const [resultIndex, setResultIndex] = useState(0)
  const [advancing, setAdvancing] = useState(false)
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const total   = steps.length
  const current = steps[step]

  const setAnswer = (key: StepKey, value?: string) =>
    setAnswers(prev => ({ ...prev, [key]: value }))

  const clearAdvanceTimer = () => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current)
      advanceTimer.current = null
    }
  }

  const goNext = (fromStep: number) => {
    if (fromStep >= total - 1) setPhase('thinking')
    else setStep(fromStep + 1)
  }

  // thinking interstitial → results after 1800ms
  useEffect(() => {
    if (phase === 'thinking') {
      const t = setTimeout(() => setPhase('results'), 1800)
      return () => clearTimeout(t)
    }
  }, [phase])

  // auto-advance 400ms after chip selection
  const handleAnswer = (key: StepKey, value: string) => {
    setAnswer(key, value)
    setAdvancing(true)
    clearAdvanceTimer()
    const capturedStep = step
    advanceTimer.current = setTimeout(() => {
      setAdvancing(false)
      goNext(capturedStep)
    }, 400)
  }

  const advance = () => {
    clearAdvanceTimer()
    setAdvancing(false)
    goNext(step)
  }

  const skip = () => {
    setAnswer(current.key, undefined)
    clearAdvanceTimer()
    setAdvancing(false)
    goNext(step)
  }

  const randomize = () => {
    const opts = current.options as readonly string[]
    setAnswer(current.key, opts[Math.floor(Math.random() * opts.length)])
  }

  const retake = () => {
    clearAdvanceTimer()
    setAdvancing(false)
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
      {/* Dither background — full viewport, behind everything */}
      <div className="fixed inset-0 -z-10" aria-hidden="true">
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

      {/* Thinking overlay — outside <main> so it covers full viewport incl. top gap */}
      {phase === 'thinking' && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/90 backdrop-blur-sm">
          <div className="thinking-pulse">🍸</div>
          <div className="text-sm font-semibold text-white/80 tracking-wide">
            Finding your drink
            <span className="think-dots">
              <span>.</span><span>.</span><span>.</span>
            </span>
          </div>
          <div className="text-xs text-white/30">Matching your answers to 80+ brands</div>
        </div>
      )}

      <main className="min-h-screen max-w-md mx-auto px-4 py-6 space-y-6">
        <header className="header-bar">
          <button className="header-left hover:opacity-75 transition-opacity" onClick={retake}>
            <img src="/logo.svg" alt="Drunkard's Dilemma" className="w-9 h-9" />
            <div>
              <h1 className="text-xl font-extrabold leading-tight">Drunkard's Dilemma</h1>
              <p className="text-white/75 text-xs">You answer. We suggest. You decide.</p>
            </div>
          </button>
          <button
            className="btn text-sm text-white bg-black/40 backdrop-blur-sm border border-white/20 hover:bg-black/60 transition-colors"
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
                onChange={v => handleAnswer(current.key, v)}
                onRandomize={randomize}
                onSkip={skip}
                advancing={advancing}
              />
            </div>

            {/* Nav: Back always available; primary CTA only on final step */}
            <div className="flex gap-3 items-center">
              {step > 0 && (
                <button
                  className="btn text-sm text-white bg-black/40 backdrop-blur-sm border border-white/20 hover:bg-black/60 transition-colors"
                  onClick={() => { clearAdvanceTimer(); setAdvancing(false); setStep(s => s - 1) }}
                >
                  ← Back
                </button>
              )}
              {step === total - 1 && (
                <button className="btn btn-primary flex-1 text-base" onClick={advance}>
                  See my drink →
                </button>
              )}
            </div>
          </>
        ) : phase === 'results' ? (
          <ResultsCard
            brand={winner}
            mixer={mixer}
            rationale={rationale}
            alts={alts}
            confidence={confidence}
            onRetake={retake}
            onReroll={reroll}
          />
        ) : null}

        <FooterLegal />
      </main>
    </>
  )
}
