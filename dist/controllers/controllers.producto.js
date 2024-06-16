"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mostrarProducto = exports.modificarProducto = exports.listarProducto = exports.eliminarProducto = exports.crearProducto = exports.agotado = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysql = _interopRequireDefault(require("../config/mysql.db"));
var _browser = require("../messages/browser.js");
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var mostrarProducto = exports.mostrarProducto = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, _yield$pool$query, _yield$pool$query2, respuesta;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          id = req.params["id"];
          _context.prev = 1;
          _context.next = 4;
          return _mysql["default"].query("CALL SP_MOSTRAR_PRODUCTOS(\"".concat(id, "\");"));
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
  return function mostrarProducto(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var listarProducto = exports.listarProducto = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _yield$pool$query3, _yield$pool$query4, respuesta;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _mysql["default"].query("CALL SP_LISTAR_PRODUCTOS();");
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
  return function listarProducto(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var agotado = exports.agotado = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _yield$pool$query5, _yield$pool$query6, respuesta;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _mysql["default"].query("CALL SP_PRODUCTO_AGOTADO();");
        case 3:
          _yield$pool$query5 = _context3.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          respuesta = _yield$pool$query6[0];
          if (respuesta.length === 0 || respuesta[0] && respuesta[0].length === 0) {
            (0, _browser.success)(req, res, 200, "No hay productos agotados.");
          } else {
            (0, _browser.success)(req, res, 200, respuesta[0], "Productos Agotados.");
          }
          _context3.next = 12;
          break;
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          (0, _browser.error)(req, res, 500, _context3.t0);
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function agotado(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var crearProducto = exports.crearProducto = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body, descripcion, unidades, precio_compra, precio_venta, respuesta;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, descripcion = _req$body.descripcion, unidades = _req$body.unidades, precio_compra = _req$body.precio_compra, precio_venta = _req$body.precio_venta;
          _context4.prev = 1;
          _context4.next = 4;
          return _mysql["default"].query("CALL  SP_INSERTAR_PRODUCTOS(\"".concat(descripcion, "\", \"").concat(unidades, "\", \"").concat(precio_compra, "\", \"").concat(precio_venta, "\");"));
        case 4:
          respuesta = _context4.sent;
          if (respuesta[0].affectedRows == 1) {
            (0, _browser.success)(req, res, 201, "Producto creado correctamente.");
          } else {
            (0, _browser.error)(req, res, 400, "Producto NO se creo, Intenta mas tarde.");
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
  return function crearProducto(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var modificarProducto = exports.modificarProducto = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body2, idProducto, descripcion, unidades, precio_compra, precio_venta, respuesta;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$body2 = req.body, idProducto = _req$body2.idProducto, descripcion = _req$body2.descripcion, unidades = _req$body2.unidades, precio_compra = _req$body2.precio_compra, precio_venta = _req$body2.precio_venta;
          _context5.prev = 1;
          _context5.next = 4;
          return _mysql["default"].query("CALL SP_EDITAR_PRODUCTO(\"".concat(idProducto, "\", \"").concat(descripcion, "\", \"").concat(unidades, "\", \"").concat(precio_compra, "\", \"").concat(precio_venta, "\");"));
        case 4:
          respuesta = _context5.sent;
          if (respuesta[0].affectedRows == 1) {
            (0, _browser.success)(req, res, 201, "Producto modificado correctamente.");
          } else {
            (0, _browser.error)(req, res, 400, "Producto NO se modifico, Intenta mas tarde.");
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
  return function modificarProducto(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var eliminarProducto = exports.eliminarProducto = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var idProducto, respuesta;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          idProducto = req.body.idProducto;
          _context6.prev = 1;
          _context6.next = 4;
          return _mysql["default"].query("CALL SP_ELIMINAR_PRODUCTO(\"".concat(idProducto, "\");"));
        case 4:
          respuesta = _context6.sent;
          if (respuesta[0].affectedRows == 1) {
            (0, _browser.success)(req, res, 200, "Producto Eliminado");
          } else {
            (0, _browser.error)(req, res, 400, "Producto NO se elimino, Intenta mas tarde.");
          }
          _context6.next = 11;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](1);
          (0, _browser.error)(req, res, 400, _context6.t0);
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 8]]);
  }));
  return function eliminarProducto(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();