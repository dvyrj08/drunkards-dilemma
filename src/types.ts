export type Brand = {
  id: string;
  displayName: string;
  category: 'whiskey'|'tennessee'|'bourbon'|'scotch'|'vodka'|'gin'|'rum'|'tequila'|'mezcal'|'liqueur'|'cider'|'beer';
  flavorNotes: string[];
  vibeTags: string[];
  strength: 'light'|'medium'|'strong';
  priceTier: 'budget'|'mid'|'premium';
  mixers: string[];
  occasions: string[];
  weatherFits: string[];
  abv: number;
  cocktails: string[];
  logo?: string;
}

export type RankedBrand = { brand: Brand; score: number; maxScore: number }
export type QuickPickMood = 'radiant'|'chill'|'spicy'|'savage'|'classy'|'adventurous'|'melancholy'

export type Answers = {
  mood?: string;
  place?: string;
  occasion?: string;
  weather?: string;
  flavor?: string;
  strength?: 'light'|'medium'|'strong';
  budget?: 'budget'|'mid'|'premium';
  mixerMood?: string; // e.g., bubbly, citrus, cola, tonic, ginger, none
}
