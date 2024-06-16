"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mostrarRegproducto = exports.modificarRegproducto = exports.listarRegproducto = exports.eliminarRegproducto = exports.crearRegproducto = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysql = _interopRequireDefault(require("../config/mysql.db"));
var _browser = require("../messages/browser");
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var mostrarRegproducto = exports.mostrarRegproducto = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, _yield$pool$query, _yield$pool$query2, respuesta;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          id = req.params["id"];
          _context.prev = 1;
          _context.next = 4;
          return _mysql["default"].query("CALL SP_MOSTRAR_REGPRODUCTOS(\"".concat(id, "\");"));
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
  return function mostrarRegproducto(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var listarRegproducto = exports.listarRegproducto = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _yield$pool$query3, _yield$pool$query4, respuesta;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _mysql["default"].query("CALL SP_LISTAR_REGPRODUCTOS();");
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
  return function listarRegproducto(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var crearRegproducto = exports.crearRegproducto = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, idProducto, idCategoria, idProveedor, cantinicial, cantfinal, fecha, valorcompra, estado, respuesta;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, idProducto = _req$body.idProducto, idCategoria = _req$body.idCategoria, idProveedor = _req$body.idProveedor, cantinicial = _req$body.cantinicial, cantfinal = _req$body.cantfinal, fecha = _req$body.fecha, valorcompra = _req$body.valorcompra, estado = _req$body.estado;
          _context3.prev = 1;
          _context3.next = 4;
          return _mysql["default"].query("CALL SP_INSERTAR_REGPRODUCTO(\"".concat(idProducto, "\", \"").concat(idCategoria, "\", \"").concat(idProveedor, "\", \"").concat(cantinicial, "\", \"").concat(cantfinal, "\", \"").concat(fecha, "\", \"").concat(valorcompra, "\", \"").concat(estado, "\");"));
        case 4:
          respuesta = _context3.sent;
          if (respuesta[0].affectedRows == 1) {
            (0, _browser.success)(req, res, 201, "Registro Producto creado con exito.");
          } else {
            (0, _browser.error)(req, res, 400, "Registro Producto No creado, Intentalo mas tarde.");
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
  return function crearRegproducto(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var modificarRegproducto = exports.modificarRegproducto = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body2, idRegistro, cantinicial, cantfinal, fecha, valorcompra, estado, respuesta;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, idRegistro = _req$body2.idRegistro, cantinicial = _req$body2.cantinicial, cantfinal = _req$body2.cantfinal, fecha = _req$body2.fecha, valorcompra = _req$body2.valorcompra, estado = _req$body2.estado;
          _context4.prev = 1;
          _context4.next = 4;
          return _mysql["default"].query("CALL SP_EDITAR_REGPRODUCTO(\"".concat(idRegistro, "\", \"").concat(cantinicial, "\", \"").concat(cantfinal, "\", \"").concat(fecha, "\", \"").concat(valorcompra, "\", \"").concat(estado, "\");"));
        case 4:
          respuesta = _context4.sent;
          if (respuesta[0].affectedRows == 1) {
            (0, _browser.success)(req, res, 201, "Registro Producto modificado con exito.");
          } else {
            (0, _browser.error)(req, res, 400, "Registro Producto No modificar, Intentalo mas tarde.");
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
  return function modificarRegproducto(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var eliminarRegproducto = exports.eliminarRegproducto = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var idRegistro, respuesta;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          idRegistro = req.body.idRegistro;
          _context5.prev = 1;
          _context5.next = 4;
          return _mysql["default"].query("CALL SP_ELIMINAR_REGPRODUCTO(\"".concat(idRegistro, "\");"));
        case 4:
          respuesta = _context5.sent;
          if (respuesta[0].affectedRows == 1) {
            (0, _browser.success)(req, res, 200, "Registro Producto Eliminado");
          } else {
            (0, _browser.error)(req, res, 400, "Registro Producto NO se elimino, Intenta mas tarde.");
          }
          _context5.next = 10;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 8]]);
  }));
  return function eliminarRegproducto(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();