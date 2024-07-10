"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers/controllers.historial");
var _oauth = require("../middleware/oauth");
/**
 * este es las rutas de historial 
 * @module ctr-Historial-ruta
 */

var rutaHistorial = (0, _express.Router)();

/**
 * @route GET /Historial/:id
 * @description Obtiene una Historial específica por ID
 * @access Public
 */
rutaHistorial.get("/historial/:id", _controllers.mostrarHistorial);

/**
 * @route GET /Historial
 * @description Lista todas las Historial
 * @access Public
 */
rutaHistorial.get("/historial", _controllers.listarHistorial);
rutaHistorial.get("/metopago", _controllers.MetodoPago);

/**
 * @route POST /Historial
 * @description Crea una nueva Historial
 * @access Private
 */
rutaHistorial.post("/historial", _oauth.verifyToken, _controllers.crearHistorial);

/**
 * @route DELETE /Historial
 * @description Elimina una Historial
 * @access Private
 */
rutaHistorial["delete"]("/historial", _oauth.verifyToken, _controllers.eliminarHistorial);
var _default = exports["default"] = rutaHistorial;