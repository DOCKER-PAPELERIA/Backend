"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers/controllers.producto");
var _oauth = require("../middleware/oauth");
/**
 * este es las rutas de productos 
 * @module ctr-producto-ruta
 */

var rutaProducto = (0, _express.Router)();

/**
 * @route GET /producto/:id
 * @description Obtiene un producto específico por ID
 * @access Public
 */
rutaProducto.get("/producto/:id", _controllers.mostrarProducto);

/**
 * @route GET /producto
 * @description Lista todos los productos
 * @access Public
 */
rutaProducto.get("/producto", _controllers.listarProducto);

/**
 * @route GET /producto-agotado
 * @description Lista todos los productos agotados
 * @access Public
 */
rutaProducto.get("/producto-agotado", _controllers.Agotado);

/**
 * @route GET /producto-precio
 * @description Lista productos ordenados por precio
 * @access Public
 */
rutaProducto.get("/producto-precio", _controllers.Precios);

/**
 * @route POST /producto
 * @description Crea un nuevo producto
 * @access Private
 */
rutaProducto.post("/producto", _controllers.crearProducto);

/**
 * @route PUT /producto
 * @description Modifica un producto existente
 * @access Private
 */
rutaProducto.put("/producto", _oauth.verifyToken, _controllers.modificarProducto);

/**
 * @route DELETE /producto
 * @description Elimina un producto
 * @access Private
 */
rutaProducto["delete"]("/producto", _oauth.verifyToken, _controllers.eliminarProducto);
var _default = exports["default"] = rutaProducto;