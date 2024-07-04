"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = require("dotenv");
var _browser = require("../messages/browser");
/**
 * Este es sistema de funciones y servicios middleware
 * @module crt-Middleware
 */

(0, _dotenv.config)();

/**
 * Middleware para verificar y decodificar un token JWT.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función de middleware para pasar el control al siguiente middleware.
 * @returns {void}
 */
var verifyToken = exports.verifyToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, valida;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          token = req.headers['x-access-token'];
          console.log('Token recibido:', token);
          if (token) {
            _context.next = 5;
            break;
          }
          console.log('Acceso denegado: Token no proporcionado');
          return _context.abrupt("return", (0, _browser.success)(req, res, 401, 'Acceso denegado.'));
        case 5:
          _context.prev = 5;
          _context.next = 8;
          return _jsonwebtoken["default"].verify(token, process.env.TOKEN_PRIVATEKEY);
        case 8:
          valida = _context.sent;
          req.user = valida;
          console.log('Usuario autenticado:', req.user);
          next();
          _context.next = 18;
          break;
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](5);
          console.error('Error al verificar token:', _context.t0);
          (0, _browser.error)(req, res, 401, 'Falta Acceso del token.');
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[5, 14]]);
  }));
  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();