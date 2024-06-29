import pool from "../config/mysql.db";
import {success, error} from "../messages/browser.js";
import { config } from "dotenv";
config();



// ------------------------------METODO DE MOSTRAR UNA SOLA CATEGORIA------------------------------------------------
const mostrarCategoria = async (req, res)  => {
    const id = req.params['id'];
    try {
        const [respuesta] = await pool.query(`CALL SP_MOSTRAR_CATEGORIAS("${id}");`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};



// ------------------------------METODO DE MOSTRAR TODAS LAS CATEGORIA-----------------------------------------------
const listarCategoria = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_LISTAR_CATEGORIAS();`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};


// ------------------------------METODO DE CREAR LAS CATEGORIAS------------------------------------------------------
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


// ------------------------------METODO DE FILTRAR LOS PRODUCTOS QUE ESTAN DENTRO DE DE LAS CATEGORIAS-------------------------------------------
const FiltrarProductos = async (req, res) =>{
    const {filtro, categoria} =  req.body;
    try {
        const [respuesta] = await pool.query(`CALL SP_FILTRAR_PRODUCTOS_CATEGORIAS("${filtro}", "${categoria}");`);
        success(req, res, 201, respuesta[0]);
    } catch (err) {
        error(req, res, 400, err);
    }
};


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



// ------------------------------METODO DE ELIMINAR LAS CATEGORIAS---------------------------------------------------
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

export { listarCategoria, mostrarCategoria, crearCategoria, FiltrarProductos, modificarCategoria, eliminarCategoria };