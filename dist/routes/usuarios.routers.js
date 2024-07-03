"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers/controllers.usuarios");
var _oauth = require("../middleware/oauth.js");
/**
 * este es las rutas de usuarios 
 * @module ctr-usaurio-ruta
 */

var rutaUsuario = (0, _express.Router)();

/**
 * @route GET /usuario/:id
 * @description Obtiene un usuario específico por ID
 * @access Public
 */
rutaUsuario.get("/usuario/:id", _controllers.mostrarUsuario);

/**
 * @route GET /usuario
 * @description Lista todos los usuarios
 * @access Public
 */
rutaUsuario.get("/usuario", _controllers.listarUsuario);

/**
 * @route GET /usuario-perfil
 * @description Obtiene el perfil del usuario actual basado en el token
 * @access Private
 */
rutaUsuario.get("/usuario-perfil", _oauth.verifyToken, _controllers.mostrarUsuariobaseToken);

/**
 * @route POST /usuario-nueva-contrasena
 * @description Cambia la contraseña de un usuario y envía un correo de notificación
 * @access Public
 */
rutaUsuario.post("/usuario-nueva-contrasena", _controllers.cambiarContrasenaYEnviarCorreo);

/**
 * @route POST /usuario
 * @description Crea un nuevo usuario
 * @access Public
 */
rutaUsuario.post("/usuario", _controllers.crearUsuario);

/**
 * @route PUT /usuario
 * @description Modifica un usuario existente
 * @access Private
 */
rutaUsuario.put("/usuario", _oauth.verifyToken, _controllers.modificarUsuario);

/**
 * @route DELETE /usuario
 * @description Elimina un usuario
 * @access Private
 */
rutaUsuario["delete"]("/usuario", _oauth.verifyToken, _controllers.eliminarUsuario);

/**
 * @route POST /login
 * @description Inicia sesión de usuario y devuelve un token JWT
 * @access Public
 */
rutaUsuario.post("/login", _controllers.loginUsuario);
var _default = exports["default"] = rutaUsuario;