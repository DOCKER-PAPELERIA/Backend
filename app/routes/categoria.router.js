import { Router } from "express";
import { crearCategoria, 
        eliminarCategoria, 
        listarCategoria, 
        modificarCategoria, 
        mostrarCategoria } from "../controllers/cotrollers.categoria";


const rutaCategoria = Router();

rutaCategoria.get("/mostrarCategoria", mostrarCategoria);
rutaCategoria.get("/listarCategoria", listarCategoria);
rutaCategoria.post("/crearCategoria", crearCategoria);
rutaCategoria.put("/modificarCategoria", modificarCategoria);
rutaCategoria.delete("/eliminarCategoria", eliminarCategoria);


export default rutaCategoria;