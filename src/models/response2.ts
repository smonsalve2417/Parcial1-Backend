export interface pokemon {
  name: string
  id: number
  types: string[]
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
    totalStats: number 
    BattleScore: number
    typeAdvantages: string[]
    typeDisadvantages: string[]
    pointsAdded: number
    pointsSubstracted: number
    finalScore?: number
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


export interface result { 

    winner: string
    ScoreDiference: number
    reason: string
}