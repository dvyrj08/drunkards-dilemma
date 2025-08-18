export type LogoProps = { slug?: string; domain?: string };

// Best-effort mapping from brand IDs to Clearbit domains (and inferred Simple Icons slugs)
const DOMAIN_MAP: Record<string, string> = {
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
};

const simpleSlugFromId = (id?: string) => {
  if (!id) return undefined;
  // convert 'johnnie-walker-black' -> 'johnniewalker' (brand family) in some common cases
  const core = id
    .replace(/-black|-silver|-reposado|-blanco|-draught|-extra|-especial|-plata|\d+$/g, '')
    .replace(/-\d+$/, '')
    .split('-')
    .slice(0, 2) // often first 1-2 words are the brand
    .join('');
  return core || id.replace(/[^a-z0-9]+/g, '');
};

export const logoPropsFor = (id?: string, displayName?: string): LogoProps => {
  const domain = id ? DOMAIN_MAP[id] : undefined;
  const slug = simpleSlugFromId(id || displayName?.toLowerCase().replace(/\s+/g, '-'));
  return { slug, domain };
};
