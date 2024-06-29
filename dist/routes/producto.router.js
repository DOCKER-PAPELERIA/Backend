"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers/controllers.producto");
var _oauth = require("../middleware/oauth");
var rutaProducto = (0, _express.Router)();
rutaProducto.get("/producto/:id", _controllers.mostrarProducto);
rutaProducto.get("/producto", _controllers.listarProducto);
rutaProducto.get("/producto-agotado", _controllers.Agotado);
rutaProducto.get("/producto-precio", _controllers.Precios);
rutaProducto.post("/producto", _oauth.verifyToken, _controllers.crearProducto);
rutaProducto.put("/producto", _oauth.verifyToken, _controllers.modificarProducto);
rutaProducto["delete"]("/producto", _oauth.verifyToken, _controllers.eliminarProducto);
var _default = exports["default"] = rutaProducto;