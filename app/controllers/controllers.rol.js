import pool from "../config/mysql.db";
import { success, error } from "../messages/browser";
import { config } from "dotenv";
config();


export const crearRol = async (req, res) => {
    const {rol} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_INSERTAR_ROL("${rol}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 200, "Rol creado.");
        } else {
            error(req, res, 400, "El Rol NO se creo, intenta mas tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};


export const modificarRol = async (req, res) => {
    const {idRol, rol} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_EDITAR_ROL("${idRol}", "${rol}")`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 200, "Rol modificado.");
        } else {
            error(req, res, 400, "El Rol NO se pudo modificar, Intentala mas tarde.")
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};


export const eliminarRol = async (req, res) => {
    const {idRol} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_ELIMINAR_ROL("${idRol}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 200, "Rol eliminado.");
        } else {
            error(req, res, 400 , "Rol NO se Pudo Eliminar, Intentalo mas tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};