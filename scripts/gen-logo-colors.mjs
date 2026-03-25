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

// W3C relative luminance (0 = black, 1 = white)
function relativeLuminance(r, g, b) {
  const toLinear = c => {
    c /= 255
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

function getBg(r, g, b) {
  const lum = relativeLuminance(r, g, b)
  const { h, s } = rgbToHsl(r, g, b)

  if (lum < 0.04) {
    // Near-black logo → light neutral bg so it's visible
    return `hsl(${h}, ${Math.min(s * 0.3, 15).toFixed(0)}%, 90%)`
  }
  // Every other logo (light, colorful, golden, etc.) → dark bg tinted with logo's hue
  // This guarantees the logo always pops in a dark-themed app
  const bgS = Math.min(s * 0.45, 28)
  return `hsl(${h}, ${bgS.toFixed(0)}%, 18%)`
}

async function analyzeImage(filePath) {
  const { data, info } = await sharp(filePath)
    .resize(64, 64, { fit: 'inside', kernel: 'nearest' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const totalPixels = info.width * info.height
  let rSum = 0, gSum = 0, bSum = 0
  let opaqueCount = 0, transparentCount = 0

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 32) {
      transparentCount++
    } else {
      rSum += data[i]; gSum += data[i + 1]; bSum += data[i + 2]
      opaqueCount++
    }
  }

  const transparentRatio = transparentCount / totalPixels
  // Only consider it a transparent-bg logo if >30% of pixels are transparent
  const isTransparent = transparentRatio > 0.30

  if (opaqueCount < 20) return { isTransparent, r: 160, g: 160, b: 160 }
  return {
    isTransparent,
    r: rSum / opaqueCount,
    g: gSum / opaqueCount,
    b: bSum / opaqueCount,
  }
}

async function main() {
  const files = fs.readdirSync(LOGOS_DIR).filter(f => /\.(png|jpe?g)$/i.test(f))

  // Load existing logoBg.json so we preserve non-transparent logo bgs
  const existing = fs.existsSync(OUT_FILE)
    ? JSON.parse(fs.readFileSync(OUT_FILE, 'utf8'))
    : {}

  const result = { ...existing }
  let updated = 0, skipped = 0

  for (const file of files) {
    const id = file.replace(/\.(png|jpe?g)$/i, '')
    const filePath = path.join(LOGOS_DIR, file)
    try {
      const { isTransparent, r, g, b } = await analyzeImage(filePath)
      if (!isTransparent) {
        console.log(`⏭  ${id} — opaque bg, skipping`)
        skipped++
        continue
      }
      result[id] = getBg(r, g, b)
      console.log(`✓ ${id} → rgb(${r.toFixed(0)},${g.toFixed(0)},${b.toFixed(0)}) → ${result[id]}`)
      updated++
    } catch (e) {
      console.log(`✗ ${id}: ${e.message}`)
    }
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(result, null, 2))
  console.log(`\nUpdated ${updated} transparent logos, skipped ${skipped} opaque logos.`)
}

main()
