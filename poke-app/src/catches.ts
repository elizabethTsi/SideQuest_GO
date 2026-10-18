import { pokemon, type Pokemon } from './data'

export type EncounterQuest = { id: number; title: string; location: string }
export type CatchRecord = {
  id: string
  speciesId: string
  questId: number
  location: string
  caughtOn: string
}
export const CATCHES_KEY = 'sidequest-catches-v1'

export function readCatches(): CatchRecord[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(CATCHES_KEY) || '[]')
    if (!Array.isArray(value)) return []
    return value.filter(
      (entry): entry is CatchRecord =>
        entry &&
        typeof entry.id === 'string' &&
        pokemon.some((p) => p.id === entry.speciesId) &&
        typeof entry.questId === 'number' &&
        typeof entry.location === 'string' &&
        typeof entry.caughtOn === 'string' &&
        !Number.isNaN(Date.parse(entry.caughtOn)),
    )
  } catch {
    return []
  }
}

export function caughtPokemon(record: CatchRecord): Pokemon {
  const species = pokemon.find((p) => p.id === record.speciesId)!
  return {
    ...species,
    id: record.id,
    location: record.location,
    caughtOn: record.caughtOn,
  }
}

export function createEncounter(quest: EncounterQuest): {
  pokemon: Pokemon
  record: CatchRecord
} {
  const species = pokemon[Math.floor(Math.random() * pokemon.length)]
  const now = new Date()
  const record = {
    id: `caught-${crypto.randomUUID()}`,
    speciesId: species.id,
    questId: quest.id,
    location: quest.location,
    caughtOn: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`,
  }
  return { pokemon: caughtPokemon(record), record }
}
