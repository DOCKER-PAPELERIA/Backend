/**
 * este es las rutas de productos 
 * @module ctr-producto-ruta
 */
import { Router } from "express";
import {Agotado, Precios, 
        crearProducto, 
        eliminarProducto, 
        listarProducto, 
        modificarProducto, 
        mostrarProducto,} from "../controllers/controllers.producto";
import { verifyToken } from "../middleware/oauth";

const rutaProducto = Router();

/**
 * @route GET /producto/:id
 * @description Obtiene un producto específico por ID
 * @access Public
 */
rutaProducto.get("/producto-ago", mostrarProducto);

/**
 * @route GET /producto
 * @description Lista todos los productos
 * @access Public
 */
rutaProducto.get("/producto", listarProducto);

/**
 * @route GET /producto-agotado
 * @description Lista todos los productos agotados
 * @access Public
 */
rutaProducto.get("/producto-agotado", Agotado);

/**
 * @route GET /producto-precio
 * @description Lista productos ordenados por precio
 * @access Public
 */
rutaProducto.get("/producto-precio", Precios);

/**
 * @route POST /producto
 * @description Crea un nuevo producto
 * @access Private
 */
rutaProducto.post("/producto", crearProducto);

/**
 * @route PUT /producto
 * @description Modifica un producto existente
 * @access Private
 */
rutaProducto.put("/producto", verifyToken, modificarProducto);

/**
 * @route DELETE /producto
 * @description Elimina un producto
 * @access Private
 */
rutaProducto.delete("/producto", verifyToken, eliminarProducto);


export default rutaProducto;