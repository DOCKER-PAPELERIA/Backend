"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mostrarProveedor = exports.modificarProveedor = exports.listarProveedor = exports.eliminarProveedor = exports.crearProveedor = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysql = _interopRequireDefault(require("../config/mysql.db"));
var _browser = require("../messages/browser.js");
var _dotenv = require("dotenv");
/**
 * Este es el controlador de proveedor
 * @module crt-proveedor
 */

(0, _dotenv.config)();

/**
 * Muestra un proveedor específico basado en el ID proporcionado.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
var mostrarProveedor = exports.mostrarProveedor = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, _yield$pool$query, _yield$pool$query2, respuesta;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          id = req.params["id"];
          _context.prev = 1;
          _context.next = 4;
          return _mysql["default"].query("CALL SP_MOSTRAR_PROVEEDOR(\"".concat(id, "\");"));
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
  return function mostrarProveedor(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Lista todos los proveedores disponibles.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
var listarProveedor = exports.listarProveedor = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _yield$pool$query3, _yield$pool$query4, respuesta;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _mysql["default"].query("CALL SP_LISTAR_PROVEEDOR();");
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
  return function listarProveedor(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Crea un nuevo proveedor con los datos proporcionados en el cuerpo de la solicitud.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.body.nombre_proveedor - Nombre del proveedor.
 * @param {string} req.body.telefono - Teléfono del proveedor.
 * @param {string} req.body.correo - Correo electrónico del proveedor.
 */
var crearProveedor = exports.crearProveedor = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, nombre_proveedor, telefono, correo, respuesta;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, nombre_proveedor = _req$body.nombre_proveedor, telefono = _req$body.telefono, correo = _req$body.correo;
          _context3.prev = 1;
          _context3.next = 4;
          return _mysql["default"].query("CALL SP_INSERTAR_PROVEEDOR(\"".concat(nombre_proveedor, "\", \"").concat(telefono, "\", \"").concat(correo, "\");"));
        case 4:
          respuesta = _context3.sent;
          if (respuesta[0].affectedRows == 1) {
            (0, _browser.success)(req, res, 201, "Proveedor creado correctamente.");
          } else {
            (0, _browser.error)(req, res, 400, "Proveedor NO se creo, Intenta mas tarde.");
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
  return function crearProveedor(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Modifica un proveedor existente con los datos proporcionados en el cuerpo de la solicitud.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.body.idProveedor - ID del proveedor.
 * @param {string} req.body.nombre_proveedor - Nombre del proveedor.
 * @param {string} req.body.telefono - Teléfono del proveedor.
 * @param {string} req.body.correo - Correo electrónico del proveedor.
 */
var modificarProveedor = exports.modificarProveedor = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body2, idProveedor, nombre_proveedor, telefono, correo, respuesta;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, idProveedor = _req$body2.idProveedor, nombre_proveedor = _req$body2.nombre_proveedor, telefono = _req$body2.telefono, correo = _req$body2.correo;
          _context4.prev = 1;
          _context4.next = 4;
          return _mysql["default"].query("CALL SP_EDITAR_PROVEEDOR(\"".concat(idProveedor, "\", \"").concat(nombre_proveedor, "\", \"").concat(telefono, "\", \"").concat(correo, "\");"));
        case 4:
          respuesta = _context4.sent;
          if (respuesta[0].affectedRows == 1) {
            (0, _browser.success)(req, res, 201, "Proveedor Modificado correctamente.");
          } else {
            (0, _browser.error)(req, res, 400, "Proveedor NO se modifico, Intenta mas tarde.");
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
  return function modificarProveedor(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Elimina un proveedor específico basado en el ID proporcionado en el cuerpo de la solicitud.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.body.idProveedor - ID del proveedor a eliminar.
 */
var eliminarProveedor = exports.eliminarProveedor = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var idProveedor, respuesta;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          idProveedor = req.body.idProveedor;
          _context5.prev = 1;
          _context5.next = 4;
          return _mysql["default"].query("CALL SP_ELIMINAR_PROVEEDOR(\"".concat(idProveedor, "\");"));
        case 4:
          respuesta = _context5.sent;
          if (respuesta[0].affectedRows == 1) {
            (0, _browser.success)(req, res, 200, "Proveedor Eliminado");
          } else {
            (0, _browser.error)(req, res, 400, "Proveedor NO se elimino, Intenta mas tarde.");
          }
          _context5.next = 11;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          (0, _browser.error)(req, res, 400, _context5.t0);
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 8]]);
  }));
  return function eliminarProveedor(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();