/**
 * este es las rutas de historial 
 * @module ctr-Historial-ruta
 */

import { Router } from "express";
import { crearHistorial, 
        eliminarHistorial, 
        listarHistorial,
        mostrarHistorial } from "../controllers/controllers.historial";
import { verifyToken } from "../middleware/oauth";



const rutaHistorial = Router();

/**
 * @route GET /Historial/:id
 * @description Obtiene una Historial específica por ID
 * @access Public
 */
rutaHistorial.get("/historial/:id", mostrarHistorial);

/**
 * @route GET /Historial
 * @description Lista todas las Historial
 * @access Public
 */
rutaHistorial.get("/historial", listarHistorial);


/**
 * @route POST /Historial
 * @description Crea una nueva Historial
 * @access Private
 */
rutaHistorial.post("/historial", crearHistorial);

/**
 * @route DELETE /Historial
 * @description Elimina una Historial
 * @access Private
 */
rutaHistorial.delete("/historial", verifyToken, eliminarHistorial);



export default rutaHistorial;