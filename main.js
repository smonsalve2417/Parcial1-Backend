//Fetch
async function geturl() {
  const response = await fetch(
    ` https://www.dnd5eapi.co/api/monsters`
  );
  const data = await response.json();
  const urls = data.results.map((monster) => monster.url);
  console.log(urls);
}

async function gettop(limit) {
  const response = await fetch(
    ` https://www.dnd5eapi.co/api/monsters`
  );
  const data = await response.json();
  const urls = data.results.map((monster) =>"https://www.dnd5eapi.co" + monster.url);
  const topMonsters = urls.slice(0, limit);
  const promesas = topMonsters.map((url) => fetch(url));
  const respuestas =await Promise.all(promesas);
  const datos = await Promise.all(respuestas.map((res) => res.json()));

  console.log(datos);
  return datos;
}

const datos = await gettop(5);
//Punto A
//Normalizacion
const datosnorm = datos.reduce((acumulator,currentValue)=>{

    acumulator.push({ 
        index:currentValue.index, 
        name: currentValue.name ,
        size: currentValue.size, 
        type: currentValue.type, 
        alignment: currentValue.alignment, 
        cr: currentValue.challenge_rating,
        ac: Object.values(currentValue.armor_class).reduce((acum,current)=>{
            console.log(current.value)
            return current.value > acum ? current.value : acum 
        },0), 
        hp: currentValue.hit_points, 
        speed:Object.keys(currentValue.speed).reduce((acum,current)=>{
            current = Number(current.replace(" ft.",""))
            return current > acum ? current : acum }
            ,0), 
        stats: {"str": currentValue.strength,"dex": currentValue.dexterity, "con":currentValue.constitution, "int": currentValue.intelligence, "wis":currentValue.wisdom, "cha":currentValue.charisma}, 
        immuneCount:currentValue.damage_immunities.length, 
        resistCount:currentValue.damage_resistances.length, 
        vulnCount:currentValue.damage_vulnerabilities.length,
        hasLegendary: currentValue.legendary_actions?.length > 0
                        })
        return acumulator;     
},[])
//Punto B
//Punto B1
const monsters_hp80_cr15=datosnorm.filter(monster=> monster.hp >=80 && monster.cr >=15)
console.log(monsters_hp80_cr15)
//Punto B2
const monsters_dragon_cr6=datosnorm.find(monster=> monster.type === "dragon" && monster.cr >=6)
console.log(monsters_dragon_cr6)
//Puntos B3
const legendary_monsters = datosnorm.filter(monster => monster.hasLegendary=== true)
console.log(legendary_monsters)
//Punto B4
const monsters_stats6_hp0=datosnorm.every(monster=> Object.keys(monster.stats).length >= 6 && monster.hp > 0)
console.log(monsters_stats6_hp0)
//Punto B5
async function reduceMonsters() {
    const result = datosnorm.reduce((acc, monster) => {
        if (!acc[monster.type]) {
            acc[monster.type] = {
                count: 0,
                totalCR: 0,
                maxHP: 0
            };
        }
        acc[monster.type].count++;
        acc[monster.type].totalCR += monster.cr;
        acc[monster.type].maxHP = Math.max(acc[monster.type].maxHP, monster.hp);
        return acc;
    }, {});
    
    // Caclculo el avg de cr
    const output = {};
    for (const type in result) {
        output[type] = {
            count: result[type].count,
            avgCR: parseFloat((result[type].totalCR / result[type].count).toFixed(1)),
            maxHP: result[type].maxHP
        };
    }
    
    console.log(output);
    return output;
}
reduceMonsters()
//Punto B6
const bukect={
    "0-1": 0,
    "2-4":0,
    "5-9":0,
    "10+":0
};
const cr_agropu = datosnorm.reduce(cr_agropation,bukect);
function cr_agropation(bucket,monster){
    const cr=monster.cr
    if (cr >= 0 && cr <2){
        bucket["0-1"]=++bucket["0-1"]
    }else if(cr >= 2 && cr <5){
        bucket["2-4"]=++bucket["2-4"]
    }else if(cr >= 5 && cr <10){
        bucket["5-9"]=++bucket["5-9"]
    }else if(cr >=10){
        bucket["10+"]=++bucket["10+"]
    }
    return bucket
};

console.log(cr_agropu);