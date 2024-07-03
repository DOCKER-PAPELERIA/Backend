"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers/controllers.factura");
var _oauth = require("../middleware/oauth");
/**
 * este es las rutas de facturas 
 * @module ctr-factura-ruta
 */

var rutaFactura = (0, _express.Router)();

/**
 * @route GET /factura/:id
 * @description Obtiene una factura específica por ID
 * @access Public
 */
rutaFactura.get("/factura/:id", _controllers.mostrarFactura);

/**
 * @route GET /factura
 * @description Lista todas las facturas
 * @access Public
 */
rutaFactura.get("/factura", _controllers.listarFactura);

/**
 * @route POST /factura
 * @description Crea una nueva factura
 * @access Private
 */
rutaFactura.post("/factura", _oauth.verifyToken, _controllers.crearFactura);

/**
 * @route DELETE /factura
 * @description Elimina una factura
 * @access Private
 */
rutaFactura["delete"]("/factura", _oauth.verifyToken, _controllers.eliminarFactura);
var _default = exports["default"] = rutaFactura;