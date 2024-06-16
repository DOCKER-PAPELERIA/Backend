import express from "express";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import ruta from "./routes/index.js";

config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.set("port", process.env.PORT || 3000);

app.use("/", ruta);

export default app;