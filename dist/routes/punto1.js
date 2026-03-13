import express from "express";
import { getPokemonName, insightsToPokemon } from "../service.js";
//const Task = require("../models/Task");
const router = express.Router();
router.get("/pokemon/insights/:name", async (req, res) => {
    const name = req.params.name;
    if (name.length === 0) {
        return res.status(400).json({
            error: "No se ha proporcionado un nombre en la solicitud"
        });
    }
    const response = await getPokemonName(name);
    if (response.code !== 200) {
        return res.status(response.code).json({ error: "" });
    }
    res.status(200).json(response.insight);
});
router.get("/pokemon/battle/:name1/:name2", async (req, res) => {
    const name1 = req.params.name1;
    const name2 = req.params.name2;
    if (name1.length === 0 || name2.length === 0) {
        return res.status(400).json({
            error: "No se han proporcionado ambos nombres en la solicitud"
        });
    }
    const response1 = await getPokemonName(name1);
    const response2 = await getPokemonName(name2);
    if (response1.code !== 200 || response2.code !== 200) {
        return res.status(404).json({ error: "Uno o ambos Pokémon no encontrados" });
    }
    const pokemon1 = insightsToPokemon(response1.insight);
    const pokemon2 = insightsToPokemon(response2.insight);
    pokemon1.BattleScore = pokemon1.hp * 0.20 + pokemon1.attack * 0.25 + pokemon1.defense * 0.15 + pokemon1.specialAttack * 0.20 + pokemon1.specialDefense * 0.10 + pokemon1.speed * 0.10;
    pokemon2.BattleScore = pokemon2.hp * 0.20 + pokemon2.attack * 0.25 + pokemon2.defense * 0.15 + pokemon2.specialAttack * 0.20 + pokemon2.specialDefense * 0.10 + pokemon2.speed * 0.10;
    pokemon1.BattleScore = parseFloat(pokemon1.BattleScore.toFixed(2));
    pokemon2.BattleScore = parseFloat(pokemon2.BattleScore.toFixed(2));
    res.status(200).json({
        pokemon1: pokemon1,
        pokemon2: pokemon2,
    });
});
export default router;
//# sourceMappingURL=punto1.js.map