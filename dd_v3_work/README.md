# Drunkard's Dilemma

Mobile‑first, playful brand + mixer recommender based on an 8‑step quiz.

## Quick Start
```bash
npm i
npm run dev
```

Open http://localhost:5173

## What’s inside
- Vite + React + TypeScript + TailwindCSS
- Questionnaire flow (8 steps)
- Deterministic scorer (`src/logic/scorer.ts`)
- Results screen with brand logo, rationale, mixer, and two alternates
- Accessible, keyboard/touch friendly, and responsive

## AI Mode (optional, off by default)
The scorer is deterministic. If you want AI to enhance the rationale/selection, add an API route and set an env flag. (Stub left for future work.)

## Logos
Logos are referenced via `/public/logos/*.svg`. For now, a `placeholder.svg` is used as a fallback. Replace with accurate brand logos that you have the rights to use.

## Data
Edit `src/data/brands.json` to add/remove brands or tweak attributes (flavors, vibe tags, mixers, etc.).
