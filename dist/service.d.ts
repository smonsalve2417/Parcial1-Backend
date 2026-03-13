import type { insights } from "./models/response1.js";
export declare function getPokemonName(nombre: string): Promise<{
    insight: insights;
    code: number;
}>;
export declare function insightsToPokemon(insight: insights): {
    name: string;
    id: number;
    types: string[];
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
    totalStats: number;
    BattleScore: number;
};
//# sourceMappingURL=service.d.ts.map