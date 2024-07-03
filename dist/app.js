"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _dotenv = require("dotenv");
var _cors = _interopRequireDefault(require("cors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _index = _interopRequireDefault(require("./routes/index.js"));
/**
 * Este es el archivo principal
 * @module crt-principal
 */

(0, _dotenv.config)();
var app = (0, _express["default"])();

/**
 * Inicia el servidor Express y monta las rutas principales.
 * @param {number} app.get - Puerto del servidor.
 * @param {string} process.env.PORT - Puerto configurado en el archivo .env o 3000 por defecto.
 * @param {middleware} app.use - Rutas principales definidas en './routes/index.js'.
 */

app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.set("port", process.env.PORT || 3000);
app.use("/", _index["default"]);
var _default = exports["default"] = app;