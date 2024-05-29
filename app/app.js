import express from "express";
import { config } from "dotenv";
import ruta from "./routes/index.js";

config();

const app = express();
app.use(express.json());

app.set("port", process.env.PORT || 3000);

app.use("/", ruta);

export default app;