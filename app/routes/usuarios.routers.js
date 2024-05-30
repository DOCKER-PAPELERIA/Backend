import { Router } from "express";
import { crearUsuario, 
        eliminarUsuario, 
        listarUsuario, 
        modificarUsuario, 
        mostrarUsuario } from "../controllers/controllers.usuarios";

const rutaUsuario = Router();

rutaUsuario.get("/mostrarUsuario/:id", mostrarUsuario );
rutaUsuario.get("/listarUsuario", listarUsuario);
rutaUsuario.post("/crearUsuario", crearUsuario);
rutaUsuario.put("/modificarUsuario", modificarUsuario);
rutaUsuario.delete("/eliminarUsuario", eliminarUsuario);

export default rutaUsuario;