import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const API_KEY = 'mbqqnPVi_42d0Jr6rmWXiUrUTW72sgNylVxxwY21xNmTuAtiLgeLUuQIKgCTFoJ0hTMkwVW8wS6tpEeCvplmlg'

const DOMAIN_MAP = {
  "alberta-premium": "albertapremium.com",
  "averna": "averna.com",
  "beefeater": "beefeatergin.com",
  "belvedere": "belvederevodka.com",
  "bud-light": "budweiser.com",
  "bullet-rye": "bulleit.com",
  "casamigos-anejo": "casamigos.com",
  "ciroc": "ciroc.com",
  "del-maguey-vida": "delmaguey.com",
  "diplomatico-reserva": "diplomatico.com",
  "empress-1908": "empress1908.com",
  "forty-creek": "fortycreekwhisky.com",
  "high-west-double-rye": "highwest.com",
  "kraken-black-spiced": "krakenrum.com",
  "laphroaig-10": "laphroaig.com",
  "macallan-12": "themacallan.com",
  "malibu": "malibu-rum.com",
  "montelobos": "montelobos.com",
  "olmeca-altos-plata": "altostequila.com",
  "somersby": "somersbyapplecider.com",
  "strongbow": "strongbow.com",
  "wild-turkey-101": "wildturkeybourbon.com",
  "absolut": "absolut.com",
  "altos-plata": "altostequila.com",
  "angostura-bitters": "angosturabitters.com",
  "aperol": "aperol.com",
  "appleton-estate": "appletonestate.com",
  "bacardi-superior": "bacardi.com",
  "baileys": "baileys.com",
  "bombardier-cider": "strongbow.com",
  "bombay-sapphire": "bombaysapphire.com",
  "budweiser": "budweiser.com",
  "bulleit-bourbon": "bulleit.com",
  "campari": "campari.com",
  "captain-morgan-spiced": "captainmorgan.com",
  "carpano-antica": "carpano.com",
  "casamigos-blanco": "casamigos.com",
  "cazadores-blanco": "cazadores.com",
  "cointreau": "cointreau.com",
  "coors-light": "coors.com",
  "corona-extra": "corona.com",
  "crown-royal": "crownroyal.com",
  "disaronno-originale": "disaronno.com",
  "don-julio-blanco": "donjulio.com",
  "el-jimador-reposado": "eljimador.com",
  "espolon-blanco": "espolontequila.com",
  "fee-brothers-bitters": "feebrothers.com",
  "fireball-cinnamon": "fireballwhisky.com",
  "frangelico": "frangelico.com",
  "glenfiddich-12": "glenfiddich.com",
  "grand-marnier": "grandmarnier.com",
  "grey-goose": "greygoose.com",
  "guinness-draught": "guinness.com",
  "havana-club-7": "havana-club.com",
  "heineken": "heineken.com",
  "hendricks": "hendricksgin.com",
  "herradura-reposado": "herradura.com",
  "hoegaarden": "hoegaarden.com",
  "jack-daniels": "jackdaniels.com",
  "jagermeister": "jagermeister.com",
  "jameson": "jamesonwhiskey.com",
  "johnnie-walker-black": "johnniewalker.com",
  "jose-cuervo-especial": "cuervo.com",
  "kahlua": "kahlua.com",
  "makers-mark": "makersmark.com",
  "martini-rosso": "martini.com",
  "midori": "midori-world.com",
  "modelo-especial": "modeloespecial.com",
  "patron-silver": "patrontequila.com",
  "peychauds-bitters": "sazerac.com",
  "smirnoff": "smirnoff.com",
  "southern-comfort": "southerncomfort.com",
  "stella-artois": "stellaartois.com",
  "tanqueray": "tanqueray.com",
  "titos": "titosvodka.com",
  "vermouth-noilly-prat": "noillyprat.com",
  "woodford-reserve": "woodfordreserve.com"
}

async function fetchBrand(domain) {
  const res = await fetch(`https://api.brandfetch.io/v2/brands/${domain}`, {
    headers: { Authorization: `Bearer ${API_KEY}` }
  })
  if (!res.ok) {
    console.log(`  API ${res.status} for ${domain}`)
    return null
  }
  return res.json()
}

async function downloadFile(url, dest) {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${API_KEY}` } })
  if (!res.ok) return false
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(dest, buf)
  return true
}

function getBestLogo(data) {
  // Prefer icon type (simpler mark), then logo type
  // Within each, prefer PNG then SVG (SVGs from Brandfetch sometimes have issues)
  const order = ['icon', 'logo', 'symbol', 'other']
  for (const type of order) {
    const logoObj = (data.logos || []).find(l => l.type === type)
    if (!logoObj) continue
    const png = logoObj.formats?.find(f => f.format === 'png' && f.src)
    if (png) return { url: png.src, ext: 'png' }
    const svg = logoObj.formats?.find(f => f.format === 'svg' && f.src)
    if (svg) return { url: svg.src, ext: 'svg' }
  }
  // fallback: any format
  for (const logoObj of data.logos || []) {
    for (const fmt of logoObj.formats || []) {
      if (fmt.src) return { url: fmt.src, ext: fmt.format || 'png' }
    }
  }
  return null
}

async function main() {
  const logosDir = path.join(__dirname, '../public/logos')
  fs.mkdirSync(logosDir, { recursive: true })

  const results = { ok: [], failed: [] }

  for (const [id, domain] of Object.entries(DOMAIN_MAP)) {
    // skip if already downloaded
    const existing = ['png','svg','jpg','webp'].find(ext =>
      fs.existsSync(path.join(logosDir, `${id}.${ext}`))
    )
    if (existing) {
      console.log(`⏭  ${id} (already exists)`)
      results.ok.push(id)
      continue
    }

    process.stdout.write(`⬇  ${id} (${domain})... `)
    const data = await fetchBrand(domain)
    if (!data) { console.log('API error'); results.failed.push(id); continue }

    const best = getBestLogo(data)
    if (!best) { console.log('no logo in response'); results.failed.push(id); continue }

    const dest = path.join(logosDir, `${id}.${best.ext}`)
    const ok = await downloadFile(best.url, dest)
    if (ok) {
      console.log(`✓ (${best.ext})`)
      results.ok.push(id)
    } else {
      console.log('download failed')
      results.failed.push(id)
    }

    await new Promise(r => setTimeout(r, 150))
  }

  console.log(`\n✅ ${results.ok.length} downloaded, ❌ ${results.failed.length} failed`)
  if (results.failed.length) console.log('Failed:', results.failed.join(', '))
}

main()
