import { Router } from "express";
import { crearCategoria, 
        descripcion, 
        eliminarCategoria, 
        listarCategoria, 
        modificarCategoria, 
        mostrarCategoria, 
        ordenAlfabetico} from "../controllers/cotrollers.categoria";


const rutaCategoria = Router();

rutaCategoria.get("/categoria/:id", mostrarCategoria);
rutaCategoria.get("/categoria", listarCategoria);
rutaCategoria.get("/categoria-descrip", descripcion);
rutaCategoria.get("/categoria-ordena", ordenAlfabetico);
rutaCategoria.post("/categoria", crearCategoria);
rutaCategoria.put("/categoria", modificarCategoria);
rutaCategoria.delete("/categoria", eliminarCategoria);


export default rutaCategoria;