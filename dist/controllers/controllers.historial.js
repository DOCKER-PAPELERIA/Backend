"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mostrarHistorial = exports.listarHistorial = exports.eliminarHistorial = exports.crearHistorial = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysql = _interopRequireDefault(require("../config/mysql.db"));
var _browser = require("../messages/browser");
var _dotenv = require("dotenv");
/**
 * Este es el controlador de Historial
 * @module crt-historial
 */

(0, _dotenv.config)();

/**
 * Muestra un Historial específica basada en el ID proporcionado.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
var mostrarHistorial = exports.mostrarHistorial = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, _yield$pool$query, _yield$pool$query2, respuesta;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          id = req.params['id'];
          _context.prev = 1;
          _context.next = 4;
          return _mysql["default"].query("CALL SP_MOSTRAR_HISTORIAL(\"".concat(id, "\");"));
        case 4:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
          respuesta = _yield$pool$query2[0];
          (0, _browser.success)(req, res, 200, respuesta[0]);
          _context.next = 13;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          (0, _browser.error)(req, res, 500, _context.t0);
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 10]]);
  }));
  return function mostrarHistorial(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Lista todos los Historiales disponibles.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
var listarHistorial = exports.listarHistorial = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _yield$pool$query3, _yield$pool$query4, respuesta;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _mysql["default"].query("CALL SP_LISTAR_HISTORIAL();");
        case 3:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          respuesta = _yield$pool$query4[0];
          (0, _browser.success)(req, res, 200, respuesta[0]);
          _context2.next = 12;
          break;
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          (0, _browser.error)(req, res, 500, _context2.t0);
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function listarHistorial(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Crea un nuevo Historial con los datos proporcionados en el cuerpo de la solicitud.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.body.idUsuario - ID del usuario.
 * @param {string} req.body.idProducto - ID del producto.
 * @param {string} req.body.idMetodoPago - ID del método de pago.
 * @param {number} req.body.cantidad - Cantidad de productos.
 * @param {string} req.body.fecha - Fecha de la Historial.
 */
var crearHistorial = exports.crearHistorial = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, idUsuario, idProducto, idMetodoPago, cantidad, fecha, respuesta;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, idUsuario = _req$body.idUsuario, idProducto = _req$body.idProducto, idMetodoPago = _req$body.idMetodoPago, cantidad = _req$body.cantidad, fecha = _req$body.fecha;
          _context3.prev = 1;
          _context3.next = 4;
          return _mysql["default"].query("CALL SP_CREAR_HISTORIAL(\"".concat(idUsuario, "\", \"").concat(idProducto, "\", \"").concat(idMetodoPago, "\", \"").concat(cantidad, "\", \"").concat(fecha, "\");"));
        case 4:
          respuesta = _context3.sent;
          if (respuesta[0].affectedRows >= 1) {
            (0, _browser.success)(req, res, 201, "Historial Creada.");
          } else {
            (0, _browser.error)(req, res, 401, "No se creo la Historial, Intentalo mas tarde.");
          }
          _context3.next = 11;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          (0, _browser.error)(req, res, 400, _context3.t0);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return function crearHistorial(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Elimina un Historial específica basada en el ID proporcionado en el cuerpo de la solicitud.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.body.idFactura - ID de la Historial a eliminar.
 */
var eliminarHistorial = exports.eliminarHistorial = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var idFactura, respuesta;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          idFactura = req.body.idFactura;
          _context4.prev = 1;
          _context4.next = 4;
          return _mysql["default"].query("CALL SP_ELIMINAR_HISTORIAL(\"".concat(idFactura, "\");"));
        case 4:
          respuesta = _context4.sent;
          if (respuesta[0].affectedRows == 1) {
            (0, _browser.success)(req, res, 201, "Historial eliminada.");
          } else {
            (0, _browser.error)(req, res, 400, "No se elimino la Historial, Intentalo mas tarde.");
          }
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          (0, _browser.error)(req, res, 400, _context4.t0);
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 8]]);
  }));
  return function eliminarHistorial(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();