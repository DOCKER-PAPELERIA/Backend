/**
 * Este es el controlador de producto
 * @module crt-producto
 */

import pool from "../config/mysql.db";
import { success, error } from "../messages/browser.js";
import { config } from "dotenv";
import nodemailer from "nodemailer";
config();


/**
 * Muestra todos los productos que estan agotados sin mandar el correo electronico.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const mostrarProducto = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_MOSTRAR_PRODUCTOS();`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};


/**
 * Muestra los productos agotados y envía un correo de alerta si hay productos agotados.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const Agotado = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_PRODUCTO_AGOTADO();`);
        if (respuesta.length === 0 || (respuesta[0] && respuesta[0].length === 0)) {
            success(req, res, 200, "No hay productos agotados.");
        }else {
            // Enviar correo de alerta
            const emailText = respuesta[0].map(producto => `Producto: ${producto.nombre_product}, Stock: ${producto.stock}`).join('\n');
            const emailSubject = "Alerta: Productos Agotados";
            const emailRecipient = "papeleria.angel.info@gmail.com"; // Cambia esto al correo deseado

            await sendMail(emailRecipient, emailSubject, emailText);
            success(req, res, 200, respuesta[0], "Productos Agotados y correo enviado.");
        }
    } catch (err) {
        error(req, res, 500, err);
    }
};


/**
 * Lista todos los productos disponibles.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const listarProducto = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_LISTAR_PRODUCTOS();`);
        res.json(respuesta[0]); // Asegúrate de enviar el array de productos correctamente
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


/**
 * Muestra los productos junto con sus precios.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const Precios = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_MOSTRAR_PRECIOS();`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};


/**
 * Crea un nuevo producto con los datos proporcionados en el cuerpo de la solicitud.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.body.idCategorias - ID de la categoría.
 * @param {string} req.body.idProveedor - ID del proveedor.
 * @param {string} req.body.nombre_product - Nombre del producto.
 * @param {number} req.body.stock - Cantidad en stock.
 * @param {string} req.body.codigo_producto - Código del producto.
 * @param {string} req.body.imagen - URL de la imagen del producto.
 * @param {number} req.body.precio - Precio del producto.
 * @param {string} req.body.fecha - Fecha de creación del producto.
 * @param {string} req.body.estado - Estado del producto.
 */
const crearProducto = async (req, res) => {
    const {idCategorias, idProveedor, nombre_product, stock, codigo_producto, imagen, precio, fecha, estado} = req.body;
    try {
        const respuesta = await pool.query(`CALL  SP_INSERTAR_PRODUCTOS("${idCategorias}", "${idProveedor}", "${nombre_product}", "${stock}", "${codigo_producto}", "${imagen}", "${precio}", "${fecha}", "${estado}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "Producto creado correctamente.");
        } else {
            error(req, res, 400, "Producto NO se creo, Intenta mas tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};


/**
 * Modifica un producto existente con los datos proporcionados en el cuerpo de la solicitud.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.body.idProducto - ID del producto.
 * @param {string} req.body.idCategorias - ID de la categoría.
 * @param {string} req.body.idProveedor - ID del proveedor.
 * @param {string} req.body.nombre_product - Nombre del producto.
 * @param {number} req.body.stock - Cantidad en stock.
 * @param {string} req.body.codigo_producto - Código del producto.
 * @param {string} req.body.imagen - URL de la imagen del producto.
 * @param {number} req.body.precio - Precio del producto.
 * @param {string} req.body.fecha - Fecha de creación del producto.
 * @param {string} req.body.estado - Estado del producto.
 */
const modificarProducto = async (req, res) => {
    const {idProducto, idCategorias, idProveedor, nombre_product, stock, codigo_producto, imagen, precio, fecha, estado} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_EDITAR_PRODUCTO("${idProducto}", "${idCategorias}", "${idProveedor}", "${nombre_product}", "${stock}", "${codigo_producto}", "${imagen}", "${precio}", "${fecha}", "${estado}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "Producto  modificado correctamete.");
        } else {
            error(req, res, 401, "Producto No se modifico, Intentalo mas tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};


/**
 * Elimina un producto específico basado en el ID proporcionado en el cuerpo de la solicitud.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.body.idProducto - ID del producto a eliminar.
 */
const eliminarProducto = async (req, res) => {
    const {idProducto} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_ELIMINAR_PRODUCTO("${idProducto}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 200, "Producto Eliminado");
        } else {
            error(req, res, 400, "Producto NO se elimino, Intenta mas tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};

/**
 * Envía un correo electrónico.
 * @function
 * @param {string} to - Dirección de correo del destinatario.
 * @param {string} subject - Asunto del correo.
 * @param {string} text - Texto del correo.
 * @returns {Promise} - Promesa que representa el resultado del envío del correo.
 */
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_CORREO,
        pass: process.env.EMAIL_CLAVE
    }
});

const sendMail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_CORREO,
        to,
        subject,
        text
    };

    return transporter.sendMail(mailOptions);
};

export { listarProducto, mostrarProducto, Precios, Agotado, crearProducto, modificarProducto, eliminarProducto };