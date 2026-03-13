

import type { damageRelations, evolutionChain, EvolvesTo, PokemonResponse } from "./models/models.js";
import type { insights } from "./models/response1.js";
import type { pokemon } from "./models/response2.js";

async function gettop(limit: number) {
  const response = await fetch(
    ` https://www.dnd5eapi.co/api/monsters`
  );
  const data = await response.json();
  const urls = data.results.map((monster: { url: string }) =>"https://www.dnd5eapi.co" + monster.url);
  const topMonsters = urls.slice(0, limit);
  const promesas = topMonsters.map((url: string) => fetch(url));
  const respuestas =await Promise.all(promesas);
  const datos = await Promise.all(respuestas.map((res) => res.json()));
  return  datos;
}


/* export async function main() {
  const datos = await gettop(5);

  const datosnorm = datos.reduce<Monster[]>((acumulator,currentValue)=>{

    acumulator.push({ 
        index:currentValue.index, 
        name: currentValue.name ,
        size: currentValue.size, 
        type: currentValue.type, 
        alignment: currentValue.alignment, 
        cr: currentValue.challenge_rating,
        


        ac: Object.values(currentValue.armor_class).reduce((acum:number,current:any)=>{
           
            return current.value > acum ? current.value : acum 
        }, 0), 
        


        hp: currentValue.hit_points, 
        speed:Object.keys(currentValue.speed).reduce((acum:number,current:string)=>{
            const ahora: number = Number(current.replace(" ft.",""))
            return ahora > acum ? ahora : acum }
            ,0), 
        stats: {"str": currentValue.strength,"dex": currentValue.dexterity, "con":currentValue.constitution, "int": currentValue.intelligence, "wis":currentValue.wisdom, "cha":currentValue.charisma}, 
        immuneCount:currentValue.damage_immunities.length, 
        resistCount:currentValue.damage_resistances.length, 
        vulnCount:currentValue.damage_vulnerabilities.length,
        hasLegendary: currentValue.legendary_actions?.length > 0
                        })
        return acumulator;     
  }, [])
  
} */

  function recursivo(evolves_to: EvolvesTo[], nombres: string[]) {
    if (evolves_to.length === 0) {
      return nombres;
    }
    const evolucion = evolves_to[0];
    if (!evolucion) {
      return nombres;
    }
    nombres.push(evolucion.species?.name || "desconocido");
    return recursivo(evolucion.evolves_to, nombres);
  }


export async function getPokemonName(nombre: string):Promise<{ insight: insights; code: number }> { 
  
 
  const insight: insights =  {
      name: "...", id: 1, types: [],
      baseStats: { hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, total: 0, speed: 0 },
      evolution: {
        evolutionStages: 0,
        chainNames: [],
        nextEvolutions: []
      },
      typeMatchups:{
        weakAgainst: [],
        resistantTo: []
      }
    };
  
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${nombre}`
  );
  const data: PokemonResponse = await response.json();
  if (response.status !== 200) { 
    return { insight: insight, code: response.status };
  }

  insight.id = data.id;
  
  insight.name = data.name;
  
  insight.types = data.types.map((typeInfo) => typeInfo.type.name).sort();

  insight.baseStats.hp = data.stats.find(stat => stat.stat.name === "hp")?.base_stat || 0;
  insight.baseStats.attack = data.stats.find(stat => stat.stat.name === "attack")?.base_stat || 0;
  insight.baseStats.defense = data.stats.find(stat => stat.stat.name === "defense")?.base_stat || 0;
  insight.baseStats.specialAttack = data.stats.find(stat => stat.stat.name === "special-attack")?.base_stat || 0;
  insight.baseStats.specialDefense = data.stats.find(stat => stat.stat.name === "special-defense")?.base_stat || 0;
  insight.baseStats.speed = data.stats.find(stat => stat.stat.name === "speed")?.base_stat || 0;
  insight.baseStats.total = Object.values(insight.baseStats).reduce((sum, value) => sum + value, 0);

  const speciesResponse = await fetch(data.species.url);
  const speciesData = await speciesResponse.json();

  const evolutionResponse = await fetch(speciesData.evolution_chain.url);
  const evolutionData: evolutionChain = await evolutionResponse.json();
  
  
  insight.evolution.chainNames = [evolutionData.chain.species.name];





  insight.evolution.chainNames = recursivo(evolutionData.chain.evolves_to, insight.evolution.chainNames);
  insight.evolution.evolutionStages = insight.evolution.chainNames.length;

  const urls = insight.types.map((tipo) => "https://pokeapi.co/api/v2/type/" + tipo);
  
  const promesas = urls.map((url) => fetch(url));
  const respuestas = await Promise.all(promesas);
  const datos: damageRelations[] = await Promise.all(respuestas.map((res) => res.json()));


  insight.typeMatchups.weakAgainst = datos.reduce<string[]>((acumulator,currentValue)=>{
    acumulator.push(...currentValue.damage_relations.double_damage_from.map((tipo) => tipo.name));
    return acumulator;     
  }, [])
  insight.typeMatchups.weakAgainst = insight.typeMatchups.weakAgainst.reduce((unique: string[], tipo) => {
    if (!unique.includes(tipo) && !insight.types.includes(tipo)) {
      unique.push(tipo);
    }
    return unique;
  }, []);
  insight.typeMatchups.weakAgainst.sort();

  insight.typeMatchups.resistantTo = datos.reduce<string[]>((acumulator,currentValue)=>{
    acumulator.push(...currentValue.damage_relations.double_damage_to.map((tipo) => tipo.name));
    return acumulator;     
  }, [])
  insight.typeMatchups.resistantTo = insight.typeMatchups.resistantTo.reduce((unique: string[], tipo) => {
    if (!unique.includes(tipo) && !insight.types.includes(tipo)) {
      unique.push(tipo);
    }
    return unique;
  }, []);
  insight.typeMatchups.resistantTo.sort();




  return { insight: insight, code: response.status };

}


export function insightsToPokemon(insight: insights):pokemon {
  const pokemon = {
    name: insight.name,
    id: insight.id,
    types: insight.types,
    hp: insight.baseStats.hp,
    attack: insight.baseStats.attack,
    defense: insight.baseStats.defense,
    specialAttack: insight.baseStats.specialAttack,
    specialDefense: insight.baseStats.specialDefense,
    speed: insight.baseStats.speed,
    totalStats: insight.baseStats.total,
    BattleScore: 0,
    typeAdvantages: insight.typeMatchups.resistantTo,
    typeDisadvantages: insight.typeMatchups.weakAgainst,
    pointsAdded: 0,
    pointsSubstracted: 0
  };
  return pokemon;
}