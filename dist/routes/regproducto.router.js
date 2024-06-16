"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers/controllers.regproducto");
var rutaRegproducto = (0, _express.Router)();
rutaRegproducto.get("/regproducto/:id", _controllers.mostrarRegproducto);
rutaRegproducto.get("/regproducto", _controllers.listarRegproducto);
rutaRegproducto.post("/regproducto", _controllers.crearRegproducto);
rutaRegproducto.put("/regproducto", _controllers.modificarRegproducto);
rutaRegproducto["delete"]("/regproducto", _controllers.eliminarRegproducto);
var _default = exports["default"] = rutaRegproducto;