import express from "express";
import punto1 from "./routes/puntos.js";
const app = express();

app.use(express.json());
app.use("/v1", punto1);


app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
