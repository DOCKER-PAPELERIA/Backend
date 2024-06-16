"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers/controllers.usuarios");
var rutaUsuario = (0, _express.Router)();
rutaUsuario.get("/usuario/:id", _controllers.mostrarUsuario);
rutaUsuario.get("/usuario", _controllers.listarUsuario);
rutaUsuario.post("/usuario", _controllers.crearUsuario);
rutaUsuario.put("/usuario", _controllers.modificarUsuario);
rutaUsuario["delete"]("/usuario", _controllers.eliminarUsuario);
rutaUsuario.post("/login", _controllers.loginUsuario);
var _default = exports["default"] = rutaUsuario;