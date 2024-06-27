import { Router } from "express";
import {FiltrarProductos, crearCategoria,  
        eliminarCategoria, 
        listarCategoria, 
        modificarCategoria, 
        mostrarCategoria} from "../controllers/cotrollers.categoria";
import { verifyToken } from "../middleware/oauth";


const rutaCategoria = Router();

rutaCategoria.get("/categoria/:id", mostrarCategoria);
rutaCategoria.get("/categoria", listarCategoria);
rutaCategoria.get("/catego-filtro",FiltrarProductos);
rutaCategoria.post("/categoria", verifyToken, crearCategoria);
rutaCategoria.put("/categoria", verifyToken, modificarCategoria);
rutaCategoria.delete("/categoria", verifyToken, eliminarCategoria);


export default rutaCategoria;