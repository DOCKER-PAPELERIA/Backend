import { Router } from "express";
import {crearCategoria,  
        eliminarCategoria, 
        listarCategoria, 
        modificarCategoria, 
        mostrarCategoria} from "../controllers/cotrollers.categoria";
import { verifyToken } from "../middleware/oauth";


const rutaCategoria = Router();

rutaCategoria.get("/categoria/:id", mostrarCategoria);
rutaCategoria.get("/categoria", listarCategoria);
rutaCategoria.post("/categoria", verifyToken, crearCategoria);
rutaCategoria.put("/categoria", verifyToken, modificarCategoria);
rutaCategoria.delete("/categoria", verifyToken, eliminarCategoria);


export default rutaCategoria;