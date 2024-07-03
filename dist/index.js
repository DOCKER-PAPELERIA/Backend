"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _app = _interopRequireDefault(require("./app.js"));
var _consola = require("./messages/consola.js");
/**
 * Este es el archivo ejecuta el puerto
 * @module crt-puerto
 */

/**
 * Escucha el puerto definido en la configuración de la aplicación y muestra un mensaje de éxito en la consola.
 * @param {number} app.get("port") - Puerto configurado en la aplicación Express.
 * @param {string} mensa.puerto - Mensaje base que indica que el servidor está ejecutándose en un puerto.
 * @param {string} app.get("port") - Puerto específico en el que está escuchando el servidor.
 */
_app["default"].listen(_app["default"].get("port"), function () {
  (0, _consola.msjConsole)("puertoSuccess", "".concat(_consola.mensa.puerto, " ").concat(_app["default"].get("port"), " http://localhost:").concat(_app["default"].get("port")));
});