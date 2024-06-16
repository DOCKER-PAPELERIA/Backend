"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mostrarCuenta = exports.modificarCuenta = exports.listarCuenta = exports.eliminarCuenta = exports.crearCuenta = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysql = _interopRequireDefault(require("../config/mysql.db"));
var _browser = require("../messages/browser");
var _dotenv = require("dotenv");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
(0, _dotenv.config)();
var mostrarCuenta = exports.mostrarCuenta = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, _yield$pool$query, _yield$pool$query2, respuesta;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          id = req.params["id"];
          _context.prev = 1;
          _context.next = 4;
          return _mysql["default"].query("CALL SP_MOSTRAR_CUENTA(\"".concat(id, "\");"));
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
  return function mostrarCuenta(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var listarCuenta = exports.listarCuenta = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _yield$pool$query3, _yield$pool$query4, respuesta;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _mysql["default"].query("CALL SP_LISTAR_CUENTA();");
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
  return function listarCuenta(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var crearCuenta = exports.crearCuenta = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, idUsuario, idRol, correo, estado, contrasenasincifrar, confirmacionsincifrar, hash, contrasena, hash1, confirmacion, respuesta;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, idUsuario = _req$body.idUsuario, idRol = _req$body.idRol, correo = _req$body.correo, estado = _req$body.estado;
          contrasenasincifrar = req.body.contrasena;
          confirmacionsincifrar = req.body.confirmacion;
          _context3.prev = 3;
          _context3.next = 6;
          return _bcrypt["default"].hash(contrasenasincifrar, 2);
        case 6:
          hash = _context3.sent;
          contrasena = hash;
          _context3.next = 10;
          return _bcrypt["default"].hash(confirmacionsincifrar, 2);
        case 10:
          hash1 = _context3.sent;
          confirmacion = hash1;
          _context3.next = 14;
          return _mysql["default"].query("CALL SP_INSERTAR_CREARCUENTA(\"".concat(idUsuario, "\", \"").concat(idRol, "\", \"").concat(correo, "\", \"").concat(contrasena, "\", \"").concat(confirmacion, "\", \"").concat(estado, "\");"));
        case 14:
          respuesta = _context3.sent;
          if (respuesta[0].affectedRows >= 1) {
            (0, _browser.success)(req, res, 201, "Cuenta creada con exito");
          } else {
            (0, _browser.error)(req, res, 400, "No se pudo crear la cuenta");
          }
          _context3.next = 21;
          break;
        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](3);
          (0, _browser.error)(req, res, 400, _context3.t0);
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 18]]);
  }));
  return function crearCuenta(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var modificarCuenta = exports.modificarCuenta = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body2, idcuenta, correo, estado, contrasenasincifrar, confirmacionsincifrar, hash, contrasena, hash1, confirmacion, respuesta;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, idcuenta = _req$body2.idcuenta, correo = _req$body2.correo, estado = _req$body2.estado;
          contrasenasincifrar = req.body.contrasena;
          confirmacionsincifrar = req.body.confirmacion;
          _context4.prev = 3;
          _context4.next = 6;
          return _bcrypt["default"].hash(contrasenasincifrar, 2);
        case 6:
          hash = _context4.sent;
          contrasena = hash;
          _context4.next = 10;
          return _bcrypt["default"].hash(confirmacionsincifrar, 2);
        case 10:
          hash1 = _context4.sent;
          confirmacion = hash1;
          _context4.next = 14;
          return _mysql["default"].query("CALL SP_EDITAR_CREAR_CUENTA(\"".concat(idcuenta, "\", \"").concat(correo, "\", \"").concat(contrasena, "\", \"").concat(confirmacion, "\", \"").concat(estado, "\");"));
        case 14:
          respuesta = _context4.sent;
          if (respuesta[0].affectedRows == 1) {
            (0, _browser.success)(req, res, 201, "Cuenta modificada con éxito");
          } else {
            (0, _browser.error)(req, res, 400, "No se pudo modificar la cuenta");
          }
          _context4.next = 21;
          break;
        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](3);
          (0, _browser.error)(req, res, 400, _context4.t0);
        case 21:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[3, 18]]);
  }));
  return function modificarCuenta(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var eliminarCuenta = exports.eliminarCuenta = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var idcuenta, respuesta;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          idcuenta = req.body.idcuenta;
          _context5.prev = 1;
          _context5.next = 4;
          return _mysql["default"].query("CALL SP_ELIMINAR_CREARCUENTA(\"".concat(idcuenta, "\");"));
        case 4:
          respuesta = _context5.sent;
          if (respuesta[0].affectedRows == 1) {
            (0, _browser.success)(req, res, 201, "Cuenta eliminada con éxito");
          } else {
            (0, _browser.error)(req, res, 400, "No se pudo eliminar la cuenta");
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
  return function eliminarCuenta(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();