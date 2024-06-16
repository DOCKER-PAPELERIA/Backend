"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers/controllers.crearcuenta");
var rutaCuenta = (0, _express.Router)();
rutaCuenta.get("/cuenta/:id", _controllers.mostrarCuenta);
rutaCuenta.get("/cuenta", _controllers.listarCuenta);
rutaCuenta.post("/cuenta", _controllers.crearCuenta);
rutaCuenta.put("/cuenta", _controllers.modificarCuenta);
rutaCuenta["delete"]("/cuenta", _controllers.eliminarCuenta);
var _default = exports["default"] = rutaCuenta;