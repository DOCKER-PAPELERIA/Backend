import { Router } from "express";
import { crearProducto, 
        eliminarProducto, 
        listarProducto, 
        modificarProducto, 
        mostrarProducto } from "../controllers/controllers.producto";

const rutaProducto = Router();

rutaProducto.get("/mostrarProducto/:id", mostrarProducto);
rutaProducto.get("/listarProducto", listarProducto);
rutaProducto.post("/crearProducto", crearProducto);
rutaProducto.put("/modificarProducto", modificarProducto);
rutaProducto.delete("/eliminarProducto", eliminarProducto);


export default rutaProducto;