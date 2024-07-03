/**
 * Este es el archivo principal
 * @module crt-principal
 */
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import ruta from "./routes/index.js";

config();

const app = express();

/**
 * Inicia el servidor Express y monta las rutas principales.
 * @param {number} app.get - Puerto del servidor.
 * @param {string} process.env.PORT - Puerto configurado en el archivo .env o 3000 por defecto.
 * @param {middleware} app.use - Rutas principales definidas en './routes/index.js'.
 */

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.set("port", process.env.PORT || 3000);


app.use("/", ruta);

export default app;