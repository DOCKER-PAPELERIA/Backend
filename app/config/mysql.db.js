/**
 * Este es la configuracion de la base de datos
 * @module crt-configuracion
 */
import { createPool } from "mysql2/promise";
import { config } from "dotenv";
config();

/**
 * Pool de conexión a la base de datos MySQL.
 * @type {object}
 */
const pool = createPool({

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
export default pool;