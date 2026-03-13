async function gettop(limit) {
    const response = await fetch(` https://www.dnd5eapi.co/api/monsters`);
    const data = await response.json();
    const urls = data.results.map((monster) => "https://www.dnd5eapi.co" + monster.url);
    const topMonsters = urls.slice(0, limit);
    const promesas = topMonsters.map((url) => fetch(url));
    const respuestas = await Promise.all(promesas);
    const datos = await Promise.all(respuestas.map((res) => res.json()));
    return datos;
}
export async function main() {
    const datos = await gettop(5);
    const datosnorm = datos.reduce((acumulator, currentValue) => {
        acumulator.push({
            index: currentValue.index,
            name: currentValue.name,
            size: currentValue.size,
            type: currentValue.type,
            alignment: currentValue.alignment,
            cr: currentValue.challenge_rating,
            ac: Object.values(currentValue.armor_class).reduce((acum, current) => {
                return current.value > acum ? current.value : acum;
            }, 0),
            hp: currentValue.hit_points,
            speed: Object.keys(currentValue.speed).reduce((acum, current) => {
                const ahora = Number(current.replace(" ft.", ""));
                return ahora > acum ? ahora : acum;
            }, 0),
            stats: { "str": currentValue.strength, "dex": currentValue.dexterity, "con": currentValue.constitution, "int": currentValue.intelligence, "wis": currentValue.wisdom, "cha": currentValue.charisma },
            immuneCount: currentValue.damage_immunities.length,
            resistCount: currentValue.damage_resistances.length,
            vulnCount: currentValue.damage_vulnerabilities.length,
            hasLegendary: currentValue.legendary_actions?.length > 0
        });
        return acumulator;
    }, []);
}
export async function getPokemonName(nombre) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    const data = await response.json();
    if (response.status !== 200) {
        return { name: "Pokemon no encontrado", code: response.status };
    }
    return { name: data.name, code: response.status };
}
//# sourceMappingURL=service.js.map