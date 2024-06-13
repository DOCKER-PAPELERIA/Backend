import pool from "../config/mysql.db";
import { success, error } from "../messages/browser.js";
import { config } from "dotenv";
config();

export const mostrarProducto = async (req, res) => {
    const id = req.params["id"];
    try {
        const [respuesta] = await pool.query(`CALL SP_MOSTRAR_PRODUCTOS("${id}");`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }

};

export const listarProducto = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_LISTAR_PRODUCTOS();`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }

};

export const agotado = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_PRODUCTO_AGOTADO();`);
        if (respuesta.length === 0 || (respuesta[0] && respuesta[0].length === 0)) {
            success(req, res, 200, "No hay productos agotados.");
        } else {
            success(req, res, 200, respuesta[0], "Productos Agotados.");
        }
    } catch (err) {
        error(req, res, 500, err);
    }
};

export const crearProducto = async (req, res) => {
    const {descripcion, unidades, precio_compra, precio_venta } = req.body;
    try {
        const respuesta = await pool.query(`CALL  SP_INSERTAR_PRODUCTOS("${descripcion}", "${unidades}", "${precio_compra}", "${precio_venta}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "Producto creado correctamente.");
        } else {
            error(req, res, 400, "Producto NO se creo, Intenta mas tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }

};

export const modificarProducto = async (req, res) => {
    const {idProducto, descripcion, unidades, precio_compra, precio_venta } = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_EDITAR_PRODUCTO("${idProducto}", "${descripcion}", "${unidades}", "${precio_compra}", "${precio_venta}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "Producto modificado correctamente.");
        } else {
            error(req, res, 400, "Producto NO se modifico, Intenta mas tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }

};

export const eliminarProducto = async (req, res) => {
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

