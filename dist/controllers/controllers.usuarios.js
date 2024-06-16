"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mostrarUsuario = exports.modificarUsuario = exports.loginUsuario = exports.listarUsuario = exports.eliminarUsuario = exports.crearUsuario = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysql = _interopRequireDefault(require("../config/mysql.db"));
var _bcrypt = _interopRequireWildcard(require("bcrypt"));
var _browser = require("../messages/browser");
var _dotenv = require("dotenv");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
(0, _dotenv.config)();
var mostrarUsuario = exports.mostrarUsuario = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, _yield$pool$query, _yield$pool$query2, respuesta;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          id = req.params["id"];
          _context.prev = 1;
          _context.next = 4;
          return _mysql["default"].query("CALL SP_MOSTRAR_USUARIO(\"".concat(id, "\");"));
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
  return function mostrarUsuario(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var listarUsuario = exports.listarUsuario = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _yield$pool$query3, _yield$pool$query4, respuesta;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _mysql["default"].query("CALL SP_LISTAR_USUARIO();");
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
  return function listarUsuario(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var crearUsuario = exports.crearUsuario = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, identificacion, nombres, telefono, fecha_naci, respuesta;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, identificacion = _req$body.identificacion, nombres = _req$body.nombres, telefono = _req$body.telefono, fecha_naci = _req$body.fecha_naci;
          _context3.prev = 1;
          _context3.next = 4;
          return _mysql["default"].query("CALL SP_INSERTAR_USUARIO(\"".concat(identificacion, "\", \"").concat(nombres, "\", \"").concat(telefono, "\", \"").concat(fecha_naci, "\");"));
        case 4:
          respuesta = _context3.sent;
          if (respuesta[0].affectedRows == 1) {
            (0, _browser.success)(req, res, 201, "Usuario creado correctamente");
          } else {
            (0, _browser.error)(req, res, 400, "No se pudo crear el usuario");
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
  return function crearUsuario(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var modificarUsuario = exports.modificarUsuario = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body2, idUsuario, identificacion, nombres, telefono, fecha_naci, respuesta;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, idUsuario = _req$body2.idUsuario, identificacion = _req$body2.identificacion, nombres = _req$body2.nombres, telefono = _req$body2.telefono, fecha_naci = _req$body2.fecha_naci;
          _context4.prev = 1;
          _context4.next = 4;
          return _mysql["default"].query("CALL SP_EDITAR_USUARIO(\"".concat(idUsuario, "\", \"").concat(identificacion, "\", \"").concat(nombres, "\", \"").concat(telefono, "\", \"").concat(fecha_naci, "\");"));
        case 4:
          respuesta = _context4.sent;
          if (respuesta[0].affectedRows == 1) {
            (0, _browser.success)(req, res, 201, "Usuario modificado correctamente");
          } else {
            (0, _browser.error)(req, res, 400, "No se pudo modificado el usuario");
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
  return function modificarUsuario(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var eliminarUsuario = exports.eliminarUsuario = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var idUsuario, respuesta;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          idUsuario = req.body.idUsuario;
          _context5.prev = 1;
          _context5.next = 4;
          return _mysql["default"].query("CALL SP_ELIMINAR_USUARIO(\"".concat(idUsuario, "\");"));
        case 4:
          respuesta = _context5.sent;
          if (respuesta[0].affectedRows == 1) {
            (0, _browser.success)(req, res, 200, "Usuario Eliminado");
          } else {
            (0, _browser.error)(req, res, 400, "Usuario NO se elimino, Intenta mas tarde.");
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
  return function eliminarUsuario(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var loginUsuario = exports.loginUsuario = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _req$body3, usuario, contrasena, respuesta, match, payload, token;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _req$body3 = req.body, usuario = _req$body3.usuario, contrasena = _req$body3.contrasena;
          _context6.prev = 1;
          _context6.next = 4;
          return _mysql["default"].query("CALL SP_BUSCAR_LOGIN('".concat(usuario, "');"));
        case 4:
          respuesta = _context6.sent;
          if (!(respuesta[0][0] == 0)) {
            _context6.next = 8;
            break;
          }
          (0, _browser.error)(req, res, 404, "Usuario no existe.");
          return _context6.abrupt("return");
        case 8:
          _context6.next = 10;
          return _bcrypt["default"].compare(contrasena, respuesta[0][0][0].contrasena);
        case 10:
          match = _context6.sent;
          if (match) {
            _context6.next = 14;
            break;
          }
          (0, _browser.error)(req, res, 401, "Contraseña incorrecta");
          return _context6.abrupt("return");
        case 14:
          payload = {
            "usuario": usuario
          };
          _context6.next = 17;
          return _jsonwebtoken["default"].sign(payload, process.env.TOKEN_PRIVATEKEY, {
            expiresIn: process.env.TOKEN_EXPIRES_IN
          });
        case 17:
          token = _context6.sent;
          (0, _browser.success)(req, res, 200, token);
          _context6.next = 25;
          break;
        case 21:
          _context6.prev = 21;
          _context6.t0 = _context6["catch"](1);
          console.error("Error en el servidor:", _context6.t0);
          (0, _browser.error)(req, res, 500, "error en el servidor, porfavor intente nuevamente");
        case 25:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 21]]);
  }));
  return function loginUsuario(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();