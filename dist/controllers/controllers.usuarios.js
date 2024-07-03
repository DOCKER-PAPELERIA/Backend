"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = exports.mostrarUsuariobaseToken = exports.mostrarUsuario = exports.modificarUsuario = exports.loginUsuario = exports.listarUsuario = exports.eliminarUsuario = exports.crearUsuario = exports.cambiarContrasenaYEnviarCorreo = void 0;
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
/**
 * Este es el controlador de usuario
 * @module crt-usuario
 */

(0, _dotenv.config)();

/**
 * Muestra un usuario específico basado en el ID proporcionado.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
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

/**
 * Lista todos los usuarios disponibles.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
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

/**
 * Crea un nuevo usuario con los datos proporcionados en el cuerpo de la solicitud y manda mensaje al correo del usuairo y la contraseña.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.body.idRol - Rol del usuario.
 * @param {string} req.body.identificacion - Identificación del usuario.
 * @param {string} req.body.nombres - Nombres del usuario.
 * @param {string} req.body.telefono - Teléfono del usuario.
 * @param {string} req.body.fecha_naci - Fecha de nacimiento del usuario.
 * @param {string} req.body.correo - Correo electrónico del usuario.
 * @param {string} req.body.estado - Estado del usuario.
 * @param {string} req.body.contrasena - Contraseña del usuario.
 */
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
          if (!(respuesta[0].affectedRows == 1)) {
            _context3.next = 17;
            break;
          }
          // Crear el mensaje de correo
          msg = "\n                <!DOCTYPE html>\n                <html lang=\"es\">\n                <head>\n                    <meta charset=\"UTF-8\">\n                    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n                    <style>\n                        body {\n                            font-family: Arial, sans-serif;\n                            background-color: #f4f4f4;\n                            color: #333;\n                            line-height: 1.6;\n                            padding: 20px;\n                        }\n                        .container {\n                            background-color: #fff;\n                            border-radius: 10px;\n                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n                            padding: 20px;\n                            max-width: 600px;\n                            margin: auto;\n                        }\n                        h1 {\n                            color: #808080;\n                        }\n                        p {\n                            font-size: 2em;\n                        }\n                    </style>\n                </head>\n                <body>\n                    <div class=\"container\">\n                        <h1>\xA1Bienvenido, ".concat(nombres, "!</h1>\n                        <p>\xA1Te hemos asignado un usuario y una contrase\xF1a para que ingreses a la p\xE1gina!</p>\n                        <p><strong>Tu usuario es:</strong> ").concat(correo, "</p>\n                        <p><strong>Tu contrase\xF1a es:</strong> ").concat(contrasenasincifrar, "</p>\n                        <p>\xA1Te esperamos!</p>\n                    </div>\n                </body>\n                </html>\n            ");
          _context3.next = 14;
          return sendEmail(msg, correo, "Creación de la cuenta");
        case 14:
          (0, _browser.success)(req, res, 201, "Usuario creado correctamente y correo enviado");
          _context3.next = 18;
          break;
        case 17:
          (0, _browser.error)(req, res, 400, "No se pudo crear el usuario");
        case 18:
          _context3.next = 23;
          break;
        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](2);
          (0, _browser.error)(req, res, 400, _context3.t0);
        case 23:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[2, 20]]);
  }));
  return function crearUsuario(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Modifica un usuario existente con los datos proporcionados en el cuerpo de la solicitud y mnada el correo de los cambios de su usuario nuevo y contraseña.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.body.idUsuario - ID del usuario.
 * @param {string} req.body.identificacion - Identificación del usuario.
 * @param {string} req.body.nombres - Nombres del usuario.
 * @param {string} req.body.telefono - Teléfono del usuario.
 * @param {string} req.body.fecha_naci - Fecha de nacimiento del usuario.
 * @param {string} req.body.correo - Correo electrónico del usuario.
 * @param {string} req.body.estado - Estado del usuario.
 * @param {string} req.body.contrasena - Contraseña del usuario.
 */
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

/**
 * Elimina un usuario específico basado en el ID proporcionado en el cuerpo de la solicitud.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.body.idUsuario - ID del usuario a eliminar.
 */
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

/**
 * Autentica un usuario basado en las credenciales proporcionadas para loguear al usuario.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.body.correo - Correo electrónico del usuario.
 * @param {string} req.body.contrasena - Contraseña del usuario.
 */
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

/**
 * Envía  correos electrónico.
 * @function
 * @async
 * @param {string} messages - Contenido del mensaje.
 * @param {string} receiverEmail - Correo electrónico del receptor.
 * @param {string} subject - Asunto del correo.
 * @throws Will throw an error if the email sending fails.
 */
var sendEmail = exports.sendEmail = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(messages, receiverEmail, subject) {
    var transporter, info;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          transporter = _nodemailer["default"].createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            secure: true,
            auth: {
              user: process.env.EMAIL_CORREO,
              pass: process.env.EMAIL_CLAVE
            },
            tls: {
              rejectUnauthorized: false
            }
          });
          _context7.next = 4;
          return transporter.sendMail({
            from: process.env.EMAIL_CORREO,
            to: receiverEmail,
            subject: subject,
            html: messages
          });
        case 4:
          info = _context7.sent;
          console.log("Email enviado:", info.messageId);
          _context7.next = 12;
          break;
        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          console.error("Error al enviar el correo:", _context7.t0);
          throw _context7.t0;
        case 12:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 8]]);
  }));
  return function sendEmail(_x13, _x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * Cambia la contraseña del usuario y envía un correo con la nueva contraseña cuando el usuario recupere la cuenta.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.body.correo - Correo electrónico del usuario.
 */
var cambiarContrasenaYEnviarCorreo = exports.cambiarContrasenaYEnviarCorreo = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var correo, generateRandomPassword, _yield$pool$query5, _yield$pool$query6, usuario, nuevaContrasena, _hash3, contrasenaEncriptada, _yield$pool$query7, _yield$pool$query8, respuesta, msg;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          correo = req.body.correo;
          _context8.prev = 1;
          // Generar una nueva contraseña aleatoria
          generateRandomPassword = function generateRandomPassword() {
            var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 12;
            var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var password = "";
            for (var i = 0; i < length; i++) {
              var randomIndex = Math.floor(Math.random() * charset.length);
              password += charset[randomIndex];
            }
            return password;
          };
          _context8.next = 5;
          return _mysql["default"].query("SELECT * FROM usuario WHERE correo = ?", [correo]);
        case 5:
          _yield$pool$query5 = _context8.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          usuario = _yield$pool$query6[0];
          if (usuario.length) {
            _context8.next = 10;
            break;
          }
          return _context8.abrupt("return", (0, _browser.error)(req, res, 400, "el correo proporcionado no existe"));
        case 10:
          nuevaContrasena = generateRandomPassword();
          _context8.next = 13;
          return _bcrypt["default"].hash(nuevaContrasena, 2);
        case 13:
          _hash3 = _context8.sent;
          contrasenaEncriptada = _hash3;
          _context8.next = 17;
          return _mysql["default"].query("UPDATE usuario SET contrasena = ? WHERE correo = ?", [contrasenaEncriptada, correo]);
        case 17:
          _yield$pool$query7 = _context8.sent;
          _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
          respuesta = _yield$pool$query8[0];
          if (!(respuesta.affectedRows === 1)) {
            _context8.next = 27;
            break;
          }
          // Crear el mensaje de correo
          msg = " \n                <!DOCTYPE html>\n                <html lang=\"es\">\n                <head>\n                    <meta charset=\"UTF-8\">\n                    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n                    <style>\n                        /* Estilos CSS para el correo */\n                        /* ... (tus estilos aqu\xED) ... */\n                    </style>\n                </head>\n                <body>\n                    <div class=\"container\">\n                        <h1>\xA1Hola, ".concat(usuario[0].nombres, "!</h1>\n                        <p>\xA1Queremos informarte que tu contrase\xF1a ha sido actualizada!</p>\n                        <p><strong>Tu nueva contrase\xF1a es:</strong> ").concat(nuevaContrasena, "</p>\n                        <p>\xA1Gracias por tu atenci\xF3n!</p>\n                    </div>\n                </body>\n                </html>\n            ");
          _context8.next = 24;
          return sendEmail(msg, correo, "Modificación de la contraseña");
        case 24:
          return _context8.abrupt("return", (0, _browser.success)(req, res, 200, "Contraseña modificada correctamente y correo enviado"));
        case 27:
          return _context8.abrupt("return", (0, _browser.error)(req, res, 400, "No se pudo modificar la contraseña"));
        case 28:
          _context8.next = 34;
          break;
        case 30:
          _context8.prev = 30;
          _context8.t0 = _context8["catch"](1);
          console.error('Error:', _context8.t0);
          return _context8.abrupt("return", (0, _browser.error)(req, res, 400, _context8.t0));
        case 34:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[1, 30]]);
  }));
  return function cambiarContrasenaYEnviarCorreo(_x16, _x17) {
    return _ref8.apply(this, arguments);
  };
}();

/**
 * Muestra la información del usuario basada en el token proporcionado.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.user.correo - Correo electrónico del usuario.
 */
var mostrarUsuariobaseToken = exports.mostrarUsuariobaseToken = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var correo, sql, _yield$pool$query9, _yield$pool$query10, resultado, usuario;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          correo = req.user.correo;
          _context9.prev = 1;
          sql = 'SELECT * FROM usuario WHERE correo = ?';
          _context9.next = 5;
          return _mysql["default"].query(sql, [correo]);
        case 5:
          _yield$pool$query9 = _context9.sent;
          _yield$pool$query10 = (0, _slicedToArray2["default"])(_yield$pool$query9, 1);
          resultado = _yield$pool$query10[0];
          if (!(resultado.length === 0)) {
            _context9.next = 10;
            break;
          }
          return _context9.abrupt("return", (0, _browser.error)(req, res, 404, "usuario no encontrado"));
        case 10:
          usuario = resultado[0];
          (0, _browser.success)(req, res, 200, usuario);
          _context9.next = 18;
          break;
        case 14:
          _context9.prev = 14;
          _context9.t0 = _context9["catch"](1);
          console.error(_context9.t0);
          _context9.t0(req, res, 500, 'Error del servidor al obtener el perfil del usuario');
        case 18:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[1, 14]]);
  }));
  return function mostrarUsuariobaseToken(_x18, _x19) {
    return _ref9.apply(this, arguments);
  };
}();