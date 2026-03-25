import fs from 'fs'
const brands = JSON.parse(fs.readFileSync('./src/data/brands.json', 'utf8'))

const data = {
  'jameson':               { abv: 40,   cocktails: ['Irish Mule', 'Whiskey Sour', 'Hot Toddy'] },
  'jack-daniels':          { abv: 40,   cocktails: ['Jack & Coke', 'Lynchburg Lemonade', 'Tennessee Mule'] },
  'crown-royal':           { abv: 40,   cocktails: ['Crown & Ginger', 'Crown Sour', 'Canadian Old Fashioned'] },
  'makers-mark':           { abv: 45,   cocktails: ['Old Fashioned', "Maker's Sour", 'Paper Plane'] },
  'bulleit-bourbon':       { abv: 45,   cocktails: ['Boulevardier', 'Whiskey Smash', 'Gold Rush'] },
  'woodford-reserve':      { abv: 43.2, cocktails: ['Mint Julep', 'Classic Manhattan', 'Woodford Sour'] },
  'johnnie-walker-black':  { abv: 40,   cocktails: ['Black & Soda', 'Rob Roy', 'Penicillin'] },
  'glenfiddich-12':        { abv: 40,   cocktails: ['Glenfiddich Highball', 'Scotch Sour', 'The Rusty Nail'] },
  'grey-goose':            { abv: 40,   cocktails: ['Cosmopolitan', 'French Martini', 'Greyhound'] },
  'absolut':               { abv: 40,   cocktails: ['Vodka Soda', 'Sea Breeze', 'Bloody Mary'] },
  'titos':                 { abv: 40,   cocktails: ["Moscow Mule", "Tito's Lemonade", 'Screwdriver'] },
  'smirnoff':              { abv: 37.5, cocktails: ['Vodka Cranberry', 'Kamikaze', 'Smirnoff Mule'] },
  'bombay-sapphire':       { abv: 47,   cocktails: ['Gin & Tonic', 'Negroni', "Bee's Knees"] },
  'tanqueray':             { abv: 47.3, cocktails: ['Tanqueray Gimlet', 'Tom Collins', 'French 75'] },
  'hendricks':             { abv: 41.4, cocktails: ['Cucumber Cooler', 'Elderflower Fizz', 'Aviation'] },
  'bacardi-superior':      { abv: 37.5, cocktails: ['Mojito', 'Daiquiri', 'Cuba Libre'] },
  'captain-morgan-spiced': { abv: 35,   cocktails: ['Captain & Cola', 'Spiced Rum Punch', 'Captain Sour'] },
  'havana-club-7':         { abv: 40,   cocktails: ['El Presidente', 'Rum Old Fashioned', 'Havana Highball'] },
  'appleton-estate':       { abv: 43,   cocktails: ['Jamaican Mule', 'Rum Punch', "Planter's Punch"] },
  'patron-silver':         { abv: 40,   cocktails: ['Margarita', 'Paloma', 'Tequila Sunrise'] },
  'don-julio-blanco':      { abv: 40,   cocktails: ["Tommy's Margarita", 'Ranch Water', 'Don Julio Spritz'] },
  'casamigos-blanco':      { abv: 40,   cocktails: ['Spicy Margarita', 'Watermelon Margarita', 'Casa Paloma'] },
  'jose-cuervo-especial':  { abv: 38,   cocktails: ['Classic Margarita', 'Tequila Sunrise', 'Sangria Punch'] },
  'del-maguey-vida':       { abv: 42,   cocktails: ['Mezcal Negroni', 'Oaxacan Old Fashioned', 'Naked & Famous'] },
  'montelobos':            { abv: 43.2, cocktails: ['Smoke & Mirrors', 'Mezcal Sour', 'Montelobos Paloma'] },
  'baileys':               { abv: 17,   cocktails: ['Baileys on the Rocks', 'Mudslide', 'Irish Coffee'] },
  'kahlua':                { abv: 20,   cocktails: ['White Russian', 'Espresso Martini', 'Black Russian'] },
  'aperol':                { abv: 11,   cocktails: ['Aperol Spritz', 'Paper Plane', 'Aperol Sour'] },
  'campari':               { abv: 25,   cocktails: ['Negroni', 'Campari Spritz', 'Americano'] },
  'jaegermeister':         { abv: 35,   cocktails: ['Jaegerbomb', 'Jaeger Mule', 'Black Sombrero'] },
  'cointreau':             { abv: 40,   cocktails: ['Margarita', 'Cosmopolitan', 'Sidecar'] },
  'strongbow':             { abv: 5,    cocktails: ['Snakebite', 'Strongbow & Black', 'Cider Shandy'] },
  'somersby':              { abv: 4.5,  cocktails: ['Cider Spritz', 'Somersby Sour', 'Apple Shandy'] },
  'bud-light':             { abv: 4.2,  cocktails: ['Michelada', 'Beer Shandy', 'Bud Light Chelada'] },
  'heineken':              { abv: 5,    cocktails: ['Shandy', 'Michelada', 'Radler'] },
  'corona-extra':          { abv: 4.6,  cocktails: ['Corona Sunrise', 'Mexican Mule', 'Chelada'] },
  'guinness-draught':      { abv: 4.2,  cocktails: ['Black & Tan', 'Guinness Float', 'Irish Car Bomb'] },
  'alberta-premium':       { abv: 40,   cocktails: ['Rye & Ginger', 'Alberta Sour', 'Prairie Old Fashioned'] },
  'forty-creek':           { abv: 40,   cocktails: ['Forty Creek Old Fashioned', 'Canadian Sour', 'Creek & Cola'] },
  'diplomatico-reserva':   { abv: 47,   cocktails: ['Rum Old Fashioned', 'El Presidente', 'Diplomatico Sour'] },
  'herradura-reposado':    { abv: 40,   cocktails: ['Margarita Reposado', 'Herradura Sour', 'Reposado Paloma'] },
  'el-jimador-reposado':   { abv: 40,   cocktails: ['El Diablo', 'Jalisco Sour', 'Sangrita Chaser'] },
  'empress-1908':          { abv: 42.5, cocktails: ['Empress G&T', 'Lavender Gin Fizz', 'Empress Sour'] },
  'ciroc':                 { abv: 40,   cocktails: ['Ciroc Spritz', 'Grape Crush', 'Ciroc Martini'] },
  'laphroaig-10':          { abv: 43,   cocktails: ['Penicillin', 'Smoky Sour', 'Laphroaig Highball'] },
  'wild-turkey-101':       { abv: 50.5, cocktails: ['Rye Manhattan', 'Wild Turkey Sour', 'Kentucky Buck'] },
  'bulleit-rye':           { abv: 45,   cocktails: ['Whiskey Sour', 'Vieux Carre', 'Rye Old Fashioned'] },
  'kraken-black-spiced':   { abv: 47,   cocktails: ['Dark & Stormy', 'Kraken & Cola', 'Spiced Rum Punch'] },
  'casamigos-anejo':       { abv: 40,   cocktails: ['Anejo Old Fashioned', 'Cazuela', 'Anejo Sour'] },
  'averna':                { abv: 29,   cocktails: ['Averna Spritz', 'Black Manhattan', 'Averna Sour'] },
  'beefeater':             { abv: 40,   cocktails: ['Beefeater G&T', 'Pink Gin Fizz', 'Beefeater Martini'] },
  'polar-ice':             { abv: 40,   cocktails: ['Vodka Lemonade', 'Cape Codder', 'Dirty Martini'] },
  'macallan-12':           { abv: 40,   cocktails: ['Scotch & Soda', 'Highland Sour', 'Macallan Manhattan'] },
  'high-west-double-rye':  { abv: 46,   cocktails: ['Vieux Carre', 'Rye Manhattan', 'Paper Plane'] },
  'malibu':                { abv: 21,   cocktails: ['Malibu Sunset', 'Pina Colada', 'Coconut Crush'] },
  'olmeca-altos-plata':    { abv: 40,   cocktails: ['Paloma', 'Altos Margarita', 'Tequila Spritz'] },
  'belvedere':             { abv: 40,   cocktails: ['Belvedere Martini', 'Espresso Martini', 'Belvedere Smash'] },
  'triple-sec':            { abv: 30,   cocktails: ['Margarita', 'Cosmopolitan', 'Long Island Iced Tea'] },
}

let count = 0, missing = []
brands.forEach(b => {
  const key = b.id === 'j\u00e4germeister' ? 'jaegermeister' : b.id
  if (data[key]) {
    b.abv = data[key].abv
    b.cocktails = data[key].cocktails
    count++
  } else {
    missing.push(b.id)
  }
})

fs.writeFileSync('./src/data/brands.json', JSON.stringify(brands, null, 2))
console.log('Updated', count, 'brands')
if (missing.length) console.log('MISSING:', missing)
