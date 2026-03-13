import express from "express";
import { main } from "../service.js";
import { getPokemonName } from "../service.js";
//const Task = require("../models/Task");
const router = express.Router();
router.post("/", async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: "No se ha proporcionado un cuerpo de solicitud"
        });
    }
    res.status(200).json(req.body);
});
router.get("/:name", async (req, res) => {
    const name = req.params.name;
    if (name.length === 0) {
        return res.status(400).json({
            error: "No se ha proporcionado un nombre en la solicitud"
        });
    }
    const response = await getPokemonName(name);
    if (response.code !== 200) {
        return res.status(response.code).json({ error: response.name });
    }
    res.status(200).json({ name: response.name });
});
export default router;
//# sourceMappingURL=punto1.js.map