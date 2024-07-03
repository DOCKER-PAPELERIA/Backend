"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.success = exports.messageBrowse = exports.error = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
/**
 * Este es mesajes de manejo de errores
 * @module crt-mensajes-manejo-erores
 */
var messageBrowse = exports.messageBrowse = {
  principal: "Bienvenido",
  home: "Hola home",
  gallery: "Hola gallery",
  about: "Hola about",
  contact: "Hola contact"
};

/**
 * Responde con un mensaje de éxito y un cuerpo de respuesta opcional.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @param {number} [status=200] - Código de estado HTTP (por defecto 200).
 * @param {*} [body] - Cuerpo de respuesta opcional.
 * @param {string} [message] - Mensaje adicional opcional.
 */
var success = exports.success = function success(req, res) {
  var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
  var body = arguments.length > 3 ? arguments[3] : undefined;
  var message = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var response = {
    error: false,
    status: status,
    body: body
  };
  if (message) response.message = message;
  res.status(status).json(response);
};

/**
 * Responde con un mensaje de error y un objeto de error.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @param {number} [status=500] - Código de estado HTTP (por defecto 500).
 * @param {Error|string} err - Objeto de error o mensaje de error.
 */
var error = exports.error = function error(req, res) {
  var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  var err = arguments.length > 3 ? arguments[3] : undefined;
  res.status(status).json((0, _defineProperty2["default"])({
    error: true,
    status: status
  }, "error", err.message || err));
};

// export const success = (req, res, status=200, mensaje = null) => {
//     res.status(status).json({
//         error: false,
//         status:status,
//         body:mensaje
//     })
// };

// export const error = (req, res, status=500, mensaje="")  => {
//     res.status(status).json({
//         error: true,
//         status:status,
//         body:mensaje
//     })
// };