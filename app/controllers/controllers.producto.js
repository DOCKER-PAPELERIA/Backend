import pool from "../config/mysql.db";
import { success, error } from "../messages/browser.js";
import { config } from "dotenv";
config();


// ------------------------------METODO DE MOSTRAR UN SOLO PRODUCTO------------------------------------------------
export const mostrarProducto = async (req, res) => {
    const id = req.params["id"];
    try {
        const [respuesta] = await pool.query(`CALL SP_MOSTRAR_PRODUCTOS("${id}");`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};


// ------------------------------METODO DE MOSTRAR TODAS LOS PRODUCTOS------------------------------------------------
export const listarProducto = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_LISTAR_PRODUCTOS();`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};


// ------------------------------METODO DE MOSTRAR EL PRODUCTO AGOTADO------------------------------------------------
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


// ------------------------------METODO DE MOSTRAR EL PRODUCTO Y SU PRECIO---------------------------------
export const Precios = async (req, res) => {
    try {
        const [respuesta] = await pool.query(`CALL SP_MOSTRAR_PRECIOS();`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};


// ------------------------------METODO DE CREAR LOS PRODUCTOS----------------------------------------------------
export const crearProducto = async (req, res) => {
    const {idCategorias, idProveedor, nombre_product, stock, codigo_producto, imagen, precio, fecha, estado} = req.body;
    try {
        const respuesta = await pool.query(`CALL  SP_INSERTAR_PRODUCTOS("${idCategorias}", "${idProveedor}", "${nombre_product}", "${stock}", "${codigo_producto}", "${imagen}", "${precio}", "${fecha}", "${estado}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "Producto creado correctamente.");
        } else {
            error(req, res, 400, "Producto NO se creo, Intenta mas tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};


// ------------------------------METODO DE MODIFICAR LOS PRODUCTOS------------------------------------------------
export const modificarProducto = async (req, res) => {
    const {idProducto, idCategorias, idProveedor, nombre_product, stock, codigo_producto, imagen, precio, fecha, estado} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_EDITAR_PRODUCTO("${idProducto}", "${idCategorias}", "${idProveedor}", "${nombre_product}", "${stock}", "${codigo_producto}", "${imagen}", "${precio}", "${fecha}", "${estado}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "Producto  modificado correctamete.");
        } else {
            error(req, res, 401, "Producto No se modifico, Intentalo mas tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};


// ------------------------------METODO DE ELIMINAR LOS PRODUCTOS-------------------------------------------------
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
