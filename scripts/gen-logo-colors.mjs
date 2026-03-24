import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const LOGOS_DIR = path.join(__dirname, '../public/logos')
const OUT_FILE = path.join(__dirname, '../src/data/logoBg.json')

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function getBg(r, g, b) {
  const { h, s, l } = rgbToHsl(r, g, b)
  // White/near-white logo → dark slate so logo is actually visible
  if (l > 82) return `hsl(215, 18%, 22%)`
  // Dark/black logo → soft light bg
  if (l < 20) return `hsl(${h}, 8%, 92%)`
  // Everything else → pastel: desaturate heavily, push lightness up
  const ps = Math.min(s * 0.4, 35)
  const pl = Math.min(Math.max(l + 40, 90), 96)
  return `hsl(${h}, ${ps.toFixed(0)}%, ${pl.toFixed(0)}%)`
}

async function getDominantColor(filePath) {
  // Sample only opaque pixels so transparent logos don't average to white
  const { data } = await sharp(filePath)
    .resize(64, 64, { fit: 'inside', kernel: 'nearest' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  let rSum = 0, gSum = 0, bSum = 0, count = 0
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] > 64) { // only count pixels with meaningful opacity
      rSum += data[i]; gSum += data[i + 1]; bSum += data[i + 2]
      count++
    }
  }
  // fallback: if logo is almost entirely transparent, use neutral
  if (count < 20) return { r: 160, g: 160, b: 160 }
  return { r: rSum / count, g: gSum / count, b: bSum / count }
}

async function main() {
  const files = fs.readdirSync(LOGOS_DIR).filter(f => /\.(png|jpe?g)$/i.test(f))
  const result = {}

  for (const file of files) {
    const id = file.replace(/\.(png|jpe?g)$/i, '')
    const filePath = path.join(LOGOS_DIR, file)
    try {
      const { r, g, b } = await getDominantColor(filePath)
      result[id] = getBg(r, g, b)
      console.log(`✓ ${id} → rgb(${r.toFixed(0)},${g.toFixed(0)},${b.toFixed(0)}) → ${result[id]}`)
    } catch (e) {
      console.log(`✗ ${id}: ${e.message}`)
    }
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(result, null, 2))
  console.log(`\nWrote ${Object.keys(result).length} entries to logoBg.json`)
}

main()
