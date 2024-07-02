"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers/controllers.usuarios");
var _oauth = require("../middleware/oauth.js");
var rutaUsuario = (0, _express.Router)();
rutaUsuario.get("/usuario/:id", _controllers.mostrarUsuario);
rutaUsuario.get("/usuario", _controllers.listarUsuario);
rutaUsuario.get("/usuario-perfil", _oauth.verifyToken, _controllers.mostrarUsuariobaseToken);
rutaUsuario.post("/usuario-nueva-contrsena", _controllers.cambiarContrasenaYEnviarCorreo);
rutaUsuario.post("/usuario", _controllers.crearUsuario);
rutaUsuario.put("/usuario", _oauth.verifyToken, _controllers.modificarUsuario);
rutaUsuario["delete"]("/usuario", _oauth.verifyToken, _controllers.eliminarUsuario);
rutaUsuario.post("/login", _controllers.loginUsuario);
var _default = exports["default"] = rutaUsuario;