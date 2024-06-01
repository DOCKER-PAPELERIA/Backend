import { Router } from "express";
import { crearRol, eliminarRol, modificarRol } from "../controllers/controllers.rol";


const rutaRol = Router();


rutaRol.post("/crearRol", crearRol);
rutaRol.put("/modificarRol", modificarRol);
rutaRol.delete("/eliminarRol", eliminarRol);



export default rutaRol;