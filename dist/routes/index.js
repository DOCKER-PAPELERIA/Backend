"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _browser = require("../messages/browser");
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swaggerOutput = _interopRequireDefault(require("../tools/swagger-output.json"));
var _categoria = _interopRequireDefault(require("./categoria.router"));
var _producto = _interopRequireDefault(require("./producto.router"));
var _proveedor = _interopRequireDefault(require("./proveedor.roter"));
var _usuarios = _interopRequireDefault(require("./usuarios.routers"));
var _factura = _interopRequireDefault(require("./factura.router"));
var ruta = (0, _express.Router)();
ruta.use("/api", _categoria["default"]);
ruta.use("/api", _producto["default"]);
ruta.use("/api", _proveedor["default"]);
ruta.use("/api", _factura["default"]);
ruta.use("/user", _usuarios["default"]);
ruta.use("/doc", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swaggerOutput["default"]));
ruta.use("/", function (req, res) {
  res.json({
    "respuesta": _browser.messageBrowse.principal
  });
});
var _default = exports["default"] = ruta;