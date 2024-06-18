"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers/controllers.factura");
var _oauth = require("../middleware/oauth");
var rutaFactura = (0, _express.Router)();
rutaFactura.get("/factura/:id", _controllers.mostrarFactura);
rutaFactura.get("/factura", _controllers.listarFactura);
rutaFactura.post("/factura", _oauth.verifyToken, _controllers.crearFactura);
rutaFactura.put("/factura", _oauth.verifyToken, _controllers.modificarFactura);
rutaFactura["delete"]("/factura", _oauth.verifyToken, _controllers.eliminarFactura);
var _default = exports["default"] = rutaFactura;