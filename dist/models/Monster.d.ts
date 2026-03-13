export interface Monster {
    index: string;
    name: string;
    size: string;
    type: string;
    alignment: string;
    cr: number;
    ac: number;
    hp: number;
    speed: number;
    stats: Stats;
    immuneCount: number;
    resistCount: number;
    vulnCount: number;
    hasLegendary: boolean;
}
export interface Stats {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
}
export interface PokemonResponse {
    name: string;
    id: number;
}
export interface Pokemon {
    name: string;
    id: number;
    types: string[];
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
//# sourceMappingURL=Monster.d.ts.map