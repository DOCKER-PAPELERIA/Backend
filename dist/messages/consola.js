"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.msjConsole = exports.mensa = void 0;
var _colors = _interopRequireDefault(require("colors"));
var msjConsole = exports.msjConsole = function msjConsole(tipo, mensaje) {
  switch (tipo) {
    case "puertoSuccess":
      console.log(mensaje.bgGreen);
      break;
    case "puertoError":
      console.log(mensaje.bgRed);
    default:
      break;
  }
};
var mensa = exports.mensa = {
  puerto: "Ejecutamdose en el puerto:"
};