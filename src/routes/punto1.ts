import express from "express";
//const Task = require("../models/Task");
const router = express.Router();

router.post("/", async (req, res) => { res.json(req.body); });


export default router;