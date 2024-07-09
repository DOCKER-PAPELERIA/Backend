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
var _historial = _interopRequireDefault(require("./historial.router"));
/**
 * este es las rutas de categorias 
 * @module ctr-index-rutas-principales
 */

/**
 * Esta es la ruta de mi proyecto
 * @type {object}
 */

var ruta = (0, _express.Router)();

// Rutas para los diferentes recursos de la API
ruta.use("/api", _categoria["default"]); // Rutas relacionadas con categorías bajo /api/categoria
ruta.use("/api", _producto["default"]); // Rutas relacionadas con productos bajo /api/producto
ruta.use("/api", _proveedor["default"]); // Rutas relacionadas con proveedores bajo /api/proveedor 
ruta.use("/api", _historial["default"]); // Rutas relacionadas con facturas bajo /api/factura

// Rutas adicionales
ruta.use("/user", _usuarios["default"]); // Rutas relacionadas con usuarios bajo /user

// Ruta para la documentación de Swagger
ruta.use("/doc", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swaggerOutput["default"])); // Ruta para acceder a la documentación de Swagger

// Ruta de inicio
ruta.use("/", function (req, res) {
  res.json({
    "respuesta": _browser.messageBrowse.principal
  });
}); // Respuesta principal cuando se accede a la raíz "/"
var _default = exports["default"] = ruta;