export interface insights {
  name: string
  id: number
  types: string[]
  baseStats: BaseStats
  evolution: Evolution
  typeMatchups: TypeMatchups
}

export interface BaseStats {
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
  total: number
}

export interface Evolution {
  evolutionStages: number
  chainNames: string[]
  nextEvolutions: any[]
}

export interface TypeMatchups {
  weakAgainst: string[]
  resistantTo: string[]
}
