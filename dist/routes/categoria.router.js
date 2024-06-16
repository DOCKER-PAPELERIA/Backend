"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _cotrollers = require("../controllers/cotrollers.categoria");
var rutaCategoria = (0, _express.Router)();
rutaCategoria.get("/categoria/:id", _cotrollers.mostrarCategoria);
rutaCategoria.get("/categoria", _cotrollers.listarCategoria);
rutaCategoria.get("/categoria-descrip", _cotrollers.descripcion);
rutaCategoria.get("/categoria-ordena", _cotrollers.ordenAlfabetico);
rutaCategoria.post("/categoria", _cotrollers.crearCategoria);
rutaCategoria.put("/categoria", _cotrollers.modificarCategoria);
rutaCategoria["delete"]("/categoria", _cotrollers.eliminarCategoria);
var _default = exports["default"] = rutaCategoria;