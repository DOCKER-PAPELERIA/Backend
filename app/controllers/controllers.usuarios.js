import pool from "../config/mysql.db";
import bcrypt, { hash } from "bcrypt";
import { success, error } from "../messages/browser";
import { config } from "dotenv";
import jwt from "jsonwebtoken"
config();


// ------------------------------METODO DE MOSTRAR UN SOLO USUARIO------------------------------------------------
export const mostrarUsuario = async (req, res) => {
    const id = req.params["id"];
    try {
        const [respuesta] = await pool.query(`CALL SP_MOSTRAR_USUARIO("${id}");`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
        
    }
};


// ------------------------------METODO DE MOSTRAR TODOS USUARIO----------------------------------------------------
export const listarUsuario = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_LISTAR_USUARIO();`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
        
    }
};


// ------------------------------METODO DE CREAR USUARIO------------------------------------------------------------
export const crearUsuario = async (req, res) => {
    const {idRol, identificacion, nombres, telefono, fecha_naci, correo, estado} = req.body;
    const contrasenasincifrar = req.body.contrasena;
    try {

        const hash = await bcrypt.hash(contrasenasincifrar, 2);
        const  contrasena = hash;

        const respuesta = await pool.query(`CALL SP_INSERTAR_USUARIO("${idRol}", "${identificacion}", "${nombres}", "${telefono}", "${fecha_naci}", "${correo}", "${contrasena}", "${estado}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "Usuario creado correctamente");
        } else {
            error(req, res, 400, "No se pudo crear el usuario");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};


// ------------------------------METODO DE MODIFICAR USUARIO------------------------------------------------------------
export const modificarUsuario = async (req, res) => {
    const {idUsuario, identificacion, nombres, telefono, fecha_naci, correo, estado} = req.body;
    const contrasenasincifrar = req.body.contrasena;
    try {
        
        const hash = await bcrypt.hash(contrasenasincifrar, 2);
        const contrasena= hash;
        
        const respuesta = await pool.query(`CALL SP_EDITAR_USUARIO("${idUsuario}", "${identificacion}", "${nombres}", "${telefono}", "${fecha_naci}", "${correo}", "${contrasena}", "${estado}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "Usuario modificado correctamente");
        } else {
            error(req, res, 400, "No se pudo modificado el usuario");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};


// ------------------------------METODO DE ELIMINAR USUARIO----------------------------------------------------------
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


// ------------------------------METODO DE LOGUAR USUARIO------------------------------------------------------------
export const loginUsuario = async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_BUSCAR_LOGIN('${correo}');`);
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
            "correo": correo
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