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
var _nodemailer = _interopRequireDefault(require("nodemailer"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
(0, _dotenv.config)();

// ------------------------------METODO DE MOSTRAR UN SOLO USUARIO------------------------------------------------
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

// ------------------------------METODO DE MOSTRAR TODOS USUARIO----------------------------------------------------
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

// ------------------------------METODO DE CREAR USUARIO------------------------------------------------------------
var crearUsuario = exports.crearUsuario = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, idRol, identificacion, nombres, telefono, fecha_naci, correo, estado, contrasenasincifrar, _hash, contrasena, respuesta, msg;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, idRol = _req$body.idRol, identificacion = _req$body.identificacion, nombres = _req$body.nombres, telefono = _req$body.telefono, fecha_naci = _req$body.fecha_naci, correo = _req$body.correo, estado = _req$body.estado;
          contrasenasincifrar = req.body.contrasena;
          _context3.prev = 2;
          _context3.next = 5;
          return _bcrypt["default"].hash(contrasenasincifrar, 2);
        case 5:
          _hash = _context3.sent;
          contrasena = _hash;
          _context3.next = 9;
          return _mysql["default"].query("CALL SP_INSERTAR_USUARIO(\"".concat(idRol, "\", \"").concat(identificacion, "\", \"").concat(nombres, "\", \"").concat(telefono, "\", \"").concat(fecha_naci, "\", \"").concat(correo, "\", \"").concat(contrasena, "\", \"").concat(estado, "\");"));
        case 9:
          respuesta = _context3.sent;
          if (respuesta[0].affectedRows == 1) {
            msg = "\n                <!DOCTYPE html>\n  <html lang=\"es\">\n  <head>\n      <meta charset=\"UTF-8\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n      <style>\n          body {\n              font-family: Arial, sans-serif;\n              background-color: #f4f4f4;\n              color: #333;\n              line-height: 1.6;\n              padding: 20px;\n          }\n          .container {\n              background-color: #fff;\n              border-radius: 10px;\n              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n              padding: 20px;\n              max-width: 600px;\n              margin: auto;\n          }\n          h1 {\n              color: #808080;\n          }\n          p {\n              font-size: 2em;\n          }\n      </style>\n  </head>\n  <body>\n      <div class=\"container\">\n          <h1>\xA1Bienvenido, ".concat(nombres, "!</h1>\n          <p>\xA1Te hemos asignado un usuario y una contrase\xF1a para que ingreses a la p\xE1gina!</p>\n          <p><strong>Tu usuario es:</strong> ").concat(correo, "</p>\n          <p><strong>Tu contrase\xF1a es:</strong> ").concat(contrasenasincifrar, "</p>\n          <p>\xA1Te esperamos!</p>\n      </div>\n  </body>\n  </html>\n            ");
            sendEmail(msg, correo, "creacion de la cuenta");
            (0, _browser.success)(req, res, 201, "Usuario creado correctamente");
          } else {
            (0, _browser.error)(req, res, 400, "No se pudo crear el usuario");
          }
          _context3.next = 16;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](2);
          (0, _browser.error)(req, res, 400, _context3.t0);
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[2, 13]]);
  }));
  return function crearUsuario(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// ------------------------------METODO DE MODIFICAR USUARIO------------------------------------------------------------
var modificarUsuario = exports.modificarUsuario = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body2, idUsuario, identificacion, nombres, telefono, fecha_naci, correo, estado, contrasenasincifrar, _hash2, contrasena, respuesta, msg;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, idUsuario = _req$body2.idUsuario, identificacion = _req$body2.identificacion, nombres = _req$body2.nombres, telefono = _req$body2.telefono, fecha_naci = _req$body2.fecha_naci, correo = _req$body2.correo, estado = _req$body2.estado;
          contrasenasincifrar = req.body.contrasena;
          _context4.prev = 2;
          _context4.next = 5;
          return _bcrypt["default"].hash(contrasenasincifrar, 2);
        case 5:
          _hash2 = _context4.sent;
          contrasena = _hash2;
          _context4.next = 9;
          return _mysql["default"].query("CALL SP_EDITAR_USUARIO(\"".concat(idUsuario, "\", \"").concat(identificacion, "\", \"").concat(nombres, "\", \"").concat(telefono, "\", \"").concat(fecha_naci, "\", \"").concat(correo, "\", \"").concat(contrasena, "\", \"").concat(estado, "\");"));
        case 9:
          respuesta = _context4.sent;
          if (respuesta[0].affectedRows == 1) {
            msg = "\n                <!DOCTYPE html>\n  <html lang=\"es\">\n  <head>\n      <meta charset=\"UTF-8\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n      <style>\n          body {\n              font-family: Arial, sans-serif;\n              background-color: #f4f4f4;\n              color: #333;\n              line-height: 1.6;\n              padding: 20px;\n          }\n          .container {\n              background-color: #fff;\n              border-radius: 10px;\n              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n              padding: 20px;\n              max-width: 600px;\n              margin: auto;\n          }\n          h1 {\n              color: #808080;\n          }\n          p {\n              font-size: 2em;\n          }\n      </style>\n  </head>\n  <body>\n      <div class=\"container\">\n          <h1>\xA1Hola, ".concat(nombres, "!</h1>\n          <p>\xA1Queremos informarte que tu informaci\xF3n ha sido actualizada!</p>\n          <p><strong>Tu nuevo usuario es:</strong> ").concat(correo, "</p>\n          <p><strong>Tu nueva contrase\xF1a es:</strong> ").concat(contrasenasincifrar, "</p>\n          <p>\xA1Gracias por tu atenci\xF3n!</p>\n      </div>\n  </body>\n  </html>\n            ");
            sendEmail(msg, correo, "Modificacion de la cuenta");
            (0, _browser.success)(req, res, 201, "Usuario modificado correctamente");
          } else {
            (0, _browser.error)(req, res, 400, "No se pudo modificado el usuario");
          }
          _context4.next = 16;
          break;
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](2);
          (0, _browser.error)(req, res, 400, _context4.t0);
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 13]]);
  }));
  return function modificarUsuario(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// ------------------------------METODO DE ELIMINAR USUARIO----------------------------------------------------------
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

// ------------------------------METODO DE LOGUAR USUARIO------------------------------------------------------------
var loginUsuario = exports.loginUsuario = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _req$body3, correo, contrasena, respuesta, match, payload, token;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _req$body3 = req.body, correo = _req$body3.correo, contrasena = _req$body3.contrasena;
          _context6.prev = 1;
          _context6.next = 4;
          return _mysql["default"].query("CALL SP_BUSCAR_LOGIN('".concat(correo, "');"));
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
            "correo": correo
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

// ------------------------------ESTE METODO ES PARA MANDAR CORREO AL MOMENTO DE CRAR UN USUARIO------------------------------------------------------------

var sendEmail = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(messages, receiverEmail, subject) {
    var transporter, info;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          transporter = _nodemailer["default"].createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            secure: false,
            auth: {
              user: process.env.EMAIL_CORREO,
              pass: process.env.EMAIL_CLAVE
            }
          });
          _context7.next = 3;
          return transporter.sendMail({
            from: process.env.EMAIL_CORREO,
            to: receiverEmail,
            subject: subject,
            html: messages
          });
        case 3:
          info = _context7.sent;
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function sendEmail(_x13, _x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();