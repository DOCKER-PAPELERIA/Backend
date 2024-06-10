import pool from "../config/mysql.db";
import bcrypt, { hash } from "bcrypt";
import { success, error } from "../messages/browser";
import { config } from "dotenv";
import jwt from "jsonwebtoken"
config();


export const mostrarUsuario = async (req, res) => {
    const id = req.params["id"];
    try {
        const [respuesta] = await pool.query(`CALL SP_MOSTRAR_USUARIO("${id}");`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
        
    }
};

export const listarUsuario = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_LISTAR_USUARIO();`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
        
    }
};


export const crearUsuario = async (req, res) => {
    const {identificacion, nombres, telefono, fecha_naci} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_INSERTAR_USUARIO("${identificacion}", "${nombres}", "${telefono}", "${fecha_naci}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "Usuario creado correctamente");
        } else {
            error(req, res, 400, "No se pudo crear el usuario");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};


export const modificarUsuario = async (req, res) => {
    const {idUsuario, identificacion, nombres, telefono, fecha_naci} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_EDITAR_USUARIO("${idUsuario}", "${identificacion}", "${nombres}", "${telefono}", "${fecha_naci}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "Usuario modificado correctamente");
        } else {
            error(req, res, 400, "No se pudo modificado el usuario");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};


export const eliminarUsuario = async (req, res) => {
    const {idUsuario} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_ELIMINAR_USUARIO("${idUsuario}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 200, "Usuario Eliminado");
        } else {
            error(req, res, 400, "Usuario NO se elimino, Intenta mas tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};


export const loginUsuario = async (req, res) => {
    const { usuario, contrasena } = req.body;
    // const hash = await bcrypt.hash(contrasena, 2);

    try {
        const respuesta = await pool.query(`CALL SP_BUSCAR_LOGIN('${usuario}');`);
        if (respuesta[0][0]== 0) {
            error(req, res, 404, "Usuario no existe.");
            return;
        }
        const match = await bcrypt.compare(contrasena, respuesta[0][0][0].contrasena);
        if (!match){
            error(req, res, 401, "Contraseña incorrecta");
            return;
        }
        let payload = {
            "usuario": usuario
        }
        let token = await jwt.sign(
            payload,
            process.env.TOKEN_PRIVATEKEY,
            {
                expiresIn : process.env.TOKEN_EXPIRES_IN
            }); 
        success(req, res, 200,token);
         
    } catch (e) {
        console.error("Error en el servidor:", e);
        error(req, res, 500, "error en el servidor, porfavor intente nuevamente");
    }
};