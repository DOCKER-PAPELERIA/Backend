import { Router } from "express";
import { cambiarContrasenaYEnviarCorreo, crearUsuario, 
        eliminarUsuario, 
        listarUsuario, 
        loginUsuario, 
        modificarUsuario, 
        mostrarUsuario, 
        mostrarUsuariobaseToken} from "../controllers/controllers.usuarios";
import { verifyToken } from "../middleware/oauth.js";

const rutaUsuario = Router();

rutaUsuario.get("/usuario/:id", mostrarUsuario );
rutaUsuario.get("/usuario", listarUsuario);
rutaUsuario.get("/usuario-perfil", verifyToken, mostrarUsuariobaseToken);
rutaUsuario.post("/usuario-nueva-contrsena", cambiarContrasenaYEnviarCorreo);
rutaUsuario.post("/usuario", verifyToken, crearUsuario);
rutaUsuario.put("/usuario", verifyToken, modificarUsuario);
rutaUsuario.delete("/usuario", verifyToken, eliminarUsuario);
rutaUsuario.post("/login", loginUsuario);

export default rutaUsuario;