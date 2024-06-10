import { Router } from "express";
import { crearRegproducto, 
        eliminarRegproducto, 
        listarRegproducto, 
        modificarRegproducto, 
        mostrarRegproducto } from "../controllers/controllers.regproducto";


const rutaRegproducto = Router();

rutaRegproducto.get("/mostrarRegproducto/:id", mostrarRegproducto);
rutaRegproducto.get("/listarRegproducto", listarRegproducto);
rutaRegproducto.post("/crearRegproducto", crearRegproducto);
rutaRegproducto.put("/modificarRegproducto", modificarRegproducto);
rutaRegproducto.delete("/eliminarRegproducto", eliminarRegproducto);



export default rutaRegproducto;