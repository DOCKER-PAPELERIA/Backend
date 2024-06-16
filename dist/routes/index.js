"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _categoria = _interopRequireDefault(require("./categoria.router"));
var _producto = _interopRequireDefault(require("./producto.router"));
var _proveedor = _interopRequireDefault(require("./proveedor.roter"));
var _usuarios = _interopRequireDefault(require("./usuarios.routers"));
var _crearcuenta = _interopRequireDefault(require("./crearcuenta.router"));
var _regproducto = _interopRequireDefault(require("./regproducto.router"));
var ruta = (0, _express.Router)();
ruta.use("/api", _categoria["default"]);
ruta.use("/api", _producto["default"]);
ruta.use("/api", _proveedor["default"]);
ruta.use("/api", _crearcuenta["default"]);
ruta.use("/api", _regproducto["default"]);
ruta.use("/user", _usuarios["default"]);
var _default = exports["default"] = ruta;