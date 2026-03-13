
import type { PokemonResponse } from "./models/models.js";
import type { insights } from "./models/response1.js";

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


// export async function main() {
//   const datos = await gettop(5);

//   const datosnorm = datos.reduce<Monster[]>((acumulator,currentValue)=>{

//     acumulator.push({ 
//         index:currentValue.index, 
//         name: currentValue.name ,
//         size: currentValue.size, 
//         type: currentValue.type, 
//         alignment: currentValue.alignment, 
//         cr: currentValue.challenge_rating,
        


//         ac: Object.values(currentValue.armor_class).reduce((acum:number,current:any)=>{
           
//             return current.value > acum ? current.value : acum 
//         }, 0), 
        


//         hp: currentValue.hit_points, 
//         speed:Object.keys(currentValue.speed).reduce((acum:number,current:string)=>{
//             const ahora: number = Number(current.replace(" ft.",""))
//             return ahora > acum ? ahora : acum }
//             ,0), 
//         stats: {"str": currentValue.strength,"dex": currentValue.dexterity, "con":currentValue.constitution, "int": currentValue.intelligence, "wis":currentValue.wisdom, "cha":currentValue.charisma}, 
//         immuneCount:currentValue.damage_immunities.length, 
//         resistCount:currentValue.damage_resistances.length, 
//         vulnCount:currentValue.damage_vulnerabilities.length,
//         hasLegendary: currentValue.legendary_actions?.length > 0
//                         })
//         return acumulator;     
//   }, [])
  
// }


export async function getPokemonName(nombre: string):Promise<{ insight: insights; code: number }> { 
  
  const insight: insights = {
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

  insight.id= data.id;
  insight.name= data.name;
  insight.types= Object.keys(data.types).sort()



  return { insight: insight, code: response.status };

}