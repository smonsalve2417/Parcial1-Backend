
export interface PokemonResponse {
  name: string;
  id: number;
  types: types[]
  stats: Stat[]
  species: Species


}

export interface Species {
  name: string
  url: string
}

export interface Stat {
  base_stat: number
  effort: number
  stat: Stat2
}

export interface Stat2 {
  name: string
  url: string
}

export interface types { 
  type:{name: string; url: string}

}

export interface Pokemon {
  name: string;
  id: number;
  types:string[];
}

export interface PokemonStats { 
  hp: number;
  attack: number;
  defense: number;
  speciaAttack: number;
  specialDefense: number;
  speed: number;
  suma: number;
}

export interface evolutionChain {
  baby_trigger_item: any
  chain: Chain
  id: number
}

export interface Chain {
  evolution_details: any[]
  evolves_to: EvolvesTo[]
  is_baby: boolean
  species: Species
}

export interface EvolvesTo {
  evolves_to: EvolvesTo[]
  is_baby: boolean
  species: Species
}


export interface Trigger {
  name: string
  url: string
}

export interface EvolvesTo2 {
  evolution_details: EvolutionDetail2[]
  evolves_to: any[]
  is_baby: boolean
  species: Species
}

export interface EvolutionDetail2 {
  base_form_id: any
  gender: any
  held_item: any
  item: any
  known_move: any
  known_move_type: any
  location: any
  min_affection: any
  min_beauty: any
  min_damage_taken: any
  min_happiness: any
  min_level: number
  min_move_count: any
  min_steps: any
  needs_multiplayer: boolean
  needs_overworld_rain: boolean
  party_species: any
  party_type: any
  region_id: any
  relative_physical_stats: any
  time_of_day: string
  trade_species: any
  trigger: Trigger2
  turn_upside_down: boolean
  used_move: any
}

export interface Trigger2 {
  name: string
  url: string
}

export interface Species {
  name: string
  url: string
}

export interface Species2 {
  name: string
  url: string
}

export interface Species3 {
  name: string
  url: string
}


export interface damageRelations {
  damage_relations: DamageRelations
}

export interface DamageRelations {
  double_damage_from: DoubleDamageFrom[]
  double_damage_to: DoubleDamageTo[]
  half_damage_from: HalfDamageFrom[]
  half_damage_to: HalfDamageTo[]
  no_damage_from: any[]
  no_damage_to: any[]
}

export interface DoubleDamageFrom {
  name: string
  url: string
}

export interface DoubleDamageTo {
  name: string
  url: string
}

export interface HalfDamageFrom {
  name: string
  url: string
}

export interface HalfDamageTo {
  name: string
  url: string
}