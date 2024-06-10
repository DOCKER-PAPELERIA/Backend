import pool from "../config/mysql.db";
import { success, error } from "../messages/browser";
import { config } from "dotenv";
import bcrypt from "bcrypt";
config();

export const mostrarCuenta = async (req, res) => {
    const id = req.params["id"];
    try {
        const [respuesta] = await pool.query(`CALL SP_MOSTRAR_CUENTA("${id}");`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};


export const listarCuenta = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_LISTAR_CUENTA();`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};


export const crearCuenta = async (req, res) => {
    const {idUsuario, idRol, correo, estado} = req.body;
    const contrasenasincifrar = req.body.contrasena;
    const confirmacionsincifrar = req.body.confirmacion;
    try {
        const hash = await bcrypt.hash(contrasenasincifrar, 2);
        const contrasena = hash;
        const hash1 = await bcrypt.hash(confirmacionsincifrar, 2);
        const confirmacion = hash1;

        const respuesta = await pool.query(`CALL SP_INSERTAR_CREARCUENTA("${idUsuario}", "${idRol}", "${correo}", "${contrasena}", "${confirmacion}", "${estado}");`);
        if (respuesta && respuesta.affectedRows == 1) {
            success(req, res, 201, "Cuenta creada con exito");
        } else {
            error(req, res, 400, "No se pudo crear la cuenta");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};


export const modificarCuenta = async (req, res) => {
    const {idCrearCuenta, correo, contrasena, confirmacion, estado} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_EDITAR_CREAR_CUENTA("${idCrearCuenta}", "${correo}", "${contrasena}", "${confirmacion}", "${estado}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "Cuenta modificada con éxito");
        } else {
            error(req, res, 400, "No se pudo modificar la cuenta");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};


export const eliminarCuenta = async (req, res) => {
    const {idCrearCuenta} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_ELIMINAR_CREARCUENTA("${idCrearCuenta}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "Cuenta eliminada con éxito");
        } else {
            error(req, res, 400, "No se pudo eliminar la cuenta");
        }
    } catch (err) {
        error(req, res, 400, err);      
    }
};


