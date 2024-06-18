"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers/controllers.proveedor");
var _oauth = require("../middleware/oauth");
var rutaProveedor = (0, _express.Router)();
rutaProveedor.get("/proveedor/:id", _controllers.mostrarProveedor);
rutaProveedor.get("/proveedor", _controllers.listarProveedor);
rutaProveedor.post("/proveedor", _oauth.verifyToken, _controllers.crearProveedor);
rutaProveedor.put("/proveedor", _oauth.verifyToken, _controllers.modificarProveedor);
rutaProveedor["delete"]("/proveedor", _oauth.verifyToken, _controllers.eliminarProveedor);
var _default = exports["default"] = rutaProveedor;