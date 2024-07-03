/**
 * este es las rutas de proveedores 
 * @module ctr-proveedor-ruta
 */
import { Router } from "express";
import { crearProveedor, 
        eliminarProveedor, 
        listarProveedor, 
        modificarProveedor, 
        mostrarProveedor } from "../controllers/controllers.proveedor";
import { verifyToken } from "../middleware/oauth";


const rutaProveedor = Router();

/**
 * @route GET /proveedor/:id
 * @description Obtiene un proveedor específico por ID
 * @access Public
 */
rutaProveedor.get("/proveedor/:id", mostrarProveedor);

/**
 * @route GET /proveedor
 * @description Lista todos los proveedores
 * @access Public
 */
rutaProveedor.get("/proveedor", listarProveedor);

/**
 * @route POST /proveedor
 * @description Crea un nuevo proveedor
 * @access Private
 */
rutaProveedor.post("/proveedor", verifyToken, crearProveedor);

/**
 * @route PUT /proveedor
 * @description Modifica un proveedor existente
 * @access Private
 */
rutaProveedor.put("/proveedor", verifyToken, modificarProveedor);

/**
 * @route DELETE /proveedor
 * @description Elimina un proveedor
 * @access Private
 */
rutaProveedor.delete("/proveedor", verifyToken, eliminarProveedor);



export default rutaProveedor;