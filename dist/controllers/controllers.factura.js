"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mostrarFactura = exports.listarFactura = exports.eliminarFactura = exports.crearFactura = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysql = _interopRequireDefault(require("../config/mysql.db"));
var _browser = require("../messages/browser");
var _dotenv = require("dotenv");
(0, _dotenv.config)();

// ------------------------------METODO DE MOSTRAR UNA SOLA FACTURA------------------------------------------------
var mostrarFactura = exports.mostrarFactura = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, _yield$pool$query, _yield$pool$query2, respuesta;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          id = req.params['id'];
          _context.prev = 1;
          _context.next = 4;
          return _mysql["default"].query("CALL SP_MOSTRAR_FACTURA(\"".concat(id, "\");"));
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
  return function mostrarFactura(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// ------------------------------METODO DE MOSTRAR TODAS LAS FACTURA------------------------------------------------
var listarFactura = exports.listarFactura = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _yield$pool$query3, _yield$pool$query4, respuesta;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _mysql["default"].query("CALL SP_LISTAR_FACTURA();");
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
  return function listarFactura(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// ------------------------------METODO DE CREAR FACTURA----------------------------------------------------------
var crearFactura = exports.crearFactura = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, idUsuario, idProducto, idMetodoPago, cantidad, fecha, respuesta;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, idUsuario = _req$body.idUsuario, idProducto = _req$body.idProducto, idMetodoPago = _req$body.idMetodoPago, cantidad = _req$body.cantidad, fecha = _req$body.fecha;
          _context3.prev = 1;
          _context3.next = 4;
          return _mysql["default"].query("CALL SP_CREAR_FACTURA(\"".concat(idUsuario, "\", \"").concat(idProducto, "\", \"").concat(idMetodoPago, "\", \"").concat(cantidad, "\", \"").concat(fecha, "\");"));
        case 4:
          respuesta = _context3.sent;
          if (respuesta[0].affectedRows >= 1) {
            (0, _browser.success)(req, res, 201, "Factura Creada.");
          } else {
            (0, _browser.error)(req, res, 401, "No se creo la factura, Intentalo mas tarde.");
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
  return function crearFactura(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// ------------------------------METODO DE ELIMINAR FACTURA-----------------------------------------------------------
var eliminarFactura = exports.eliminarFactura = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var idFactura, respuesta;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          idFactura = req.body.idFactura;
          _context4.prev = 1;
          _context4.next = 4;
          return _mysql["default"].query("CALL SP_ELIMINAR_FACTURA(\"".concat(idFactura, "\");"));
        case 4:
          respuesta = _context4.sent;
          if (respuesta[0].affectedRows == 1) {
            (0, _browser.success)(req, res, 201, "Factura eliminada.");
          } else {
            (0, _browser.error)(req, res, 400, "No se elimino la factura, Intentalo mas tarde.");
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
  return function eliminarFactura(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();