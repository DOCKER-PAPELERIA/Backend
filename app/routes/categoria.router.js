import { Router } from "express";
import {Nuevo, Viejo, 
        crearCategoria, 
        descripcion, 
        eliminarCategoria, 
        listarCategoria, 
        modificarCategoria, 
        mostrarCategoria, 
        ordenAlfabetico} from "../controllers/cotrollers.categoria";
import { verifyToken } from "../middleware/oauth";


const rutaCategoria = Router();

rutaCategoria.get("/categoria/:id", mostrarCategoria);
rutaCategoria.get("/categoria", listarCategoria);
rutaCategoria.get("/categoria-descrip", descripcion);
rutaCategoria.get("/categoria-ordena", ordenAlfabetico);
rutaCategoria.get("/categoria-nuevo", Nuevo);
rutaCategoria.get("/categoria-viejo", Viejo);
rutaCategoria.post("/categoria", verifyToken, crearCategoria);
rutaCategoria.put("/categoria", verifyToken, modificarCategoria);
rutaCategoria.delete("/categoria", verifyToken, eliminarCategoria);


export default rutaCategoria;