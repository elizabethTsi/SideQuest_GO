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
    id: 'buzz-1',
    dex: 1,
    name: 'Buzz',
    image: '/images/sidequest.png',
    types: ['Electric', 'Flying'],
    cp: 842,
    hp: 86,
    weight: 6.0,
    height: 0.4,
    accent: '#eab83f',
    location: 'Bobby Dodd Stadium',
    caughtOn: '2026-10-16',
    description:
      'The legendary Yellow Jacket spirit of Georgia Tech. Always bringing high energy to game day and campus life.',
    moves: [
      { name: 'Stinger Zap', type: 'Electric', power: 75 },
      { name: 'Buzz Swoop', type: 'Flying', power: 60 },
    ],
  },
  {
    id: 'squirrel-1',
    dex: 2,
    name: 'Squirrel',
    image: '/images/squirrel.png',
    types: ['Normal'],
    cp: 310,
    hp: 45,
    weight: 0.8,
    height: 0.2,
    accent: '#a87b51',
    location: 'Kessler Campanile',
    caughtOn: '2026-10-14',
    description:
      'The undisputed ruler of campus trees. Expert at dash-evasion and acquiring dropped snacks from students.',
    moves: [
      { name: 'Quick Scratch', type: 'Normal', power: 40 },
      { name: 'Acorn Toss', type: 'Normal', power: 55 },
    ],
  },
  {
    id: 'campus-cat-1',
    dex: 3,
    name: 'Cat',
    image: '/images/campus cat.png',
    types: ['Normal'],
    cp: 450,
    hp: 60,
    weight: 4.2,
    height: 0.3,
    accent: '#d9822b',
    location: 'Clough Commons',
    caughtOn: '2026-10-13',
    description:
      'A beloved feline resident who lounges outside lecture halls and grades student papers with quiet disapproval.',
    moves: [
      { name: 'Tail Whip', type: 'Normal', power: 35 },
      { name: 'Shadow Claw', type: 'Ghost', power: 70 },
    ],
  },
  {
    id: 'sideways-dog-1',
    dex: 4,
    name: 'Sideways',
    image: '/images/sideways the dog.png',
    types: ['Normal'],
    cp: 510,
    hp: 70,
    weight: 12.5,
    height: 0.5,
    accent: '#708090',
    location: 'Student Center',
    caughtOn: '2026-10-12',
    description:
      'Famous for walking at quirky angles across campus lawns. Always happy to accompany students on their walk to class.',
    moves: [
      { name: 'Bite', type: 'Dark', power: 60 },
      { name: 'Joyful Bark', type: 'Normal', power: 50 },
    ],
  },
  {
    id: 'robot-1',
    dex: 5,
    name: 'Robot',
    image: art(81),
    types: ['Electric', 'Steel'],
    cp: 680,
    hp: 75,
    weight: 60.0,
    height: 0.8,
    accent: '#4682b4',
    location: 'Klaus Advanced Computing Building',
    caughtOn: '2026-10-11',
    description:
      'An autonomous engineering marvel built in the labs of Klaus. Computes complex algorithms while buzzing down the hallways.',
    moves: [
      { name: 'Spark', type: 'Electric', power: 65 },
      { name: 'Flash Cannon', type: 'Steel', power: 80 },
    ],
  },
  {
    id: 'fox-1',
    dex: 6,
    name: 'Fox',
    image: art(133),
    types: ['Normal'],
    cp: 540,
    hp: 65,
    weight: 6.5,
    height: 0.3,
    accent: '#b9a087',
    location: 'Crosland Tower',
    caughtOn: '2026-10-10',
    description:
      'A clever campus fox spotted roaming near the residence halls at dusk. Extremely swift and intelligent.',
    moves: [
      { name: 'Quick Attack', type: 'Normal', power: 45 },
      { name: 'Swift', type: 'Normal', power: 60 },
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
    title: 'Under the night lights',
    description: 'Explore Bobby Dodd Stadium and catch a high-energy companion.',
    place: 'Bobby Dodd Stadium',
    xp: 400,
    date: 'Oct 14, 2026',
    icon: '⚑',
  },
  {
    id: 'q3',
    title: 'A new chapter',
    description: 'Discover a companion near the library. Study buddy acquired.',
    place: 'Crosland Tower',
    xp: 200,
    date: 'Oct 12, 2026',
    icon: '▤',
  },
]