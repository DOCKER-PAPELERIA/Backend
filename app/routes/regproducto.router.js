import { Router } from "express";
import { crearRegproducto, 
        eliminarRegproducto, 
        listarRegproducto, 
        modificarRegproducto, 
        mostrarRegproducto } from "../controllers/controllers.regproducto";


const rutaRegproducto = Router();

rutaRegproducto.get("/regproducto/:id", mostrarRegproducto);
rutaRegproducto.get("/regproducto", listarRegproducto);
rutaRegproducto.post("/regproducto", crearRegproducto);
rutaRegproducto.put("/regproducto", modificarRegproducto);
rutaRegproducto.delete("/regproducto", eliminarRegproducto);



export default rutaRegproducto;