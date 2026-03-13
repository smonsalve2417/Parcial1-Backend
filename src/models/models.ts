
export interface PokemonResponse {
  name: string;
  id: number;
  types:types[]

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