/**
 * Este es el controlador de Historial
 * @module crt-historial
 */

import pool from "../config/mysql.db";
import { success, error } from "../messages/browser";
import { config } from "dotenv";
import bcrypt from "bcrypt";



config();



/**
 * Muestra un Historial específica basada en el ID proporcionado.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const mostrarHistorial = async (req, res)  => {
    const id = req.params['id'];
    try {
        const [respuesta] = await pool.query(`CALL SP_MOSTRAR_HISTORIAL("${id}");`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};


/**
 * Lista todos los Historiales disponibles.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const listarHistorial = async (req, res)  => {
    try {
        const [respuesta] = await pool.query(`CALL SP_LISTAR_HISTORIAL();`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};


/**
 * Crea un nuevo Historial con los datos proporcionados en el cuerpo de la solicitud.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.body.idUsuario - ID del usuario.
 * @param {string} req.body.idProducto - ID del producto.
 * @param {string} req.body.idMetodoPago - ID del método de pago.
 * @param {number} req.body.cantidad - Cantidad de productos.
 * @param {string} req.body.fecha - Fecha de la Historial.
 */
const crearHistorial = async (req, res) => {
    const { nombres, nombreProducto, tipopago, cantidad, fecha } = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_CREAR_HISTORIAL2("${nombres}", "${nombreProducto}", "${tipopago}", "${cantidad}", "${fecha}");`);
        if (respuesta[0].affectedRows >= 1) {
            success(req, res, 201, "Historial Creada.");
        } else {
            error(req, res, 401, "No se creó el historial, inténtalo más tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};



/**
 * Elimina un Historial específica basada en el ID proporcionado en el cuerpo de la solicitud.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.body.idFactura - ID de la Historial a eliminar.
 */
const eliminarHistorial = async (req, res) => {
    const { idFactura, correo, contrasena } = req.body;
    
    try {
        // Comprueba si el usuario existe y obtiene la contraseña encriptada
        const [respuesta] = await pool.query(`SELECT contrasena FROM usuario WHERE correo = ?`, [correo]);

        if (respuesta.length === 0) {
            return error(req, res, 404, "Usuario no encontrado.");
        }

        // Compara la contraseña proporcionada con la contraseña encriptada
        const match = await bcrypt.compare(contrasena, respuesta[0].contrasena);

        if (!match) {
            return error(req, res, 400, "Contraseña incorrecta.");
        }

        // Si la contraseña coincide, elimina la factura usando parámetros de consulta
        const [resultado] = await pool.query(`CALL SP_ELIMINAR_HISTORIAL(?, ?)`, [idFactura, correo]);

        if (resultado.affectedRows === 1) {
            return success(req, res, 201, "Factura eliminada.");
        } else {
            return error(req, res, 404, "Factura no encontrada.");
        }
    } catch (err) {
        return error(req, res, 500, err.message);
    }
};










export { listarHistorial, mostrarHistorial, crearHistorial, eliminarHistorial };