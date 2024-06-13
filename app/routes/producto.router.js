import { Router } from "express";
import { agotado, crearProducto, 
        eliminarProducto, 
        listarProducto, 
        modificarProducto, 
        mostrarProducto } from "../controllers/controllers.producto";

const rutaProducto = Router();

rutaProducto.get("/producto/:id", mostrarProducto);
rutaProducto.get("/producto", listarProducto);
rutaProducto.get("/agotado", agotado);
rutaProducto.post("/producto", crearProducto);
rutaProducto.put("/producto", modificarProducto);
rutaProducto.delete("/producto", eliminarProducto);


export default rutaProducto;