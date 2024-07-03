/**
 * este es las rutas de categorias 
 * @module ctr-categoria-ruta
 */
import { Router } from "express";
import {FiltrarProductos, crearCategoria,  
        eliminarCategoria, 
        listarCategoria, 
        modificarCategoria, 
        mostrarCategoria} from "../controllers/cotrollers.categoria";
import { verifyToken } from "../middleware/oauth";


const rutaCategoria = Router();

/**
 * @route GET /categoria/:id
 * @description Obtiene una categoría específica por ID
 * @access Public
 */
rutaCategoria.get("/categoria/:id", mostrarCategoria);

/**
 * @route GET /categoria
 * @description Lista todas las categorías
 * @access Public
 */
rutaCategoria.get("/categoria", listarCategoria);

/**
 * @route GET /catego-filtro
 * @description Filtra productos dentro de una categoría
 * @access Public
 */
rutaCategoria.get("/catego-filtro",FiltrarProductos);

/**
 * @route POST /categoria
 * @description Crea una nueva categoría
 * @access Private
 */
rutaCategoria.post("/categoria", verifyToken, crearCategoria);

/**
 * @route PUT /categoria
 * @description Modifica una categoría existente
 * @access Private
 */
rutaCategoria.put("/categoria", verifyToken, modificarCategoria);

/**
 * @route DELETE /categoria
 * @description Elimina una categoría
 * @access Private
 */
rutaCategoria.delete("/categoria", verifyToken, eliminarCategoria);


export default rutaCategoria;