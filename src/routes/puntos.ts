import express from "express";

import { getPokemonName, insightsToPokemon } from "../service.js";
import type { insights } from "../models/response1.js";
import type { result } from "../models/response2.js";

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

    pokemon1.BattleScore = pokemon1.hp*0.20 + pokemon1.attack*0.25 + pokemon1.defense*0.15 + pokemon1.specialAttack*0.20 + pokemon1.specialDefense*0.10 + pokemon1.speed*0.10;
    pokemon2.BattleScore = pokemon2.hp*0.20 + pokemon2.attack*0.25 + pokemon2.defense*0.15 + pokemon2.specialAttack*0.20 + pokemon2.specialDefense*0.10 + pokemon2.speed*0.10;

    pokemon1.BattleScore = parseFloat(pokemon1.BattleScore.toFixed(2));
    pokemon2.BattleScore = parseFloat(pokemon2.BattleScore.toFixed(2));

    pokemon1.pointsAdded = pokemon2.typeDisadvantages.reduce((acumulator:number, tipo) => {
        if (pokemon1.types.includes(tipo)) {
            acumulator += 20;
        }
        return acumulator;
    }, 0);

    pokemon1.pointsSubstracted = pokemon2.typeAdvantages.reduce((acumulator:number, tipo) => {
        if (pokemon1.types.includes(tipo)) {
            acumulator += 20;
        }
        return acumulator;
    }, 0);

    pokemon2.pointsAdded = pokemon1.typeDisadvantages.reduce((acumulator:number, tipo) => {
        if (pokemon2.types.includes(tipo)) {
            acumulator += 20;
        }
        return acumulator;
    }, 0);

    pokemon2.pointsSubstracted = pokemon1.typeDisadvantages.reduce((acumulator:number, tipo) => {
        if (pokemon2.types.includes(tipo)) {
            acumulator += 20;
        }
        return acumulator;
    }, 0);

    pokemon1.finalScore = pokemon1.BattleScore + pokemon1.pointsAdded - pokemon1.pointsSubstracted;
    pokemon2.finalScore = pokemon2.BattleScore + pokemon2.pointsAdded - pokemon2.pointsSubstracted;

    const result: result = {
        winner: "",
        ScoreDiference: 0,
        reason: ""
    };

    if (pokemon1.finalScore > pokemon2.finalScore) {
        result.winner = pokemon1.name;
        result.ScoreDiference = pokemon1.finalScore - pokemon2.finalScore;
        result.reason = `${pokemon1.name} tiene un puntaje final mayor  en la simulacion de combate`;
        if (pokemon1.pointsAdded > pokemon2.pointsAdded) {
            result.reason = `${pokemon1.name} tiene la ventaja de tipo frente a ${pokemon2.name}`;
        }else   if (pokemon1.BattleScore > pokemon2.BattleScore) {
            result.reason = `${pokemon1.name} tiene tiene mejores estadisticas base que ${pokemon2.name}`;
        }
        if ((pokemon1.pointsAdded > pokemon2.pointsAdded) && (pokemon1.BattleScore > pokemon2.BattleScore)) {
            result.reason = `${pokemon1.name} tiene la ventaja de tipo y ademas tiene mejores estadisticas qye${pokemon2.name}`;
        }


    } else if (pokemon2.finalScore > pokemon1.finalScore) {
        result.winner = pokemon2.name;
        result.ScoreDiference = pokemon2.finalScore - pokemon1.finalScore;  
        result.reason = `${pokemon2.name} tiene un puntaje final mayor  en la simulacion de combate`;
        if (pokemon2.pointsAdded > pokemon1.pointsAdded) {
            result.reason = `${pokemon2.name} tiene la ventaja de tipo frente a ${pokemon1.name}`;
        }else   if (pokemon2.BattleScore > pokemon1.BattleScore) {
            result.reason = `${pokemon2.name} tiene tiene mejores estadisticas base que ${pokemon1.name}`;
        }
        if ((pokemon2.pointsAdded > pokemon1.pointsAdded) && (pokemon2.BattleScore > pokemon1.BattleScore)) {
            result.reason = `${pokemon2.name} tiene la ventaja de tipo y ademas tiene mejores estadisticas qye${pokemon2.name}`;
        }
    } else {
        result.winner = "Empate";
        result.reason= "ambos Pokémon tienen el mismo puntaje final";
    }



    

    res.status(200).json({
        pokemon1: pokemon1,
        pokemon2: pokemon2,
        result: result
    });

    });







export default router;

