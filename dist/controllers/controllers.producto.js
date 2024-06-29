"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mostrarProducto = exports.modificarProducto = exports.listarProducto = exports.eliminarProducto = exports.crearProducto = exports.Precios = exports.Agotado = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysql = _interopRequireDefault(require("../config/mysql.db"));
var _browser = require("../messages/browser.js");
var _dotenv = require("dotenv");
var _nodemailer = _interopRequireDefault(require("nodemailer"));
(0, _dotenv.config)();

// ------------------------------METODO DE MOSTRAR UN SOLO PRODUCTO------------------------------------------------
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

// ------------------------------METODO DE MOSTRAR TODAS LOS PRODUCTOS------------------------------------------------
var listarProducto = exports.listarProducto = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _yield$pool$query3, _yield$pool$query4, respuesta, emailText, emailSubject, emailRecipient;
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
          if (!(respuesta.length === 0 || respuesta[0] && respuesta[0].length === 0)) {
            _context2.next = 10;
            break;
          }
          (0, _browser.success)(req, res, 200, "No hay productos agotados.");
          _context2.next = 16;
          break;
        case 10:
          // Enviar correo de alerta
          emailText = respuesta[0].map(function (producto) {
            return "Producto: ".concat(producto.nombre_product, ", Stock: ").concat(producto.stock);
          }).join('\n');
          emailSubject = "Alerta: Productos Agotados";
          emailRecipient = "papeleria.angel.info@gmail.com"; // Cambia esto al correo deseado
          _context2.next = 15;
          return sendMail(emailRecipient, emailSubject, emailText);
        case 15:
          (0, _browser.success)(req, res, 200, respuesta[0], "Productos Agotados y correo enviado.");
        case 16:
          _context2.next = 21;
          break;
        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](0);
          (0, _browser.error)(req, res, 500, _context2.t0);
        case 21:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 18]]);
  }));
  return function listarProducto(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// ------------------------------METODO DE MOSTRAR EL PRODUCTO AGOTADO-------------------------------------
var Agotado = exports.Agotado = /*#__PURE__*/function () {
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
          (0, _browser.success)(req, res, 200, respuesta[0]);
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
  return function Agotado(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// ------------------------------METODO DE MOSTRAR EL PRODUCTO Y SU PRECIO---------------------------------
var Precios = exports.Precios = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _yield$pool$query7, _yield$pool$query8, respuesta;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _mysql["default"].query("CALL SP_MOSTRAR_PRECIOS();");
        case 3:
          _yield$pool$query7 = _context4.sent;
          _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
          respuesta = _yield$pool$query8[0];
          (0, _browser.success)(req, res, 200, respuesta[0]);
          _context4.next = 12;
          break;
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          (0, _browser.error)(req, res, 500, _context4.t0);
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return function Precios(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// ------------------------------METODO DE CREAR LOS PRODUCTOS----------------------------------------------------
var crearProducto = exports.crearProducto = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body, idCategorias, idProveedor, nombre_product, stock, codigo_producto, imagen, precio, fecha, estado, respuesta;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$body = req.body, idCategorias = _req$body.idCategorias, idProveedor = _req$body.idProveedor, nombre_product = _req$body.nombre_product, stock = _req$body.stock, codigo_producto = _req$body.codigo_producto, imagen = _req$body.imagen, precio = _req$body.precio, fecha = _req$body.fecha, estado = _req$body.estado;
          _context5.prev = 1;
          _context5.next = 4;
          return _mysql["default"].query("CALL  SP_INSERTAR_PRODUCTOS(\"".concat(idCategorias, "\", \"").concat(idProveedor, "\", \"").concat(nombre_product, "\", \"").concat(stock, "\", \"").concat(codigo_producto, "\", \"").concat(imagen, "\", \"").concat(precio, "\", \"").concat(fecha, "\", \"").concat(estado, "\");"));
        case 4:
          respuesta = _context5.sent;
          if (respuesta[0].affectedRows == 1) {
            (0, _browser.success)(req, res, 201, "Producto creado correctamente.");
          } else {
            (0, _browser.error)(req, res, 400, "Producto NO se creo, Intenta mas tarde.");
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
  return function crearProducto(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

// ------------------------------METODO DE MODIFICAR LOS PRODUCTOS------------------------------------------------
var modificarProducto = exports.modificarProducto = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _req$body2, idProducto, idCategorias, idProveedor, nombre_product, stock, codigo_producto, imagen, precio, fecha, estado, respuesta;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _req$body2 = req.body, idProducto = _req$body2.idProducto, idCategorias = _req$body2.idCategorias, idProveedor = _req$body2.idProveedor, nombre_product = _req$body2.nombre_product, stock = _req$body2.stock, codigo_producto = _req$body2.codigo_producto, imagen = _req$body2.imagen, precio = _req$body2.precio, fecha = _req$body2.fecha, estado = _req$body2.estado;
          _context6.prev = 1;
          _context6.next = 4;
          return _mysql["default"].query("CALL SP_EDITAR_PRODUCTO(\"".concat(idProducto, "\", \"").concat(idCategorias, "\", \"").concat(idProveedor, "\", \"").concat(nombre_product, "\", \"").concat(stock, "\", \"").concat(codigo_producto, "\", \"").concat(imagen, "\", \"").concat(precio, "\", \"").concat(fecha, "\", \"").concat(estado, "\");"));
        case 4:
          respuesta = _context6.sent;
          if (respuesta[0].affectedRows == 1) {
            (0, _browser.success)(req, res, 201, "Producto  modificado correctamete.");
          } else {
            (0, _browser.error)(req, res, 401, "Producto No se modifico, Intentalo mas tarde.");
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
  return function modificarProducto(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

// ------------------------------METODO DE ELIMINAR LOS PRODUCTOS-------------------------------------------------
var eliminarProducto = exports.eliminarProducto = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var idProducto, respuesta;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          idProducto = req.body.idProducto;
          _context7.prev = 1;
          _context7.next = 4;
          return _mysql["default"].query("CALL SP_ELIMINAR_PRODUCTO(\"".concat(idProducto, "\");"));
        case 4:
          respuesta = _context7.sent;
          if (respuesta[0].affectedRows == 1) {
            (0, _browser.success)(req, res, 200, "Producto Eliminado");
          } else {
            (0, _browser.error)(req, res, 400, "Producto NO se elimino, Intenta mas tarde.");
          }
          _context7.next = 11;
          break;
        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](1);
          (0, _browser.error)(req, res, 400, _context7.t0);
        case 11:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 8]]);
  }));
  return function eliminarProducto(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var transporter = _nodemailer["default"].createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_CORREO,
    pass: process.env.EMAIL_CLAVE
  }
});
var sendMail = function sendMail(to, subject, text) {
  var mailOptions = {
    from: process.env.EMAIL_CORREO,
    to: to,
    subject: subject,
    text: text
  };
  return transporter.sendMail(mailOptions);
};