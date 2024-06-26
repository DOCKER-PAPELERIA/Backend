import { Router } from "express";
import { crearUsuario, 
        eliminarUsuario, 
        listarUsuario, 
        loginUsuario, 
        modificarUsuario, 
        mostrarUsuario } from "../controllers/controllers.usuarios";
import { verifyToken } from "../middleware/oauth.js";

const rutaUsuario = Router();

rutaUsuario.get("/usuario/:id", mostrarUsuario );
rutaUsuario.get("/usuario", listarUsuario);
rutaUsuario.post("/usuario", verifyToken, crearUsuario);
rutaUsuario.put("/usuario", verifyToken, modificarUsuario);
rutaUsuario.delete("/usuario", verifyToken, eliminarUsuario);
rutaUsuario.post("/login", loginUsuario);

export default rutaUsuario;