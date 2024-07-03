"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers/controllers.proveedor");
var _oauth = require("../middleware/oauth");
/**
 * este es las rutas de proveedores 
 * @module ctr-proveedor-ruta
 */

var rutaProveedor = (0, _express.Router)();

/**
 * @route GET /proveedor/:id
 * @description Obtiene un proveedor específico por ID
 * @access Public
 */
rutaProveedor.get("/proveedor/:id", _controllers.mostrarProveedor);

/**
 * @route GET /proveedor
 * @description Lista todos los proveedores
 * @access Public
 */
rutaProveedor.get("/proveedor", _controllers.listarProveedor);

/**
 * @route POST /proveedor
 * @description Crea un nuevo proveedor
 * @access Private
 */
rutaProveedor.post("/proveedor", _oauth.verifyToken, _controllers.crearProveedor);

/**
 * @route PUT /proveedor
 * @description Modifica un proveedor existente
 * @access Private
 */
rutaProveedor.put("/proveedor", _oauth.verifyToken, _controllers.modificarProveedor);

/**
 * @route DELETE /proveedor
 * @description Elimina un proveedor
 * @access Private
 */
rutaProveedor["delete"]("/proveedor", _oauth.verifyToken, _controllers.eliminarProveedor);
var _default = exports["default"] = rutaProveedor;