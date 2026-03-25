export type LogoProps = { id?: string; domain?: string; bg?: string };

const DOMAIN_MAP: Record<string, string> = {
  "absolut": "absolut.com",
  "alberta-premium": "albertapremium.com",
  "aperol": "aperol.com",
  "appleton-estate": "appletonestate.com",
  "averna": "averna.com",
  "bacardi-superior": "bacardi.com",
  "baileys": "baileys.com",
  "beefeater": "beefeatergin.com",
  "belvedere": "belvederevodka.com",
  "bombay-sapphire": "bombaysapphire.com",
  "bud-light": "budweiser.com",
  "bulleit-bourbon": "bulleit.com",
  "bulleit-rye": "bulleit.com",
  "campari": "campari.com",
  "captain-morgan-spiced": "captainmorgan.com",
  "casamigos-anejo": "casamigos.com",
  "casamigos-blanco": "casamigos.com",
  "ciroc": "ciroc.com",
  "cointreau": "cointreau.com",
  "corona-extra": "corona.com",
  "crown-royal": "crownroyal.com",
  "del-maguey-vida": "delmaguey.com",
  "diplomatico-reserva": "diplomatico.com",
  "don-julio-blanco": "donjulio.com",
  "el-jimador-reposado": "eljimador.com",
  "empress-1908": "empress1908.com",
  "forty-creek": "fortycreekwhisky.com",
  "glenfiddich-12": "glenfiddich.com",
  "grey-goose": "greygoose.com",
  "guinness-draught": "guinness.com",
  "havana-club-7": "havana-club.com",
  "heineken": "heineken.com",
  "hendricks": "hendricksgin.com",
  "herradura-reposado": "herradura.com",
  "high-west-double-rye": "highwest.com",
  "jack-daniels": "jackdaniels.com",
  "jägermeister": "jagermeister.com",
  "jameson": "jamesonwhiskey.com",
  "johnnie-walker-black": "johnniewalker.com",
  "jose-cuervo-especial": "cuervo.com",
  "kahlua": "kahlua.com",
  "kraken-black-spiced": "krakenrum.com",
  "laphroaig-10": "laphroaig.com",
  "macallan-12": "themacallan.com",
  "makers-mark": "makersmark.com",
  "malibu": "malibu-rum.com",
  "modelo-especial": "modelo.com",
  "montelobos": "montelobos.com",
  "olmeca-altos-plata": "altostequila.com",
  "patron-silver": "patrontequila.com",
  "smirnoff": "smirnoff.com",
  "somersby": "somersbyapplecider.com",
  "strongbow": "strongbow.com",
  "tanqueray": "tanqueray.com",
  "titos": "titosvodka.com",
  "triple-sec": "cointreau.com",
  "polar-ice": "polarice.com",
  "wild-turkey-101": "wildturkeybourbon.com",
  "woodford-reserve": "woodfordreserve.com",
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

import logoBg from '../data/logoBg.json'

export const logoPropsFor = (id?: string): LogoProps => {
  const domain = id ? DOMAIN_MAP[id] : undefined;
  const bg = id ? (logoBg as Record<string, string>)[id] : undefined;
  return { id, domain, bg };
};
