export interface Pokemon {
  id: string
  dex: number
  name: string
  image: string
  types: string[]
  cp: number
  hp: number
  weight: number
  height: number
  description: string
  location: string
  caughtOn: string
  accent: string
  moves: { name: string; type: string; power: number }[]
}
const art = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
export const pokemon: Pokemon[] = [
  {
    id: 'pikachu-1',
    dex: 25,
    name: 'Pikachu',
    image: art(25),
    types: ['Electric'],
    cp: 842,
    hp: 86,
    weight: 6,
    height: 0.4,
    accent: '#eab83f',
    location: 'Tech Green',
    caughtOn: '2026-10-16',
    description:
      'When several of these Pokémon gather, their electricity can build and cause lightning storms. This little campus companion brings a spark to every adventure.',
    moves: [
      { name: 'Thunder Shock', type: 'Electric', power: 5 },
      { name: 'Thunderbolt', type: 'Electric', power: 80 },
    ],
  },
  {
    id: 'bulbasaur-1',
    dex: 1,
    name: 'Bulbasaur',
    image: art(1),
    types: ['Grass', 'Poison'],
    cp: 621,
    hp: 72,
    weight: 6.9,
    height: 0.7,
    accent: '#77b59a',
    location: 'Kessler Campanile',
    caughtOn: '2026-10-15',
    description:
      'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon. It loves a quiet afternoon on the campus lawn.',
    moves: [
      { name: 'Vine Whip', type: 'Grass', power: 7 },
      { name: 'Power Whip', type: 'Grass', power: 90 },
    ],
  },
  {
    id: 'charmander-1',
    dex: 4,
    name: 'Charmander',
    image: art(4),
    types: ['Fire'],
    cp: 735,
    hp: 68,
    weight: 8.5,
    height: 0.6,
    accent: '#df926e',
    location: 'Bobby Dodd Stadium',
    caughtOn: '2026-10-14',
    description:
      'The flame at the tip of its tail makes a sound as it burns. You can only hear it in quiet places. Its game-day enthusiasm is unmatched.',
    moves: [
      { name: 'Ember', type: 'Fire', power: 10 },
      { name: 'Flame Burst', type: 'Fire', power: 70 },
    ],
  },
  {
    id: 'squirtle-1',
    dex: 7,
    name: 'Squirtle',
    image: art(7),
    types: ['Water'],
    cp: 588,
    hp: 74,
    weight: 9,
    height: 0.5,
    accent: '#79b3d4',
    location: 'Clough Commons',
    caughtOn: '2026-10-13',
    description:
      'After birth, its back swells and hardens into a shell. It powerfully sprays foam from its mouth. Often spotted taking a break near campus fountains.',
    moves: [
      { name: 'Water Gun', type: 'Water', power: 5 },
      { name: 'Aqua Tail', type: 'Water', power: 50 },
    ],
  },
  {
    id: 'eevee-1',
    dex: 133,
    name: 'Eevee',
    image: art(133),
    types: ['Normal'],
    cp: 496,
    hp: 65,
    weight: 6.5,
    height: 0.3,
    accent: '#b9a087',
    location: 'Crosland Tower',
    caughtOn: '2026-10-12',
    description:
      'Its irregularly configured DNA is affected by its surroundings. It evolves if its environment changes. A curious friend with endless possibilities.',
    moves: [
      { name: 'Quick Attack', type: 'Normal', power: 8 },
      { name: 'Swift', type: 'Normal', power: 60 },
    ],
  },
  {
    id: 'mudkip-1',
    dex: 258,
    name: 'Mudkip',
    image: art(258),
    types: ['Water'],
    cp: 230,
    hp: 52,
    weight: 3.64,
    height: 0.27,
    accent: '#8baddb',
    location: 'Turtle Pond',
    caughtOn: '2026-10-11',
    description:
      'The fin on Mudkip’s head acts as highly sensitive radar. Using this fin to sense movements of water and air, this Pokémon can determine what is taking place around it.',
    moves: [
      { name: 'Water Gun', type: 'Water', power: 5 },
      { name: 'Dig', type: 'Ground', power: 100 },
    ],
  },
]
export const quests = [
  {
    id: 'q1',
    title: 'A little campus curiosity',
    description:
      'Visit the Kessler Campanile and find your first campus companion.',
    place: 'Kessler Campanile',
    xp: 250,
    date: 'Oct 15, 2026',
    icon: '⌖',
  },
  {
    id: 'q2',
    title: 'Under the Friday night lights',
    description: 'Explore Bobby Dodd Stadium and catch a Fire-type Pokémon.',
    place: 'Bobby Dodd Stadium',
    xp: 400,
    date: 'Oct 14, 2026',
    icon: '⚑',
  },
  {
    id: 'q3',
    title: 'A new chapter',
    description: 'Discover a Pokémon near the library. Study buddy acquired.',
    place: 'Crosland Tower',
    xp: 200,
    date: 'Oct 12, 2026',
    icon: '▤',
  },
]
