import { Router } from "express";
import { crearUsuario, 
        eliminarUsuario, 
        listarUsuario, 
        loginUsuario, 
        modificarUsuario, 
        mostrarUsuario } from "../controllers/controllers.usuarios";

const rutaUsuario = Router();

rutaUsuario.get("/usuario/:id", mostrarUsuario );
rutaUsuario.get("/usuario", listarUsuario);
rutaUsuario.post("/usuario", crearUsuario);
rutaUsuario.put("/usuario", modificarUsuario);
rutaUsuario.delete("/usuario", eliminarUsuario);
rutaUsuario.post("/login", loginUsuario)

export default rutaUsuario;