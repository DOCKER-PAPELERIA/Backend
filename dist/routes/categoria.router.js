"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _cotrollers = require("../controllers/cotrollers.categoria");
var _oauth = require("../middleware/oauth");
/**
 * este es las rutas de categorias 
 * @module ctr-categoria-ruta
 */

var rutaCategoria = (0, _express.Router)();

/**
 * @route GET /categoria/:id
 * @description Obtiene una categoría específica por ID
 * @access Public
 */
rutaCategoria.get("/categoria/:id", _cotrollers.mostrarCategoria);

/** 
 * @route GET /categoria
 * @description Lista todas las categorías
 * @access Public
 */
rutaCategoria.get("/categoria", _cotrollers.listarCategoria);

/**
 * @route GET /catego-filtro
 * @description Filtra productos dentro de una categoría
 * @access Public
 */
rutaCategoria.post("/productos-por-categoria", _cotrollers.FiltrarProductos);

/**
 * @route GET /catego-filtro
 * @description muestra productos dentro de una categoría
 * @access Public
 */
rutaCategoria.get("/catego-product", _cotrollers.Cate_Productos);

/**
 * @route POST /categoria
 * @description Crea una nueva categoría
 * @access Private
 */
rutaCategoria.post("/categoria", _oauth.verifyToken, _cotrollers.crearCategoria);

/**
 * @route PUT /categoria
 * @description Modifica una categoría existente
 * @access Private
 */
rutaCategoria.put("/categoria", _oauth.verifyToken, _cotrollers.modificarCategoria);

/**
 * @route DELETE /categoria
 * @description Elimina una categoría
 * @access Private
 */
rutaCategoria["delete"]("/categoria", _oauth.verifyToken, _cotrollers.eliminarCategoria);
var _default = exports["default"] = rutaCategoria;