"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers/controllers.crearcuenta");
var _oauth = require("../middleware/oauth");
var rutaCuenta = (0, _express.Router)();
rutaCuenta.get("/cuenta/:id", _controllers.mostrarCuenta);
rutaCuenta.get("/cuenta", _controllers.listarCuenta);
rutaCuenta.post("/cuenta", _oauth.verifyToken, _controllers.crearCuenta);
rutaCuenta.put("/cuenta", _oauth.verifyToken, _controllers.modificarCuenta);
rutaCuenta["delete"]("/cuenta", _oauth.verifyToken, _controllers.eliminarCuenta);
var _default = exports["default"] = rutaCuenta;