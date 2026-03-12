import express from "express";
import punto1 from "./routes/punto1.js";
const app = express();
app.use(express.json());
app.use("/tasks", punto1);
app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
//# sourceMappingURL=server.js.map