"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _cotrollers = require("../controllers/cotrollers.categoria");
var _oauth = require("../middleware/oauth");
var rutaCategoria = (0, _express.Router)();
rutaCategoria.get("/categoria/:id", _cotrollers.mostrarCategoria);
rutaCategoria.get("/categoria", _cotrollers.listarCategoria);
rutaCategoria.get("/catego-filtro", _cotrollers.FiltrarProductos);
rutaCategoria.post("/categoria", _oauth.verifyToken, _cotrollers.crearCategoria);
rutaCategoria.put("/categoria", _oauth.verifyToken, _cotrollers.modificarCategoria);
rutaCategoria["delete"]("/categoria", _oauth.verifyToken, _cotrollers.eliminarCategoria);
var _default = exports["default"] = rutaCategoria;