import pool from "../config/mysql.db";
import { success, error } from "../messages/browser";
import { config } from "dotenv";
config();


export const mostrarRegproducto = async (req, res) => {
    const id = req.params["id"];
    try {
        const [respuesta] = await pool.query(`CALL SP_MOSTRAR_REGPRODUCTOS("${id}");`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};


export const listarRegproducto = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_LISTAR_REGPRODUCTOS();`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};


export const crearRegproducto = async (req, res) => {
    const {idProducto, idCategoria, idProveedor, cantinicial, cantfinal, fecha, valorcompra, estado} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_INSERTAR_REGPRODUCTO("${idProducto}", "${idCategoria}", "${idProveedor}", "${cantinicial}", "${cantfinal}", "${fecha}", "${valorcompra}", "${estado}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "Registro Producto creado con exito.");
        } else {
            error(req, res, 400, "Registro Producto No creado, Intentalo mas tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};


export const modificarRegproducto = async (req, res) => {
    const {idRegProducto, cantinicial, cantfinal, fecha, valorcompra, estado} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_EDITAR_REGPRODUCTO("${idRegProducto}", "${cantinicial}", "${cantfinal}", "${fecha}", "${valorcompra}", "${estado}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "Registro Producto modificado con exito.");
        } else {
            error(req, res, 400, "Registro Producto No modificar, Intentalo mas tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};


export const eliminarRegproducto = async (req, res) => {
    const {idRegProducto} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_ELIMINAR_REGPRODUCTO("${idRegProducto}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 200, "Registro Producto Eliminado");
        } else {
            error(req, res, 400, "Registro Producto NO se elimino, Intenta mas tarde.");
        }
    } catch (err) {
        
    }
};


