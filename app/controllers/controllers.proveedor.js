import pool from "../config/mysql.db";
import { success, error } from "../messages/browser.js";
import { config } from "dotenv";
config();

export const mostrarProveedor = async (req, res) => {
    const id = req.params["id"];
    try {
        const [respuesta] = await pool.query(`CALL SP_MOSTRAR_PROVEEDOR("${id}");`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};


export const listarProveedor = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_LISTAR_PROVEEDOR();`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};


export const crearProveedor = async (req, res) => {
    const {telefono, direccion, correo, nit} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_INSERTAR_PROVEEDOR("${telefono}", "${direccion}", "${correo}", "${nit}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "Proveedor creado correctamente.");
        } else {
            error(req, res, 400, "Proveedor NO se creo, Intenta mas tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};


export const modificarProveedor = async (req, res) => {
    const {idProveedor, telefono, direccion, correo, nit} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_EDITAR_PROVEEDOR("${idProveedor}", "${telefono}", "${direccion}", "${correo}", "${nit}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "Proveedor Modificado correctamente.");
        } else {
            error(req, res, 400, "Proveedor NO se modifico, Intenta mas tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
        
    }
};


export const eliminarProveedor = async (req, res) => {
    const {idProveedor} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_ELIMINAR_PROVEEDOR("${idProveedor}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 200, "Proveedor Eliminado");
        } else {
            error(req, res, 400, "Proveedor NO se elimino, Intenta mas tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
        
    }
};