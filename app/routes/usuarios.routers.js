/**
 * este es las rutas de usuarios 
 * @module ctr-usaurio-ruta
 */
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

/**
 * @route GET /usuario/:id
 * @description Obtiene un usuario específico por ID
 * @access Public
 */
rutaUsuario.get("/usuario/:id", mostrarUsuario );

/**
 * @route GET /usuario
 * @description Lista todos los usuarios
 * @access Public
 */
rutaUsuario.get("/usuario", listarUsuario);

/**
 * @route GET /usuario-perfil
 * @description Obtiene el perfil del usuario actual basado en el token
 * @access Private
 */
rutaUsuario.get("/usuario-perfil", verifyToken, mostrarUsuariobaseToken);

/**
 * @route POST /usuario-nueva-contrasena
 * @description Cambia la contraseña de un usuario y envía un correo de notificación
 * @access Public
 */
rutaUsuario.post("/usuario-nueva-contrasena", cambiarContrasenaYEnviarCorreo);

/**
 * @route POST /usuario
 * @description Crea un nuevo usuario
 * @access Public
 */
rutaUsuario.post("/usuario", crearUsuario);

/**
 * @route PUT /usuario
 * @description Modifica un usuario existente
 * @access Private
 */
rutaUsuario.put("/usuario", verifyToken, modificarUsuario);

/**
 * @route DELETE /usuario
 * @description Elimina un usuario
 * @access Private
 */
rutaUsuario.delete("/usuario", verifyToken, eliminarUsuario);

/**
 * @route POST /login
 * @description Inicia sesión de usuario y devuelve un token JWT
 * @access Public
 */
rutaUsuario.post("/login", loginUsuario);

export default rutaUsuario;