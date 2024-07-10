/**
 * Este es el controlador de Historial
 * @module crt-historial
 */

import pool from "../config/mysql.db";
import { success, error } from "../messages/browser";
import { config } from "dotenv";
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



const MetodoPago = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_MOSTRAR_METODOPAGO();`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
}


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
    const {idUsuario, idProducto, idMetodoPago, cantidad, fecha} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_CREAR_HISTORIAL("${idUsuario}", "${idProducto}", "${idMetodoPago}", "${cantidad}", "${fecha}");`);
        if (respuesta[0].affectedRows >= 1) {
            success(req, res, 201, "Historial Creada.");
        } else {
            error(req, res, 401, "No se creo la Historial, Intentalo mas tarde.");
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
    const {idFactura} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_ELIMINAR_HISTORIAL("${idFactura}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "Historial eliminada.");
        } else {
            error(req, res, 400, "No se elimino la Historial, Intentalo mas tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};

export { listarHistorial, mostrarHistorial, crearHistorial, eliminarHistorial, MetodoPago };