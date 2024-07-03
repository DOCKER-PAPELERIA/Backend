"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _promise = require("mysql2/promise");
var _dotenv = require("dotenv");
/**
 * Este es la configuracion de la base de datos
 * @module crt-configuracion
 */

(0, _dotenv.config)();

/**
 * Pool de conexión a la base de datos MySQL.
 * @type {object}
 */
var pool = (0, _promise.createPool)({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE
});

/**
 * Exporta el pool de conexión para ser utilizado en otras partes de la aplicación.
 * @type {Pool}
 */
var _default = exports["default"] = pool;