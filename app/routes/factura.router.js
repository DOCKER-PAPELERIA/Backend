/**
 * este es las rutas de facturas 
 * @module ctr-factura-ruta
 */

import { Router } from "express";
import { crearFactura, 
        eliminarFactura, 
        listarFactura,
        mostrarFactura } from "../controllers/controllers.factura";
import { verifyToken } from "../middleware/oauth";



const rutaFactura = Router();

/**
 * @route GET /factura/:id
 * @description Obtiene una factura específica por ID
 * @access Public
 */
rutaFactura.get("/factura/:id", mostrarFactura);

/**
 * @route GET /factura
 * @description Lista todas las facturas
 * @access Public
 */
rutaFactura.get("/factura", listarFactura);

/**
 * @route POST /factura
 * @description Crea una nueva factura
 * @access Private
 */
rutaFactura.post("/factura", verifyToken, crearFactura);

/**
 * @route DELETE /factura
 * @description Elimina una factura
 * @access Private
 */
rutaFactura.delete("/factura", verifyToken, eliminarFactura);



export default rutaFactura;