"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mostrarCategoria = exports.modificarCategoria = exports.listarCategoria = exports.eliminarCategoria = exports.crearCategoria = exports.FiltrarProductos = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysql = _interopRequireDefault(require("../config/mysql.db"));
var _browser = require("../messages/browser.js");
var _dotenv = require("dotenv");
/**
 * Este es el controlador de categoria
 * @module crt-categoria
 */

(0, _dotenv.config)();

/**
 * Muestra una categoría específica basada en el ID proporcionado.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
var mostrarCategoria = exports.mostrarCategoria = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, _yield$pool$query, _yield$pool$query2, respuesta;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          id = req.params['id'];
          _context.prev = 1;
          _context.next = 4;
          return _mysql["default"].query("CALL SP_MOSTRAR_CATEGORIAS(\"".concat(id, "\");"));
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
  return function mostrarCategoria(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Lista todas las categorías disponibles.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta (Response).
 */
var listarCategoria = exports.listarCategoria = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _yield$pool$query3, _yield$pool$query4, respuesta;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _mysql["default"].query("CALL SP_LISTAR_CATEGORIAS();");
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
  return function listarCategoria(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Crea una nueva categoría con los datos proporcionados en el cuerpo de la solicitud.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta (Response).
 * @param {string} req.body.Categoria - Nombre de la categoría.
 * @param {string} req.body.descripcion_categoria - Descripción de la categoría.
 * @param {string} req.body.imagen - Imagen de la categoría.
 * @param {string} req.body.fecha - Fecha de creación de la categoría.
 */
var crearCategoria = exports.crearCategoria = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, Categoria, descripcion_categoria, imagen, fecha, respuesta;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, Categoria = _req$body.Categoria, descripcion_categoria = _req$body.descripcion_categoria, imagen = _req$body.imagen, fecha = _req$body.fecha;
          _context3.prev = 1;
          _context3.next = 4;
          return _mysql["default"].query("CALL SP_INSERTAR_CATEGORIA(\"".concat(Categoria, "\", \"").concat(descripcion_categoria, "\", \"").concat(imagen, "\", \"").concat(fecha, "\");"));
        case 4:
          respuesta = _context3.sent;
          if (respuesta[0].affectedRows == 1) {
            (0, _browser.success)(req, res, 201, "La Categoria ha sido Registrada.");
          } else {
            (0, _browser.error)(req, res, 400, "La Categoria NO se Registro Vuelve a Intentarlo.");
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
  return function crearCategoria(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Filtra los productos que están dentro de una categoría específica.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta (Response).
 * @param {string} req.body.filtro - Filtro a aplicar a los productos.
 * @param {string} req.body.categoria - Categoría de los productos.
 */
var FiltrarProductos = exports.FiltrarProductos = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body2, filtro, categoria, _yield$pool$query5, _yield$pool$query6, respuesta;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, filtro = _req$body2.filtro, categoria = _req$body2.categoria;
          _context4.prev = 1;
          _context4.next = 4;
          return _mysql["default"].query("CALL SP_FILTRAR_PRODUCTOS_CATEGORIAS(\"".concat(filtro, "\", \"").concat(categoria, "\");"));
        case 4:
          _yield$pool$query5 = _context4.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          respuesta = _yield$pool$query6[0];
          (0, _browser.success)(req, res, 201, respuesta[0]);
          _context4.next = 13;
          break;
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](1);
          (0, _browser.error)(req, res, 400, _context4.t0);
        case 13:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 10]]);
  }));
  return function FiltrarProductos(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Modifica una categoría existente con los datos proporcionados en el cuerpo de la solicitud.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta (Response).
 * @param {string} req.body.idCategorias - ID de la categoría.
 * @param {string} req.body.Categoria - Nombre de la categoría.
 * @param {string} req.body.descripcion_categoria - Descripción de la categoría.
 * @param {string} req.body.imagen - Imagen de la categoría.
 * @param {string} req.body.fecha - Fecha de creación de la categoría.
 */

// ------------------------------METODO DE MODIFICAR LAS CATEGORIAS--------------------------------------------------
var modificarCategoria = exports.modificarCategoria = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body3, idCategorias, Categoria, descripcion_categoria, imagen, fecha, respuesta;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$body3 = req.body, idCategorias = _req$body3.idCategorias, Categoria = _req$body3.Categoria, descripcion_categoria = _req$body3.descripcion_categoria, imagen = _req$body3.imagen, fecha = _req$body3.fecha;
          _context5.prev = 1;
          _context5.next = 4;
          return _mysql["default"].query("CALL SP_EDITAR_CATEGORIAS(\"".concat(idCategorias, "\", \"").concat(Categoria, "\", \"").concat(descripcion_categoria, "\", \"").concat(imagen, "\", \"").concat(fecha, "\");"));
        case 4:
          respuesta = _context5.sent;
          if (respuesta[0].affectedRows == 1) {
            (0, _browser.success)(req, res, 201, "La Categoria ha sido Modificada.");
          } else {
            (0, _browser.error)(req, res, 400, "La Categoria NO se Modifico Vuelve a Intentarlo.");
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
  return function modificarCategoria(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Elimina una categoría específica basada en el ID proporcionado en el cuerpo de la solicitud.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta (Response).
 * @param {string} req.body.idCategorias - ID de la categoría a eliminar.
 */
var eliminarCategoria = exports.eliminarCategoria = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var idCategorias, respuesta;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          idCategorias = req.body.idCategorias;
          _context6.prev = 1;
          _context6.next = 4;
          return _mysql["default"].query("CALL SP_ELIMINAR_CATEGORIAS(\"".concat(idCategorias, "\");"));
        case 4:
          respuesta = _context6.sent;
          if (respuesta[0].affectedRows == 1) {
            (0, _browser.success)(req, res, 201, "La Categori ha sido Eliminada.");
          } else {
            (0, _browser.error)(req, res, 400, "La Categoria NO se ha Eliminado");
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
  return function eliminarCategoria(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();