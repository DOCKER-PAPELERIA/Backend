/**
 * Este es el controlador de categoria
 * @module crt-categoria
 */


import pool from "../config/mysql.db";
import {success, error} from "../messages/browser.js";
import { config } from "dotenv";
config();


/**
 * Muestra una categoría específica basada en el ID proporcionado.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const mostrarCategoria = async (req, res)  => {
    const id = req.params['id'];
    try {
        const [respuesta] = await pool.query(`CALL SP_MOSTRAR_CATEGORIAS("${id}");`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};


/**
 * Lista todas las categorías disponibles.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta (Response).
 */
const listarCategoria = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_LISTAR_CATEGORIAS();`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};

/**
 * Crea una nueva categoría con los datos proporcionados en el cuerpo de la solicitud.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta (Response).
 * @param {string} req.body.Categoria - Nombre de la categoría.
 * @param {string} req.body.descripcion_categoria - Descripción de la categoría.
 * @param {string} req.body.imagen - Imagen de la categoría.
 * @param {string} req.body.fecha - Fecha de creación de la categoría.
 */
const crearCategoria = async (req, res) => {
    const { Categoria, descripcion_categoria, imagen, fecha } = req.body;

    try {
        const respuesta = await pool.query(`CALL SP_INSERTAR_CATEGORIA("${Categoria}", "${descripcion_categoria}", "${imagen}", "${fecha}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "La Categoria ha sido Registrada.");
        } else {
            error(req, res, 400, "La Categoria NO se Registro Vuelve a Intentarlo.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};

/**
 * Filtra los productos que están dentro de una categoría específica.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta (Response).
 * @param {string} req.body.filtro - Filtro a aplicar a los productos.
 * @param {string} req.body.categoria - Categoría de los productos.
 */
const FiltrarProductos = async (req, res) =>{
    const {filtro, categoria} =  req.body;
    try {
        const [respuesta] = await pool.query(`CALL SP_FILTRAR_PRODUCTOS_CATEGORIAS("${filtro}", "${categoria}");`);
        success(req, res, 201, respuesta[0]);
    } catch (err) {
        error(req, res, 400, err);
    }
};

/**
 * muestra los productos que están dentro de una categoría específica.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta (Response).
 * @param {string} req.body.filtro - Filtro a aplicar a los productos.
 * @param {string} req.body.categoria - Categoría de los productos.
 */
const Cate_Productos = async (req, res) =>{
    const {filtro, categoria} =  req.body;
    try {
        const [respuesta] = await pool.query(`CALL SP_CATEGORIA_PRODUCTOS("${categoria}");`);
        success(req, res, 201, respuesta[0]);
    } catch (err) {
        error(req, res, 400, err);
    }
};


/**
 * Modifica una categoría existente con los datos proporcionados en el cuerpo de la solicitud.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta (Response).
 * @param {string} req.body.idCategorias - ID de la categoría.
 * @param {string} req.body.Categoria - Nombre de la categoría.
 * @param {string} req.body.descripcion_categoria - Descripción de la categoría.
 * @param {string} req.body.imagen - Imagen de la categoría.
 * @param {string} req.body.fecha - Fecha de creación de la categoría.
 */

// ------------------------------METODO DE MODIFICAR LAS CATEGORIAS--------------------------------------------------
const modificarCategoria = async (req, res) => {
    const {idCategorias, Categoria, descripcion_categoria, imagen, fecha} = req.body;

    try {
        const respuesta = await pool.query(`CALL SP_EDITAR_CATEGORIAS("${idCategorias}", "${Categoria}", "${descripcion_categoria}", "${imagen}", "${fecha}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "La Categoria ha sido Modificada.");
        } else {
            error(req, res, 400, "La Categoria NO se Modifico Vuelve a Intentarlo.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};


/**
 * Elimina una categoría específica basada en el ID proporcionado en el cuerpo de la solicitud.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta (Response).
 * @param {string} req.body.idCategorias - ID de la categoría a eliminar.
 */
const eliminarCategoria = async (req, res) => {
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

export { listarCategoria, mostrarCategoria, crearCategoria, FiltrarProductos, Cate_Productos, modificarCategoria, eliminarCategoria };