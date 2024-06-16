"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers/controllers.producto");
var rutaProducto = (0, _express.Router)();
rutaProducto.get("/producto/:id", _controllers.mostrarProducto);
rutaProducto.get("/producto", _controllers.listarProducto);
rutaProducto.get("/agotado", _controllers.agotado);
rutaProducto.post("/producto", _controllers.crearProducto);
rutaProducto.put("/producto", _controllers.modificarProducto);
rutaProducto["delete"]("/producto", _controllers.eliminarProducto);
var _default = exports["default"] = rutaProducto;