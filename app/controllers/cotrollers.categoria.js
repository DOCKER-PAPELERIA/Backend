import pool from "../config/mysql.db";
import {success, error} from "../messages/browser.js";
import { config } from "dotenv";
config();

export const mostrarCategoria = async (req, res)  => {
    const id = req.params['id'];
    try {
        const [respuesta] = await pool.query(`CALL SP_MOSTRAR_CATEGORIAS("${id}");`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};

export const listarCategoria = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_LISTAR_CATEGORIAS();`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};

export const descripcion = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_MOSTRAR_CATE_PRODUC();`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};

export const ordenAlfabetico = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_CATEGORIAS_ORDENALFABETICO();`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};

export const crearCategoria = async (req, res) => {
    const { Categoria, fecha } = req.body;

    try {
        const respuesta = await pool.query(`CALL SP_INSERTAR_CATEGORIA("${Categoria}", "${fecha}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "La Categoria ha sido Registrada.");
        } else {
            error(req, res, 400, "La Categoria NO se Registro Vuelve a Intentarlo.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};

export const modificarCategoria = async (req, res) => {
    const {idCategorias, Categoria, fecha} = req.body;

    try {
        const respuesta = await pool.query(`CALL SP_EDITAR_CATEGORIAS("${idCategorias}", "${Categoria}", "${fecha}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "La Categoria ha sido Modificada.");
        } else {
            error(req, res, 400, "La Categoria NO se Modifico Vuelve a Intentarlo.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};

export const eliminarCategoria = async (req, res) => {
    const {idCategorias} = req.body;

    try {
        const respuesta = await pool.query(`CALL SP_ELIMINAR_CATEGORIAS("${idCategorias}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "La Categori ha sido Eliminada.");
        } else {
            error(req, res, 400, "La Categoria NO se ha Eliminado");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};